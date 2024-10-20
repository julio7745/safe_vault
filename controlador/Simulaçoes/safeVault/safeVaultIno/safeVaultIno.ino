// Constants

// Pins 

// Output 
#define pin74HC595SerialInput 2
#define pin74HC595Clock 3
#define pin74HC595Update 4

// Input
#define pin74HC165Output 5

// Variables

// Output Variables

// 74HC165 Control
bool var74HC165Update = true;
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

// Sensor Control
bool varSensorOn = false;

// Input Variables

// KeyPad Buttons
bool varKeyPadButtoms[12] = {false, false, false, false, false, false, false, false, false, false, false, false};

void setup() {

  // Serial Init
  Serial.begin(9600);
  Serial.println("Iniciado Terminal");

  // Pins Init
  
  // Output 
  pinMode(pin74HC595SerialInput, OUTPUT);
  digitalWrite(pin74HC595SerialInput, LOW);
  pinMode(pin74HC595Clock, OUTPUT);
  digitalWrite(pin74HC595Clock, LOW);
  pinMode(pin74HC595Update, OUTPUT);
  digitalWrite(pin74HC595Update, LOW);

  // Input
  pinMode(pin74HC165Output, INPUT);
  
}

void updateOutputs () {

  delay(100);

  bool outputs[] = {
    var74HC165Update, var74HC165Clock,
    varKeyPadC1, varKeyPadC2,varKeyPadC3, 
    varLedDigito1, varLedDigito2, varLedDigito3, varLedDigito4,
    varLock,
    varSensorOn
  };
  
  int outputsLength = sizeof(outputs) / sizeof(outputs[0]);

  for (int i = outputsLength - 1; i >= 0; i--) {

    digitalWrite(pin74HC595SerialInput, outputs[i]);
    digitalWrite(pin74HC595Clock, HIGH);
    digitalWrite(pin74HC595Clock, LOW);
    
  }

  digitalWrite(pin74HC595Update, HIGH);
  digitalWrite(pin74HC595Update, LOW); 
  
}
void updateInputs() {
    // Verifica se há dados disponíveis para leitura
    if (Serial.available()) {
        // Cria um buffer para armazenar a linha lida
        String input = Serial.readStringUntil('\n'); // Lê até a nova linha
        Serial.println(input);
        // Localiza o sinal de igual
        int equalsIndex = input.indexOf('=');
        
        // Se o sinal de igual for encontrado
        if (equalsIndex != -1) {
            // Divide o nome e o valor
            String varName = input.substring(0, equalsIndex); // Nome da variável
            String varValue = input.substring(equalsIndex + 1); // Valor

            // Remove espaços em branco
            varName.trim();
            varValue.trim();

            // Verifica e atribui o valor correspondente à variável
            if (varName == "varLedDigito1") {
                if (varValue == "LOW") {
                    varLedDigito1 = LOW;
                } else if (varValue == "HIGH") {
                    varLedDigito1 = HIGH;
                }
            } else if (varName == "varLedDigito2") {
                if (varValue == "LOW") {
                    varLedDigito2 = LOW;
                } else if (varValue == "HIGH") {
                    varLedDigito2 = HIGH;
                }
            } else
             if (varName == "varLedDigito3") {
                if (varValue == "LOW") {
                    varLedDigito3 = LOW;
                } else if (varValue == "HIGH") {
                    varLedDigito3 = HIGH;
                }
            } else if (varName == "varLedDigito4") {
                if (varValue == "LOW") {
                    varLedDigito4 = LOW;
                } else if (varValue == "HIGH") {
                    varLedDigito4 = HIGH;
                }
            } else if (varName == "varLock") {
                if (varValue == "LOW") {
                    varLock = LOW;
                } else if (varValue == "HIGH") {
                    varLock = HIGH;
                }
            } else if (varName == "varSensorOn") {
                if (varValue == "LOW") {
                    varSensorOn = LOW;
                } else if (varValue == "HIGH") {
                    varSensorOn = HIGH;
                }
            } 
        }
    }
}

void updateKeyPad() {

  bool varDigito1 = false;
  bool varDigito2 = false;
  bool varDigito3 = false;
  bool varDigito4 = false;
  bool varDigito5 = false;
  bool varDigito6 = false;
  bool varDigito7 = false;
  bool varDigito8 = false;
  bool varDigito9 = false;
  bool varDigitoA = false;
  bool varDigito0 = false;
  bool varDigitoB = false;

  varKeyPadC1 = HIGH;
  varKeyPadC2 = LOW;
  varKeyPadC3 = LOW;
  updateOutputs();

  var74HC165Update = LOW;
  updateOutputs();
  var74HC165Update = HIGH;
  updateOutputs();

  varDigito1 = digitalRead(pin74HC165Output);

  var74HC165Clock = LOW;
  updateOutputs();
  var74HC165Clock = HIGH;
  updateOutputs();

  varDigito4 = digitalRead(pin74HC165Output);

  var74HC165Clock = LOW;
  updateOutputs();
  var74HC165Clock = HIGH;
  updateOutputs();

  varDigito7 = digitalRead(pin74HC165Output);

  var74HC165Clock = LOW;
  updateOutputs();
  var74HC165Clock = HIGH;
  updateOutputs();

  varDigitoA = digitalRead(pin74HC165Output);

  varKeyPadC1 = LOW;
  varKeyPadC2 = HIGH;
  varKeyPadC3 = LOW;
  updateOutputs();

  var74HC165Update = LOW;
  updateOutputs();
  var74HC165Update = HIGH;
  updateOutputs();

  varDigito2 = digitalRead(pin74HC165Output);

  var74HC165Clock = LOW;
  updateOutputs();
  var74HC165Clock = HIGH;
  updateOutputs();

  varDigito5 = digitalRead(pin74HC165Output);

  var74HC165Clock = LOW;
  updateOutputs();
  var74HC165Clock = HIGH;
  updateOutputs();

  varDigito8 = digitalRead(pin74HC165Output);

  var74HC165Clock = LOW;
  updateOutputs();
  var74HC165Clock = HIGH;
  updateOutputs();

  varDigito0 = digitalRead(pin74HC165Output);

  varKeyPadC1 = LOW;
  varKeyPadC2 = LOW;
  varKeyPadC3 = HIGH;
  updateOutputs();

  var74HC165Update = LOW;
  updateOutputs();
  var74HC165Update = HIGH;
  updateOutputs();

  varDigito3 = digitalRead(pin74HC165Output);

  var74HC165Clock = LOW;
  updateOutputs();
  var74HC165Clock = HIGH;
  updateOutputs();

  varDigito6 = digitalRead(pin74HC165Output);

  var74HC165Clock = LOW;
  updateOutputs();
  var74HC165Clock = HIGH;
  updateOutputs();

  varDigito9 = digitalRead(pin74HC165Output);

  var74HC165Clock = LOW;
  updateOutputs();
  var74HC165Clock = HIGH;
  updateOutputs();

  varDigitoB = digitalRead(pin74HC165Output);
  
}

void loop() {
    updateOutputs();
    updateInputs();
    updateKeyPad();
}
