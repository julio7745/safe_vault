void abrecofre(){
    retorno = "Cofre destravado, você tem 15 segundos para realizar a abertura!";
    Serial.println ("Cofre destravado, você tem 15 segundos para realizar a abertura!");
    aberturas(1);
    //abre cofre
    fase = 3;
    aberto = millis() + 15000;
    return;
}

void fechacofre(){
  fase = 0;
}
