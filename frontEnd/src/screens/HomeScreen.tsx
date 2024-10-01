
import React, { useEffect, useState } from 'react';
import Paho from 'paho-mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useLoading } from '@/contexts/LoadingContext';

import GenerateKeyView from '@/views/homeViews/GenerateKeyView'
import InsertKeyView from '@/views/homeViews/InsertKeyView'
import InsertFingerprintView from '@/views/homeViews/InsertFingerprintView';
import WaitingOpeningView from '@/views/homeViews/WaitingOpeningView';

import HeaderComponent from '@/components/commonComponents/HeaderComponent';
import NavBarComponent from '@/components/commonComponents/NavBarComponent';

export default () => {

  const { setLoading } = useLoading();

  const [currentInternalPage, setCurrentInternalPage] = useState<string>('GenerateKeyView');
  const [code, setCode] = useState<string>('GenerateKeyView');

  const [client, setClient] = useState<Paho.Client | null>(null);
  const [stateConection, setStateConection] = useState<string>('disconected');

  useEffect(() => {
    const options = {
      host: 'broker.hivemq.com',
      port: 8000,
      path: '/mqtt'
    };
    const mqttClient = new Paho.Client(options.host, options.port, options.path);
    setClient(mqttClient as Paho.Client);
  }, []);

  useEffect(() => {
    if (client) {
      connect();
    }
  }, [client]);

  const connect = () => {
    setLoading(true);
    setStateConection('trying to connect');
    (client as Paho.Client).onConnectionLost = onConnectionLost;
    (client as Paho.Client).connect({
      onSuccess: onConnect,
      useSSL: false,
      timeout: 10000,
      onFailure: onFailure,
    });
  }

  const onConnectionLost = (responseObject: Paho.MQTTError) => {
    if (responseObject.errorCode !== 0) {
      console.log('connection lost');
      setStateConection('disconected')
    }
  }

  const onConnect = () => {
    (client as Paho.Client).subscribe('safe_vault', { qos: 1 });
    (client as Paho.Client).onMessageArrived = handleMessageArrived;
    setStateConection('conected')
    setLoading(false);
  }

  const onFailure = (error: Paho.MQTTError) => {
    setStateConection('connection failed')
    setLoading(false);
  }
  
  const handleMessageArrived = async (message: Paho.Message) => {
    console.log('Received message:', message.payloadString);
    
    if (currentInternalPage === 'GenerateKeyView' ) {
      
      const [action, userM, _code] = message.payloadString.split('_')
      const {name, lastName} = JSON.parse( await AsyncStorage.getItem('user') || '' );

      if( action === '2' && userM === `${name}.${lastName}` ){
        setCode(_code)
        setCurrentInternalPage('InsertKeyView')
      }else if( action === '3' && userM === `${name}.${lastName}` ){
        // TODO: criar nova tela de já existe alguem abrindo o cofre
        setCurrentInternalPage('WaitingOpeningView')
      }

    }
  }

  const [cancelOpeningVisible, setCancelOpeningVisible] = useState(false);
  const props1 = { cancelOpeningVisible, setCancelOpeningVisible, stateConection, client, code};

  const RenderView = () =>  {
    switch (currentInternalPage) {
      case 'GenerateKeyView':
        return <GenerateKeyView { ...props1 }/>;
      case 'InsertKeyView':
        return <InsertKeyView { ...props1 } />;
      case 'InsertFingerprintView':
        return <InsertFingerprintView { ...props1 } />;
      case 'WaitingOpeningView':
        return <WaitingOpeningView { ...props1 } />;
      default:
        return <GenerateKeyView { ...props1 }/>;
    } 
  }

  return (
    <>
      <HeaderComponent/>
      <RenderView/>
      <NavBarComponent />
    </>
  );
}