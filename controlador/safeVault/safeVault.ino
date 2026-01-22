
//imports
void e_controleDeSaidas_iniciaSaidas_fnct();
void e_controleDeEntradas_iniciaEntradas_fnct();
void e_controleDoKeyPad_atualizaKeyPad_fnct();
void e_controleDeSaidas_updateSaidas_fnct();
void e_controleDeEntradas_updateEntradas_fnct();
char e_controleDoKeyPad_retornaTeclaPrecionada_fnct();

// Outputs
bool LedDigito1 = LOW;
bool LedDigito2 = HIGH;
bool LedDigito3 = LOW;
bool LedDigito4 = HIGH;
bool Unlocked = LOW;
bool SensorOn = HIGH;

// INSTANCIANDO OBJETOS
//SoftwareSerial mySerial(D7, D8); // mySerial(Tx, Rx) <-- Pinagens do Sensor;
//Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);

//  KeyPadC1 = LOW;
//  KeyPadC2 = LOW;
//  KeyPadC3 = LOW;
//  LedDigito1 = LOW;
//  LedDigito2 = LOW;
//  LedDigito3 = LOW;
//  LedDigito4 = LOW;
//  Unlocked = LOW;  
//  SensorOn = LOW;

void setup() {
  
  Serial.begin(9600);
  delay(2000);
  Serial.println("Serial Iniciada");

  e_controleDeSaidas_iniciaSaidas_fnct();
  e_controleDeEntradas_iniciaEntradas_fnct();
  
}

unsigned long ultimo = millis();

void loop() {

  e_controleDoKeyPad_atualizaKeyPad_fnct();
  e_controleDeSaidas_updateSaidas_fnct();
  e_controleDeEntradas_updateEntradas_fnct();

  char key = e_controleDoKeyPad_retornaTeclaPrecionada_fnct();
  Serial.print(key);
  
  if (millis() > ultimo + 500) {

    LedDigito1 = !LedDigito1;
    LedDigito2 = !LedDigito2;
    LedDigito3 = !LedDigito3;
    LedDigito4 = !LedDigito4;
    Unlocked = !Unlocked;  
    SensorOn = !SensorOn;
    ultimo = millis();
    
  }
 
}
