
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


void inscrevedigital(){

  Serial.println("Novo usuario: coloque seu dedo no sensor de digitais!");
  retorno = "Novo usuario: coloque seu dedo no sensor de digitais!";

  debug++;
  Serial.println(debug);
  delay(200);
  
  int p = -1;

  p = finger.getImage();
  if (p != FINGERPRINT_OK){ 
    return;
  }

  p = finger.image2Tz(1);;
  if (p != FINGERPRINT_OK){
    Serial.println("finger.image2Tz(1)");
    return;
  }

  Serial.println("retire o dedo");
  retorno = "Por favor, retire o dedo do sensor biometrico.";
  
  p = 0;
  while (p != FINGERPRINT_NOFINGER) {
    p = finger.getImage();
  }

  Serial.println("coloque o dedo novamente");
  retorno = "Por favor ,coloque o dedo novamente.";

  while(!finger.getImage()){
   delay(100); 
  }
  
  p = finger.image2Tz(2);
  if (p != FINGERPRINT_OK){
    Serial.println("finger.image2Tz(2)");
    return;
  }
  
  p = finger.createModel();
  if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Erro de comunicação");
    return;
  } else if (p == FINGERPRINT_ENROLLMISMATCH) {
    Serial.println("As digitais não batem");
    return;
  } else if (p != FINGERPRINT_OK) {
    Serial.println("Erro desconhecido");
    return;
  }

  int IDgravar = pegaid();
  
  p = finger.storeModel(IDgravar);
  if (p == FINGERPRINT_OK) {
    Serial.println("Armazenado!");
    return;
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Erro de comunicação");
    return;
  } else if (p == FINGERPRINT_BADLOCATION) {
    Serial.println("Erro na memória");
    return;
  } else if (p == FINGERPRINT_FLASHERR) {
    Serial.println("Erro-memória flash");
    return;
  } else {
    Serial.println("Erro desconhecido");
    return;
  }
  Serial.print("salvo");

  fase = 0;
  processo = 0;
  debug = 0;
  return; 
}

int  pegaid(){
  
  String total; 
  int estado = 0; 

  int idretornado;
  
  File arq = SPIFFS.open("/posicoes.txt" , "r");
  if(!arq){Serial.println("file open failed");}

   for ( int aux = 1; aux <= 127; aux++){
      char aux2 = arq.read();
      if (aux2 == 'l' && estado == 0){
        estado = 1;
        idretornado = aux;
        total += 'u';
      }else{
        total += aux2;
      }
   }
   arq.close();

   arq = SPIFFS.open("/posicoes.txt" , "w");
   if(!arq){Serial.println("file open failed");}

   Serial.println(total);
   arq.print(total);
   arq.close();

   return idretornado;
}
