String aberturas(int aux3){
    
    File abert = SPIFFS.open("/aberturas.txt" , "r");
    if(!abert){Serial.println("file open failed");}
    String abertura;
    char caractere;
    for (int aux=0; abert.available(); aux++){
      caractere = char(abert.read());
      switch (caractere){
        case 'A': 
          if (aux3 == 1){        //se for atualizar banco de dados
            
            atualizauser(idl);
            abertura += "[{\"dia\":\"" + String(dia) + "\",\"mes\":\"" + String(mes) + "\",\"ano\":\"" + String(ano) + "\",\"hora\":\"" + String(hora) + "\",\"minuto\":\"" + String(minuto) + "\",\"nome\":\"" + nome + "\",\"sobrenome\":\"" + sobrenome + "\"},";
            Serial.println(abertura);
            
          }else{                //se for apenas leitura
            abertura += "[";
          }
          break;
        case 'B': 
          abertura += "{\"dia\":\"";
          break;  
        case 'C': 
          abertura += "\",\"mes\":\"";
          break;
        case 'D': 
          abertura += "\",\"ano\":\"";
          break;
        case 'E': 
          abertura += "\",\"hora\":\"";
          break;
        case 'F': 
          abertura += "\",\"minuto\":\"";
          break;
        case 'G': 
          abertura += "\",\"nome\":\"";
          break;
        case 'H': 
          abertura += "\",\"sobrenome\":\"";
          break;
        case 'I': 
          abertura += "\"}";
          break;
        case 'J': 
          abertura += ",";
          break;
        case 'K': 
          abertura += "]";
          break;
        default: 
          abertura += caractere;
      }
    }
    abert.close();
    if (aux3 == 1){
        abert = SPIFFS.open("/aberturas.txt" , "w");
        if(!abert){Serial.println("file open failed");}

        Serial.println("abertura");
        abert.print(abertura);
        abert.close();
    }
    return abertura;
}
