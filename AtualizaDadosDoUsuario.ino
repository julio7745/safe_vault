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
        if(aux2 == 'B' || aux2 == 'C' || aux2 == 'D' || aux2 == 'E'){
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
