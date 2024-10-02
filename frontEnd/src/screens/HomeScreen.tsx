
import React, { useEffect, useState, useRef } from 'react';
import Paho from 'paho-mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useLoading } from '@/contexts/LoadingContext';

import LoginHook from '@/hooks/commonHooks/LoginHook';

import GenerateKeyView from '@/views/homeViews/GenerateKeyView'
import InsertKeyView from '@/views/homeViews/InsertKeyView'
import InsertFingerprintView from '@/views/homeViews/InsertFingerprintView';
import WaitingOpeningView from '@/views/homeViews/WaitingOpeningView';
import AwaitForOpeningView from '@/views/homeViews/AwaitForOpeningView';

import HeaderComponent from '@/components/commonComponents/HeaderComponent';
import NavBarComponent from '@/components/commonComponents/NavBarComponent';

import HttpRequestHook from '@/hooks/commonHooks/HttpRequestHook';

export default () => {

  const { setLoading } = useLoading();

  const httpRequestServices = HttpRequestHook()

  const [currentInternalPage, _setCurrentInternalPage] = useState<string>('AwaitForOpeningView');
  const setCurrentInternalPage = async (page: string) => {
    await httpRequestServices.get(`login/verify`)
    .then(() => _setCurrentInternalPage(page))
    .catch(() => LoginServices.logout())
  }
  const currentInternalPageRef = useRef(currentInternalPage);
  useEffect(() => {
    currentInternalPageRef.current = currentInternalPage;
  }, [currentInternalPage]);

  const [code, setCode] = useState<string>('');

  const [client, setClient] = useState<Paho.Client | null>(null);
  const [stateConection, setStateConection] = useState<string>('disconected');

  const LoginServices = LoginHook()

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

  const sendMessage = async () => {
    if (client && client.isConnected()) {
      const user = JSON.parse( await AsyncStorage.getItem('user') || '' );
      const message = new Paho.Message(`8_${user.name}.${user.lastName}`);
      message.destinationName = 'safe_vault';
      message.qos = 1;
      client.send(message);
    }
  }

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
    sendMessage()
  }

  const onFailure = (error: Paho.MQTTError) => {
    setStateConection('connection failed')
    setLoading(false);
  }
  
  const handleMessageArrived = async (message: Paho.Message) => {
    console.log('Received message:', message.payloadString);

    const {name, lastName} = JSON.parse( await AsyncStorage.getItem('user') || '' );
    const [action, userM, _code] = message.payloadString.split('_')

    if(userM === `${name}.${lastName}`){
      switch (action) {
        case '2':
          setCode(_code)
          setCurrentInternalPage('InsertKeyView')
          break;
        case '3':
          setCurrentInternalPage('AwaitForOpeningView')
          break;
        case '4':
          setCurrentInternalPage('GenerateKeyView')
          break;
        case '5':
          LoginServices.logout()
          break;
        case '6':
          setCurrentInternalPage('InsertFingerprintView')
          break;
        case '7':
          setCurrentInternalPage('WaitingOpeningView')
          break;
        default:
          break;
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
      case 'AwaitForOpeningView':
        return <AwaitForOpeningView { ...props1 } />;
      default:
        return <AwaitForOpeningView { ...props1 }/>;
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