// Constants

// Pins 
#define pin74HC595Input 2
#define pin74HC595Clock 3
#define pin74HC595Update 4

// Variables

// Output Variables

// 74HC165 Control
bool var74HC165Input = true;
bool var74HC165Clock = true;

// KeyPad Collums
bool varKeyPadC1 = false;
bool varKeyPadC2 = false;
bool varKeyPadC3 = false;

// Indicative Code LEDs
bool varLedDigito1 = false;
bool varLedDigito2 = false;
bool varLedDigito3 = false;
bool varLedDigito4 = false;

// Lock
bool varLock = false;

// Input Variables

// KeyPad Buttons
bool varKeyPadButtoms[9] = {false, false, false, false, false, false, false, false, false};

void setup() {

//  Serial.begin(9600);
//  delay(100);
//  Serial.println("iniciado");

  pinMode(pin74HC595Input, OUTPUT);
  pinMode(pin74HC595Clock, OUTPUT);
  pinMode(pin74HC595Update, OUTPUT);

  digitalWrite(pin74HC595Input, LOW);
  digitalWrite(pin74HC595Clock, LOW);
  digitalWrite(pin74HC595Update, LOW);
 

}

void updateOutputs () {

  bool outputs[] = {
    var74HC165Input, var74HC165Clock,
    varKeyPadC1, varKeyPadC2,varKeyPadC3, 
    varLedDigito1, varLedDigito2, varLedDigito3, varLedDigito4,
    varLock
  };
  int outputsLength = sizeof(outputs) / sizeof(outputs[0]);

  for (int i = outputsLength - 1; i >= 0; i--) {

    digitalWrite(pin74HC595Input, outputs[i]);
    digitalWrite(pin74HC595Clock, HIGH);
    digitalWrite(pin74HC595Clock, LOW);
    
  }

  digitalWrite(pin74HC595Update, HIGH);
  digitalWrite(pin74HC595Update, LOW); 
  
}
void updateInputs() {
   
}

void updateKeyPad() {
    
}

void loop() {
    updateOutputs();
//    updateInputs();
//    updateKeyPad();

    delay(1000);
    varLedDigito3 = true;
    updateOutputs();
    
    delay(1000);
    varLedDigito3 = false;
    varLedDigito4 = true;
    updateOutputs();

    delay(1000);
    varLedDigito4 = false;
    updateOutputs();

    delay(1000);
}
