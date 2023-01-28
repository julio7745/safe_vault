void ledigital(){
  Serial.println("coloque seu dedo no sensor de digitais!");
  retorno = "Coloque seu dedo no sensor biometrico!";
  uint8_t p = -1;
  p = finger.getImage();
  if (p == FINGERPRINT_OK) {
    p = finger.image2Tz();
    p = finger.fingerFastSearch();
    if (p != FINGERPRINT_OK){
      retorno = "Digital não cadastrada no banco de dados! Tente novamente.";
      delay(5000);
    }else{
      fase = 1;
    }
  }
  delay(500);
}
