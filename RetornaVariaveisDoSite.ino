
String  processor(const String& var){  

  switch (var){
    case "login-login":
      switch (erro) {
        case 0: return "block"; break;
        case 1: return "none"; break;
        case 2: return "none"; break;
      }
      break;
    case "login-euser":
      switch (erro) {
        case 0: return "none"; break;
        case 1: return "block"; break;
        case 2: return "none"; break;
      }
      break;
    case "login-esenha":
      switch (erro) {
        case 0: return "none"; break;
        case 1: return "none"; break;
        case 2: return "block"; break;
      }
      break;
    case "geral-nome" :
      return nome;
      break;
    case "geral-sobrenome" :
      return sobrenome;
      break;
    case "geral-lv" :
      return lv;
      break;
    case "geral-id" :
      return id;
      break;
    case "geral-aberturas" :
      return aberturas(0);
      break;
    case "retorno" :
      return retorno;
      break;
    case "inscrição-form" :
      if (fase == 1){
        return "block";
      }else{
        return "none";
      }
      break;
    case "inscrição-frame" :
      if (fase == 2){
        return "block";
      }else{
        return "none";
      }
      break;
  }  
  
  return "erro";  
}
