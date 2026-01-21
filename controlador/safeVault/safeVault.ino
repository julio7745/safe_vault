
// Outputs
bool KeyPadC1 = LOW;
bool KeyPadC2 = LOW;
bool KeyPadC3 = LOW;
bool LedDigito1 = LOW;
bool LedDigito2 = LOW;
bool LedDigito3 = LOW;
bool LedDigito4 = LOW;
bool Unlocked = LOW;
bool SensorOn = LOW;

//  KeyPadC1 = LOW;
//  KeyPadC2 = LOW;
//  KeyPadC3 = LOW;
//  LedDigito1 = LOW;
//  LedDigito2 = LOW;
//  LedDigito3 = LOW;
//  LedDigito4 = LOW;
//  Unlocked = LOW;  
//  SensorOn = LOW;

// Inputs
bool KeyPadL1 = LOW;
bool KeyPadL2 = LOW;
bool KeyPadL3 = LOW;
bool KeyPadL4 = LOW;

void setup() {
  
  Serial.begin(9600);
  delay(2000);
  Serial.println("Serial Iniciada");

  e_controleDeSaidas_iniciaSaidas_fnct();
  e_controleDeEntradas_iniciaEntradas_fnct;

}

void loop() {

  KeyPadC1 = LOW;
  KeyPadC2 = LOW;
  KeyPadC3 = LOW;
  LedDigito1 = LOW;
  LedDigito2 = LOW;
  LedDigito3 = LOW;
  LedDigito4 = LOW;
  Unlocked = LOW;  
  SensorOn = LOW;
  e_controleDeSaidas_updateSaidas_fnct();
  delay(1000);

  KeyPadC1 = HIGH;
  KeyPadC2 = HIGH;
  KeyPadC3 = HIGH;
  LedDigito1 = HIGH;
  LedDigito2 = HIGH;
  LedDigito3 = HIGH;
  LedDigito4 = HIGH;
  Unlocked = HIGH;  
  SensorOn = HIGH;
  e_controleDeSaidas_updateSaidas_fnct();
  delay(1000);
  

//  e_controleDeEntradas_updateEntradas_fnct();
//  Serial.printf("\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n");
//  Serial.printf("L1: %d\r\n", KeyPadL1);
//  Serial.printf("L2: %d\r\n", KeyPadL2);
//  Serial.printf("L3: %d\r\n", KeyPadL3);
//  Serial.printf("L4: %d\r\n", KeyPadL4);
//  delay(150);
 
}
