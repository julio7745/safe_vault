 void inscrevedigital(){

  Serial.println("Novo usuario: coloque seu dedo no sensor de digitais!");
  retorno = "Novo usuario: coloque seu dedo no sensor de digitais!";
  delay(5000);/*
  
  debug++;
  Serial.println(debug);
  
  int p = -1;

  p = finger.getImage();
  if (p != FINGERPRINT_OK){ 
    return;
  }

  p = finger.image2Tz(1);;
  if (p != FINGERPRINT_OK){
    Serial.println("finger.image2Tz(1)");
    return;
  }*/

  Serial.println("retire o dedo");
  retorno = "Por favor, retire o dedo do sensor biometrico.";
  delay(5000);/*
  
  p = 0;
  while (p != FINGERPRINT_NOFINGER) {
    p = finger.getImage();
  }*/

  Serial.println("coloque o dedo novamente");
  retorno = "Por favor ,coloque o dedo novamente.";
  delay(5000);/*

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
  }*/

  int IDgravar = pegaid();
  novoid = IDgravar;
  Serial.print(String("novo id: " + Idgravar);
  /*p = finger.storeModel(IDgravar);
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
  }*/
  Serial.print("digital salva");
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

void increveusuario(){
  
      File arq = SPIFFS.open("/users.txt" , "a");
      if(!arq){Serial.println("file open failed");}
      Serial.println(String("A"+novonome+"B"+novosobrenome+"C"+novasenha+"D"+novolv+"E"+novoid));
      arq.print(String("A"+novonome+"B"+novosobrenome+"C"+novasenha+"D"+novolv+"E"+novoid));
      arq.close();
      Serial.println("Sucess");
      retorno = "Sucesso ao gravar novo usuario";
      return;
}
