import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import Paho from 'paho-mqtt';

import createOpening from '../../services/openingsServices/createOpeningService.js';
import logout from '../../services/loginServices/logoutService.js';

export default ({
  currentPage, setCurrentPage,
  setLoading,
  user, setUser
}) => {
  
  const [status, setStatus] = useState('disconnected');
  const [client, setClient] = useState(null);

  useEffect(() => {
    const options = {
      host: 'broker.hivemq.com',
      port: 8000,
      path: '/mqtt'
    };
    const mqttClient = new Paho.Client(options.host, options.port, options.path);
    setClient(mqttClient);

  }, []);

  const connect = () => {
    setStatus('isFetching');
    client.onConnectionLost = onConnectionLost;
    client.connect({
      onSuccess: onConnect,
      useSSL: false,
      timeout: 10000,
      onFailure: onFailure,
    });
  }

  const onConnect = () => {
    console.log('Connected');
    client.subscribe('safe_vault', { qos: 1 });
    client.onMessageArrived = handleMessageArrived;
    sendMessage();
    setStatus('connected');
  }
  
  const handleMessageArrived = (message) => {
    console.log('Received message:', message.payloadString);
  }

  const sendMessage = () => {
    if (client && client.isConnected()) {
      const message = new Paho.Message('Hello MQTT2');
      message.destinationName = 'safe_vault';
      message.qos = 1;
      client.send(message);
    } else {
      console.log('MQTT client is not connected');
    }
  }
  
  const onConnectionLost = (responseObject) => {
    if (responseObject.errorCode !== 0) {
      console.log('Connection lost: ', responseObject.errorMessage);
      setStatus('disconnected');
    }
  }
  
  const onFailure = (error) => {
    console.log('Connection failed:', error);
    setStatus('failed');
  }

  return (
    <View style={styles.content}>
      <Text>NOME: {user.name}</Text>
      <Text>SOBRENOME: {user.lastName}</Text>
      <Text>ID: {user._id}</Text>
      <Text>PAGINA ATUAL: {currentPage}</Text>
      <Text>ESTADO DE CONEXÃO: {status}</Text>
      <TouchableWithoutFeedback onPress={() => createOpening({ setCurrentPage, setLoading, user })}>
        <Text style={styles.newColeta}>NewColeta</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={connect}>
        <Text style={styles.newColeta}>Conect</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={sendMessage}>
        <Text style={styles.newColeta}>sendMessage</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => logout({ setCurrentPage, setLoading, setUser })}>
        <Text style={styles.logout}>Logout</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    height: '82%',
    width: '100%',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  newColeta: {
    backgroundColor: 'green'
  },
  logout: {
    backgroundColor: 'red'
  }
});

// 'julio7745_' + parseInt(Math.random() * 100000)
