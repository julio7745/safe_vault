
// Define portas
#define i_controleDeSaidas_clock_port 4        // GPIO4/D2
#define i_controleDeSaidas_update_port 5       // GPIO5/D1
#define i_controleDeSaidas_serialInput_port 14 // GPIO14/D5

// Tempo de delay p/ atualização
#define i_controleDeSaidas_timedelay_time 5

// Função de clock para alterar saidas
void i_controleDeSaidas_clock_fnct() {
  
  digitalWrite(i_controleDeSaidas_clock_port, HIGH);
  delayMicroseconds(i_controleDeSaidas_timedelay_time);
  digitalWrite(i_controleDeSaidas_clock_port, LOW);
  delayMicroseconds(i_controleDeSaidas_timedelay_time);
  
}

// Função atualizar saidas
void i_controleDeSaidas_update_fnct() {
  
  digitalWrite(i_controleDeSaidas_update_port, HIGH);
  delayMicroseconds(i_controleDeSaidas_timedelay_time);
  digitalWrite(i_controleDeSaidas_update_port, LOW);
  delayMicroseconds(i_controleDeSaidas_timedelay_time);
  
}

// Função de inicialização
void e_controleDeSaidas_iniciaSaidas_fnct() {

  // Declara portas como saidas
  pinMode(i_controleDeSaidas_clock_port, OUTPUT);
  pinMode(i_controleDeSaidas_update_port, OUTPUT);
  pinMode(i_controleDeSaidas_serialInput_port, OUTPUT);

  // Estado inicial das portas
  digitalWrite(i_controleDeSaidas_clock_port, LOW);
  digitalWrite(i_controleDeSaidas_update_port, LOW);
  digitalWrite(i_controleDeSaidas_serialInput_port, LOW);

  // Atualiza saidas
  e_controleDeSaidas_updateSaidas_fnct();

}

// Função alterar saidas
void e_controleDeSaidas_updateSaidas_fnct() {

  // Vetor com valores de todas as saídas
  bool saidas[16]= {
    e_controleDeEntradas_update_var,
    e_controleDeEntradas_clock_var,
    KeyPadC1,
    KeyPadC2,
    KeyPadC3,
    LedDigito1,
    LedDigito2,
    LedDigito3,
    LedDigito4,
    Unlocked,
    SensorOn,
    0,
    0,
    0,
    0,
    0
  };

  // Coloca todas sadias no valor determinado
  for(int cont = 15; cont >=0 ; cont--) {
    digitalWrite(i_controleDeSaidas_serialInput_port, saidas[cont]);
    delayMicroseconds(i_controleDeSaidas_timedelay_time);
    i_controleDeSaidas_clock_fnct();
  }

  //Atualiza saidas
  i_controleDeSaidas_update_fnct();
  
}
