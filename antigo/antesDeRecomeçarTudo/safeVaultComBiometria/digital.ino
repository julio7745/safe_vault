
void ledigital(int aux){

  if (aux == 1){
    Serial.println("ADM: coloque o dedo no sensor de digitais!");
    retorno = String (nome + " coloque o dedo no sensor de digitais!");
  }else{
    Serial.println("coloque seu dedo no sensor de digitais!");
    retorno = "Coloque seu dedo no sensor biometrico!";
  }

  debug++;
  Serial.println(debug);
  delay(200);
  
  int p = -1;

  while(!finger.getImage()){
   delay(100); 
  }

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
