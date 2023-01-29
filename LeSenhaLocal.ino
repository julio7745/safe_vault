
void lesenha(){
  Serial.println("Parte da senha!");
  String senhaaleatoria = String( random(1, 10)*1000 + random(1, 10)*100 + random(1, 10)*10 + random(1, 10)*1 );
  Serial.println(senhaaleatoria);
  retorno = String ("Digite a senha <strong>" + senhaaleatoria + "</strong> no teclado local");
  String senhalida;
  int digitos = 0;
  while ( digitos < 4 )
  {
    senhalida += lekeypad();
    digitos++;
  }
  if(senhalida == senhaaleatoria){
    Serial.println("Senha correta");
    fase = 2;
    delay(100);
    Serial.println("ok");
    return;
  }else{
    retorno = "Senha invalida, tente novamente!";
    Serial.println ("ERRO");
  }
}
