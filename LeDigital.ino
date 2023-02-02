
void ledigital(){

  debug++;
  Serial.println(debug);
  delay(200);
  
  int p = -1;

  Serial.println("coloque seu dedo no sensor de digitais!");
  retorno = "Coloque seu dedo no sensor biometrico!";

  p = finger.getImage();
  if (p != FINGERPRINT_OK){ 
    return;
  }
  p = finger.image2Tz();
  if (p != FINGERPRINT_OK){
    Serial.println("finger.image2Tz()");
    return;
  }
  p = finger.fingerFastSearch();
  if (p != FINGERPRINT_OK){
    Serial.println("digital não reconhecida");
    retorno = "Digital não reconhecida! Tente novamente";
    delay(5000);
    return;
  }

  fase = 1;
  debug = 0;
  return; 
  
}
