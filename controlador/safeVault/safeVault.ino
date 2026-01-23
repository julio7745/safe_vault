

//imports
void e_controleDeSaidas_iniciaSaidas_fnct();
void e_controleDeEntradas_iniciaEntradas_fnct();
void e_controleDoKeyPad_atualizaKeyPad_fnct();
void e_controleDeSaidas_updateSaidas_fnct();
void e_controleDeEntradas_updateEntradas_fnct();
char e_controleDoKeyPad_retornaTeclaPrecionada_fnct();
void e_controleDoSensorBiometrico_leDigital_fnct();

// Outputs
bool Unlocked = LOW;

// Declara variaveis de controle
int fingerId = 0;
int confidence = 0;

// Loop de inicialização
void setup() {

  // Inicia comunicação serial
  Serial.begin(9600);
  delay(100);
  Serial.println("Serial Iniciada");

  // Inicia saidas e entradas
  e_controleDeSaidas_iniciaSaidas_fnct();
  e_controleDeEntradas_iniciaEntradas_fnct();
  
}

// Loop principal
void loop() {

  // Atualiza entradas saidas e teclado
  e_controleDoKeyPad_atualizaKeyPad_fnct();
  e_controleDeSaidas_updateSaidas_fnct();
  e_controleDeEntradas_updateEntradas_fnct();

  // Recebimento de teclas
  char key = e_controleDoKeyPad_retornaTeclaPrecionada_fnct();
  Serial.print(key);

  // Recebimento de digital
  e_controleDoSensorBiometrico_leDigital_fnct();
  if ( fingerId != 0){
    Serial.printf("\r\nDigital Lida: %i. Confiança: %i \r\n", fingerId, confidence);
    fingerId = 0;
    confidence = 0;
  }

}
