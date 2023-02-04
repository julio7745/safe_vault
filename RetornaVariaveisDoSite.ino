
String  processor(const String& var){  

  if (var == "login-login"){
    switch (erro) {
        case 0: return "block"; break;
        case 1: return "none"; break;
        case 2: return "none"; break;
      }
  }else if (var == "login-euser"){
    switch (erro) {
        case 0: return "none"; break;
        case 1: return "block"; break;
        case 2: return "none"; break;
      }
  }else if (var == "login-esenha"){
    switch (erro) {
        case 0: return "none"; break;
        case 1: return "none"; break;
        case 2: return "block"; break;
      }
  }else if (var == "geral-nome"){
    return nome;
  }else if (var == "geral-sobrenome"){
    return sobrenome;
  }else if (var == "geral-lv"){
    return lv;
  }else if (var == "geral-id"){
    return id;
  }else if (var == "geral-aberturas"){
    return aberturas(0);
  }else if (var == "retorno"){
    return retorno;
  }else if (var == "inscrição-form"){
    if (fase == 1){
        return "block";
      }else{
        return "none";
      }
  }else if (var == "inscrição-frame"){
    if (fase == 2){
        return "block";
      }else{
        return "none";
      }
  }
  
  return "erro";  
}
