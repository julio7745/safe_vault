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
    // Verifica se há dados disponíveis para leitura
    if (Serial.available()) {
        // Cria um buffer para armazenar a linha lida
        String input = Serial.readStringUntil('\n'); // Lê até a nova linha
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
            if (varName == "var74HC165Input") {
                if (varValue == "LOW") {
                    var74HC165Input = LOW;
                } else if (varValue == "HIGH") {
                    var74HC165Input = HIGH;
                }
            } else if (varName == "var74HC165Clock") {
                if (varValue == "LOW") {
                    var74HC165Clock = LOW;
                } else if (varValue == "HIGH") {
                    var74HC165Clock = HIGH;
                }
            }if (varName == "varKeyPadC1") {
                if (varValue == "LOW") {
                    varKeyPadC1 = LOW;
                } else if (varValue == "HIGH") {
                    varKeyPadC1 = HIGH;
                }
            } else if (varName == "varKeyPadC2") {
                if (varValue == "LOW") {
                    varKeyPadC2 = LOW;
                } else if (varValue == "HIGH") {
                    varKeyPadC2 = HIGH;
                }
            } else if (varName == "varKeyPadC3") {
                if (varValue == "LOW") {
                    varKeyPadC3 = LOW;
                } else if (varValue == "HIGH") {
                    varKeyPadC3 = HIGH;
                }
            } else if (varName == "varLedDigito1") {
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
            } 
        }
    }
}

void updateKeyPad() {
    // Função de atualização do teclado (a ser implementada)
}

void loop() {
    updateOutputs();
    updateInputs();
    updateKeyPad();
}
