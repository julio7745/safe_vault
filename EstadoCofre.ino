void abrecofre(){
    retorno = "Cofre destravado, você tem 15 segundos para realizar a abertura!";
    Serial.println ("OK");
    aberturas(1);
    //abre cofre
    Serial.println("Cofre destravado.");
    aberto = millis() + 15000;
    return; 
}

void fechacofre(){
  fase = 0;
}
