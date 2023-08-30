import React, { useState, useRef, useEffect  } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableWithoutFeedback, BackHandler , } from 'react-native';

export default LoginScreen = ({handleScreen}) => {

  const [displayPassword, setdisplayPassword] = useState(true);
  const handleDisplayPassword = () => {
    setdisplayPassword(!displayPassword);
  };

  const invisibleRef = useRef(null);

  const oi = () =>{
    invisibleRef.current.focus();
  }

  /*useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      invisibleRef.current.focus();s
      return true; // Retorna true para permitir o comportamento padrão do botão de voltar
    });

    return () => backHandler.remove(); // Remove o listener quando o componente é desmontado
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Aqui você pode executar a função que deseja sempre que o botão de voltar for pressionado
      // Por exemplo, você pode chamar uma função global para lidar com o evento de voltar
      handleBackButtonPress(); // Substitua pelo nome da sua função
      return true; // Retorna true para permitir o comportamento padrão do botão de voltar
    });

    return () => backHandler.remove(); // Remove o listener quando o componente é desmontado
  }, []);*/


  return (
    <View style={styles.content}>
     <Text ref={invisibleRef} style={{ opacity: 0 }}>Invisível</Text>
      <Image 
        source={{ uri: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRYpvpf_QxhPhSRQnwHPIoX__UnoVlsvBhZsH6vghi0O7mTsHhLrcTVvzrz55FW4pNlVI-iio_CSvtLSdc2Qlhyjb4MV4kjrGu70u1Yf97QyvYGIkW8O6GC&usqp=CAc' }}
        style={styles.logo}
      />
      <Text style={styles.title}>Safe Vault</Text>
      <Text style={styles.text}>Welcome back!</Text>
      <View style={styles.loginForm}>
        <Text style={styles.titleForm}>Login</Text>
        <View style={styles.camp}>
          <Image source={require('../assets/icons/user.png')} style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="name.surname"
            autoComplete="off"
          />
        </View>
        <View style={styles.camp}>
          <Image source={require('../assets/icons/password.png')} style={styles.icon} />
          <TextInput
            style={styles.input}
            secureTextEntry={displayPassword}
            placeholder="password"
            autoComplete="off"
          />
          <TouchableWithoutFeedback onPress={handleDisplayPassword}>
            <Image source={require('../assets/icons/handleDisplayPassword.png')} style={styles.IconPassword}/>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.campBtnLogin}>
          <TouchableWithoutFeedback onPress={oi}>
            <Image source={require('../assets/icons/login.png')} style={styles.btnLogin}/>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    height: '100%',
    width: '100%',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#305E69',
    overflow: 'hidden',
  },
  logo: {
    width: 170,
    height: 170,
    resizeMode: 'contain',
    marginTop: 25,
  },
  title: {
    marginTop: 15,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  text: {
    fontSize: 20,
    color: '#ffffff',
  },
  loginForm:{
    padding: 25,
    borderRadius: 10,
    backgroundColor: '#305E69',
  },
  titleForm: {
    marginTop: -10,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
  },
  camp:{
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10,
    justifyContent: 'flex-start',
  },
  icon:{
    width: 45,
    height: 45,
    zIndex: 2,
    borderRadius: 50,
    backgroundColor: '#ffffff',
  },
  input:{
    width: 240,
    height: 40,
    marginLeft: -12,
    zIndex: 1,
    paddingLeft: 20,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    fontSize: 20,
    color: '#305E69',
    display: 'flex',
    alignItems: 'center',
  },
  IconPassword:{
    width: 30,
    height: 30,
    zIndex: 2,
    marginLeft: -37,
    borderRadius: 50,
  },
  campBtnLogin:{
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  btnLogin:{
    width: 200,
    height: 40,
    resizeMode: 'contain',
    backgroundColor: '#E8A66B',
    borderRadius: 100,
  }

});