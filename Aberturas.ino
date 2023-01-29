String aberturas(int aux3){

    Serial.println("Estado aux3");
    Serial.println(aux3);
    File abert = SPIFFS.open("/aberturas.txt" , "r");
    if(!abert){Serial.println("file open failed");}
    String abertura;
    String logabertura;
    char caractere;
    if (!abert.available() && aux3 ==1){
      logabertura = "AB" + String(dia) + "C" + String(mes) + "D" + String(ano) + "E" + String(hora) + "F" + String(minuto) + "G" + nome + "H" + sobrenome + "IK";
    }
    for (int aux=0; abert.available(); aux++){
      caractere = char(abert.read());
      switch (caractere){
        case 'A': 
          if (aux3 == 1){        //se for atualizar banco de dados
            atualizauser(idl);
            abertura += "[{\"dia\":\"" + String(dia) + "\",\"mes\":\"" + String(mes) + "\",\"ano\":\"" + String(ano) + "\",\"hora\":\"" + String(hora) + "\",\"minuto\":\"" + String(minuto) + "\",\"nome\":\"" + nome + "\",\"sobrenome\":\"" + sobrenome + "\"},";
            logabertura += "AB" + String(dia) + "C" + String(mes) + "D" + String(ano) + "E" + String(hora) + "F" + String(minuto) + "G" + nome + "H" + sobrenome + "IJ";
          }else{                //se for apenas leitura
            abertura += "[";
          }
          break;
        case 'B': 
          abertura += "{\"dia\":\"";
          logabertura += "B";
          break;  
        case 'C': 
          abertura += "\",\"mes\":\"";
          logabertura += "C";
          break;
        case 'D': 
          abertura += "\",\"ano\":\"";
          logabertura += "D";
          break;
        case 'E': 
          abertura += "\",\"hora\":\"";
          logabertura += "E";
          break;
        case 'F': 
          abertura += "\",\"minuto\":\"";
          logabertura += "F";
          break;
        case 'G': 
          abertura += "\",\"nome\":\"";
          logabertura += "G";
          break;
        case 'H': 
          abertura += "\",\"sobrenome\":\"";
          logabertura += "H";
          break;
        case 'I': 
          abertura += "\"}";
          logabertura += "I";
          break;
        case 'J': 
          abertura += ",";
          logabertura += "J";
          break;
        case 'K': 
          abertura += "]";
          logabertura += "K";
          break;
        default: 
          abertura += caractere;
          logabertura += caractere;
      }
    }
    abert.close();
    if (aux3 == 1){
        abert = SPIFFS.open("/aberturas.txt" , "w");
        if(!abert){Serial.println("file open failed");}
         
        Serial.println("nova abertura");
        Serial.println(logabertura);
        abert.print(logabertura);
        abert.close();
    }
    Serial.println("abertura");
    Serial.println(abertura);
    if (abertura == ""){
      return "0";
    }
    return abertura;
}

void limparlog(){
    File abert = SPIFFS.open("/aberturas.txt" , "r");
    abert = SPIFFS.open("/aberturas.txt" , "w");
    if(!abert){Serial.println("file open failed");}

    String logabertura = "";
    abert.print(logabertura);
    abert.close();
}
