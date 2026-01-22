
// Define valores constantes
#define expirationTime 500
#define minimumPressureTime 100
#define minimumpressureTimeToRepeat 1300
#define timeToRepeat 200

//Imports
void e_controleDeSaidas_updateSaidas_fnct();
void e_controleDeEntradas_updateEntradas_fnct();

// Outputs (Colunas)
bool e_controleDoKeyPad_keyPadC0_var = LOW;
bool e_controleDoKeyPad_keyPadC1_var = LOW;
bool e_controleDoKeyPad_keyPadC2_var = LOW;

// Inputs (Linhas)
bool e_controleDoKeyPad_keyPadL0_var = LOW;
bool e_controleDoKeyPad_keyPadL1_var = LOW;
bool e_controleDoKeyPad_keyPadL2_var = LOW;
bool e_controleDoKeyPad_keyPadL3_var = LOW;

// Classe para botões
class i_controleDoKeyPad_botao_class {

  // Privados
  private:
    // Valores armazenados
    bool value = LOW;
    unsigned long lastStartClick = 0, lastClik = 0;

  // Publicos 
  public:
    // Constructor: mesmo nome da classe
    i_controleDoKeyPad_botao_class() {}

    bool newClick () {

      if ( lastStartClick == 0){
        lastStartClick = millis();
      }
      
      if ( (lastStartClick + minimumPressureTime < millis()) && value == LOW ){
        lastClik = millis();
        value = HIGH;
        return HIGH;
      } 

      if ( (lastStartClick + minimumPressureTime < millis()) && millis() > lastClik + timeToRepeat && millis() > lastStartClick + minimumpressureTimeToRepeat ){
        lastClik = millis();
        value = HIGH;
        return HIGH;
      } 

      return LOW;
    }

    void releaseClick () {

      lastStartClick = 0;
      value = LOW;
      
    }

};

// Classe para Linhas
class i_controleDoKeyPad_linha_class {

  // Privados
  private:
    // Valores armazenados
    i_controleDoKeyPad_botao_class botoes[3];

  // Publicos 
  public:
    // Constructor: mesmo nome da classe
    i_controleDoKeyPad_linha_class() {}

    bool newClick(int col){
      return botoes[col].newClick();
    }

    void releaseClick(int col){
      botoes[col].releaseClick();
    }
    
};

class i_controleDoKeyPad_pressed_class {

  // Privados
  private:
    // Valores armazenados
    unsigned long lastStartClick = 0;
    char tecla = '\0';

  // Publicos 
  public:
    // Constructor: mesmo nome da classe
    i_controleDoKeyPad_pressed_class() {}
    
    unsigned long getlastStartClick () {
      return lastStartClick;
    }
    char getTecla () {
      return tecla;
    }
    
    void resetPressed () {
       lastStartClick = 0, tecla = '\0';
    }

    void newPressed (const char key) {
      lastStartClick = millis();
      tecla = key;
    }
  
};

// Classe para KeyPad
class i_controleDoKeyPad_keyPad_class {

  // Privados
  private:
    // Valores armazenados
    i_controleDoKeyPad_linha_class linhas[4]; 
    i_controleDoKeyPad_pressed_class pressed[5];

    void removePrimeiroPressed(){
        pressed[0] = pressed[1];
        pressed[1] = pressed[2];
        pressed[2] = pressed[3];
        pressed[3] = pressed[4];
        pressed[4].resetPressed();
    }

  // Publicos 
  public:
    // Constructor: mesmo nome da classe
    i_controleDoKeyPad_keyPad_class() {}

    char getPressed () {
      
      if ( pressed[0].getlastStartClick() == 0 ) {
        return '\0';
      }
      
      if ( ( pressed[0].getlastStartClick() + expirationTime ) < millis() ){
        removePrimeiroPressed();
        return getPressed();
      }
      
      const char tecla = pressed[0].getTecla();
      removePrimeiroPressed();
      return tecla;

    }

    void updateKeys (int col) {

      bool* statusLinhas[4] = {
        &e_controleDoKeyPad_keyPadL0_var, 
        &e_controleDoKeyPad_keyPadL1_var, 
        &e_controleDoKeyPad_keyPadL2_var, 
        &e_controleDoKeyPad_keyPadL3_var
      };

      char mapaTeclas[4][3] = {
          {'1', '2', '3'},
          {'4', '5', '6'},
          {'7', '8', '9'},
          {'*', '0', '#'}
      };

      for (int contl = 0; contl < 4; contl++) {
        if (*statusLinhas[contl] == HIGH) { // Se a linha física está ativa
          int cont = 0;
          while (cont < 5 && pressed[cont].getlastStartClick() != 0) cont++;
          if (cont < 5) {
            if (linhas[contl].newClick(col)) {
               pressed[cont].newPressed(mapaTeclas[contl][col]);
            }
          }
        } else {
          linhas[contl].releaseClick(col);
        }
      }
      
    }
    
};

i_controleDoKeyPad_keyPad_class i_controleDoKeyPad_keyPad_obj;

char e_controleDoKeyPad_retornaTeclaPrecionada_fnct () {

  return i_controleDoKeyPad_keyPad_obj.getPressed();
 
}

void e_controleDoKeyPad_atualizaKeyPad_fnct () {

  e_controleDoKeyPad_keyPadC2_var = LOW;
  e_controleDoKeyPad_keyPadC0_var = HIGH;
  e_controleDeSaidas_updateSaidas_fnct();
  e_controleDeEntradas_updateEntradas_fnct();
  i_controleDoKeyPad_keyPad_obj.updateKeys(0);

  e_controleDoKeyPad_keyPadC0_var = LOW;
  e_controleDoKeyPad_keyPadC1_var = HIGH;
  e_controleDeSaidas_updateSaidas_fnct();
  e_controleDeEntradas_updateEntradas_fnct();
  i_controleDoKeyPad_keyPad_obj.updateKeys(1);

  e_controleDoKeyPad_keyPadC1_var = LOW;
  e_controleDoKeyPad_keyPadC2_var = HIGH;
  e_controleDeSaidas_updateSaidas_fnct();
  e_controleDeEntradas_updateEntradas_fnct();
  i_controleDoKeyPad_keyPad_obj.updateKeys(2);
 
}
