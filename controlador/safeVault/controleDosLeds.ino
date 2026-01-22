
// Outputs
bool i_controleDosLeds_ledStatus_var[4] = { LOW, LOW, LOW, LOW };

void e_controleDosLeds_setAll_fnct () {
  for (int led = 0; led < 4; led ++){
     i_controleDosLeds_ledStatus_var[led] = HIGH;
  }
}

void e_controleDosLeds_resetAll_fnct () {
  for (int led = 0; led < 4; led ++){
      i_controleDosLeds_ledStatus_var[led] = LOW;
  }
}

void e_controleDosLeds_setOne_fnct (int led) {
  i_controleDosLeds_ledStatus_var[led] = HIGH;
}

void e_controleDosLeds_resetOne_fnct (int led) {
  i_controleDosLeds_ledStatus_var[led] = LOW;
}

void e_controleDosLeds_tooggleAll_fnct () {
  for (int led = 0; led < 4; led ++){
      i_controleDosLeds_ledStatus_var[led] = !i_controleDosLeds_ledStatus_var[led];
  }
}

// Declara variaveis de controle
//unsigned long i_controleDosLeds_timesLast_var[4] = { 0, 0, 0, 0 };
//unsigned int i_controleDosLeds_ledDigitoPiscandoVelocidade_var[4] = { 0, 0, 0, 0 };
//
//// Função de piscar todos
//void e_controleDosLeds_piscaAll_fnct (int velocidade) {
//  
//  for (int cont = 0; cont < 4; cont ++){
//     i_e_controleDosLeds_pisca_fnct(cont, velocidade);
//  }
//  // Preciso bolar uma forma de desligar quando a função parar de ser chamada e o led estiver aceso
//  
//}
//void i_e_controleDosLeds_pisca_fnct (int led, int velocidade ) {
//
//  if (( i_controleDosLeds_timesLast_var[led]==0 ) || ( millis() > (i_controleDosLeds_timesLast_var[led]+velocidade) ) ) {
//    
//    i_controleDosLeds_timesLast_var[led] = millis();
//    i_controleDosLeds_ledStatus_var[led] = !i_controleDosLeds_ledStatus_var[led];
//    
//  }
//  
//}
