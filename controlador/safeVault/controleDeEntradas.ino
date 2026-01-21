                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
// Declara variaveis de controle
bool e_controleDeEntradas_update_var = HIGH;
bool e_controleDeEntradas_clock_var = HIGH;

// Define portas
#define i_controleDeEntradas_input_port 12   // GPIO12/D6

// Função de inicialização
void e_controleDeEntradas_iniciaEntradas_fnct() {

  // Declara portas como entradas
  pinMode(i_controleDeEntradas_input_port, INPUT);

  // Reseta CI
  e_controleDeEntradas_update_var = HIGH;
  e_controleDeEntradas_clock_var = HIGH;
  e_controleDeSaidas_updateSaidas_fnct();
  
}

// Função de atualização
void i_controleDeEntradas_update_fnct() {
  
  // Entra no modo de atualizar portas
  e_controleDeEntradas_update_var = LOW;
  e_controleDeSaidas_updateSaidas_fnct();

  // Volta para o modo de Leitura
  e_controleDeEntradas_update_var = HIGH;
  e_controleDeSaidas_updateSaidas_fnct();
  
}

// Função de Clock
void i_controleDeEntradas_clock_fnct() {
  
  // Entra no modo de atualizar portas
  e_controleDeEntradas_clock_var = LOW;
  e_controleDeSaidas_updateSaidas_fnct();

  // Volta para o modo de Leitura
  e_controleDeEntradas_clock_var = HIGH;
  e_controleDeSaidas_updateSaidas_fnct();
  
}

// Função de leitura de entradas
void e_controleDeEntradas_updateEntradas_fnct() {

  // Vetor com as variaveis de entrada
  bool* entradas[4] = { &KeyPadL1, &KeyPadL2, &KeyPadL3, &KeyPadL4 };

  // Atualiza valores no CI
  i_controleDeEntradas_update_fnct();

  // Atualiza variaveis
  for(int cont=0; cont<4; cont++){

    // Lê entrada
    *entradas[cont] = digitalRead(i_controleDeEntradas_input_port);
    
    // Envia 1 clock
    i_controleDeEntradas_clock_fnct();
    
  }

}
