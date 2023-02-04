void atualizauser(String aux3){
      //limpeza
      nome = "", sobrenome = "", senha = "", lv = "", id = "";
      File arq = SPIFFS.open("/users.txt" , "r");
      if(!arq){Serial.println("file open failed");}
      char aux = char(arq.read());
      while(arq.available()){
        char aux2 = char(arq.read());
        if (aux2 == 'A'){
          aux = aux2;
          //verificação
          if( aux3 == id ){
              return;
            }
          //limpeza
          nome = "", sobrenome = "", senha = "", lv = "", id = "";
        }else
        if(aux2 == 'B' || aux2 == 'C' || aux2 == 'D' || aux2 == 'E' || aux2 == 'F'){
          aux = aux2;
        }else  
        //Leitura de dados
        if(aux=='A'){
          nome += aux2;
        }else
        if(aux=='B'){
          sobrenome += aux2;
        }else
        if(aux=='C'){
          senha += aux2;
        }else
        if(aux=='D'){
          lv += aux2;
        }else
        if(aux=='E'){
          id += aux2;
        }
      }   
      arq.close();
      return;
}

String retornausuarios(){

  Serial.println("Entrou");

  String total = "";
  int aux3 = 0;
  Serial.println("variavel criada");
  
  File arq = SPIFFS.open("/users.txt" , "r");
  if(!arq){Serial.println("file open failed");}
  Serial.println("abriu arquivo");
  
  total = "[{\"nome\":\"";
  Serial.print("[{\"nome\":\"");

  
  while(arq.available()){

      char aux2 = char(arq.read());

      switch (aux2){
        case 'A':
          break; 
        case 'B':
          total += "\",\"sobrenome\":\"";
          Serial.print("\",\"sobrenome\":\"");
          break;
        case 'C':
          aux3 = 1;
          break;
        case 'D':
          aux3 = 1;
          break;
        case 'E':
          aux3 = 0;
          total += "\",\"id\":\"";
          Serial.print("\",\"id\":\"");
          break;
        case 'F': 
          total += "\"},{\"nome\":\"";
          Serial.print("\"},{\"nome\":\"");
          break;
        default:
          if(aux3 == 0 ){
            total += aux2;
            Serial.print(aux2);
          }
          break;
      }
  }

  total += "\"}]";
  Serial.println("\"}]");

  Serial.println(total);
  return total;
  
}

void increveusuario(){

    novoid = pegaid();
    Serial.println(String("novo id: " + novoid));
  
    File arq = SPIFFS.open("/users.txt" , "a");
    if(!arq){Serial.println("file open failed");}
    
    Serial.println(String("FA"+novonome+"B"+novosobrenome+"C"+novasenha+"D"+novolv+"E"+novoid+"A"));
    arq.print(String("FA"+novonome+"B"+novosobrenome+"C"+novasenha+"D"+novolv+"E"+novoid+"A"));
    
    arq.close();
    
    Serial.println("Sucess");

    erro = 1;
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
