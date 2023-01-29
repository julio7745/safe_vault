void ledigital(){
  Serial.println("coloque seu dedo no sensor de digitais!");
  retorno = "Coloque seu dedo no sensor biometrico!";
  int p = -1;
  if (!finger.verifyPassword()) {
    Serial.println("DY-50 não encontrado");
    retorno = "Sensor biometrico desconectado, favor verificar!";
    return;
  } 
  p = finger.getImage();
  Serial.println("Verificou se tem dedo");
  if (p == FINGERPRINT_OK) {
    p = finger.image2Tz();
    p = finger.fingerFastSearch();
    if (p != FINGERPRINT_OK){
      retorno = "Digital não cadastrada no banco de dados! Tente novamente.";
      delay(5000);
    }else{
      fase = 1;
      debug = 0;
    }
  }
  debug++;
  Serial.println(debug);
  delay(200);
  return;
}
