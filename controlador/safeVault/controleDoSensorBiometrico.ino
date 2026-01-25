
//Bibliotecas
#include <SoftwareSerial.h>
#include <Adafruit_Fingerprint.h>

// Instancia serial simulada
SoftwareSerial i_controleDoSensorBiometrico_mySerial_obj (12, 13); // (ESP) GPIO12/D6, GPIO13/D7 - RX, TX

// Instancia sensor
Adafruit_Fingerprint i_controleDoSensorBiometrico_finger_obj (&i_controleDoSensorBiometrico_mySerial_obj, 0);

//imports
void e_controleDeSaidas_updateSaidas_fnct();
void e_controleDosLeds_tooggleAll_fnct();
void e_controleDosLeds_resetAll_fnct();
extern int dedoID;
extern int confianca;

// Declara variaveis de controle
bool e_controleDoSensorBiometrico_sensorOn_var = LOW;
bool i_controleDoSensorBiometrico_emLeitura_var = LOW;
bool i_controleDoSensorBiometrico_sensorFailure_var = LOW;
unsigned long i_controleDoSensorBiometrico_lastCommunicationFailureCheck_var = 0;
unsigned int i_controleDoSensorBiometrico_validityLastCommunicationFailureCheck_var = 20 * 1000;
int fase = 0;

// Função que inicia a leitura
void i_controleDoSensorBiometrico_startLeitura_fnct () {

  // Se tiver em leitura, retorna
  if (i_controleDoSensorBiometrico_emLeitura_var) return;

  // Inicial leitura
  i_controleDoSensorBiometrico_emLeitura_var = HIGH;
  // Liga sensor
  e_controleDoSensorBiometrico_sensorOn_var = HIGH;
  e_controleDeSaidas_updateSaidas_fnct();
  // Inicia comunicação serial com o sensor
  i_controleDoSensorBiometrico_finger_obj.begin(57600);

}

void i_controleDoSensorBiometrico_sensorSetErro_fnct (const char* err) {

  // Pisca os leds, seta erro e manda no terminal
  e_controleDosLeds_tooggleAll_fnct();
  i_controleDoSensorBiometrico_sensorFailure_var = HIGH;
  Serial.printf("\r\ni_controleDoSensorBiometrico_verificaComunicacao_fnct:\r\n");
  Serial.printf("Fingerprint sensor NOK: %s \r\n", err);

}

void i_controleDoSensorBiometrico_sensorResetErro_fnct () {

  // Apaga os leds e limpa erro
  e_controleDosLeds_resetAll_fnct();
  i_controleDoSensorBiometrico_sensorFailure_var = LOW;

}

// Função que verifica comunicação
void i_controleDoSensorBiometrico_verificaComunicacao_fnct () {

  if ( millis() < i_controleDoSensorBiometrico_lastCommunicationFailureCheck_var + i_controleDoSensorBiometrico_validityLastCommunicationFailureCheck_var &&
       i_controleDoSensorBiometrico_lastCommunicationFailureCheck_var != 0 ) return;

  // Verifica comunicação
  if (i_controleDoSensorBiometrico_finger_obj.verifyPassword()) { // Se tiver comunicação

    // Atuualiza ultima verificação
    i_controleDoSensorBiometrico_lastCommunicationFailureCheck_var = millis();

    // Se tem erro armazenado
    if (i_controleDoSensorBiometrico_sensorFailure_var) {
      // Apaga o erros armazanados
      i_controleDoSensorBiometrico_sensorResetErro_fnct ();
    }

  } else { // Se ñ tiver comunicação

    i_controleDoSensorBiometrico_sensorSetErro_fnct("Communication error");

  }

}

// Função que realiza a leitura
void i_controleDoSensorBiometrico_realizaLeitura_fnct () {

  uint8_t p = i_controleDoSensorBiometrico_finger_obj.getImage();
  switch (p) {
    case FINGERPRINT_OK:
      break;
    case FINGERPRINT_NOFINGER:
      // TODO: Pede tela de colocar o dedo
      return;
    case FINGERPRINT_IMAGEFAIL:
      // TODO: Pede tela de remover e colocar o dedo novamente
      return;
    case FINGERPRINT_PACKETRECIEVEERR:
      i_controleDoSensorBiometrico_sensorSetErro_fnct("Communication error");
      return;
    default:
      i_controleDoSensorBiometrico_sensorSetErro_fnct("Unknown error");
      return;
  }

  p = i_controleDoSensorBiometrico_finger_obj.image2Tz();
  switch (p) {
    case FINGERPRINT_OK:
      break;
    case FINGERPRINT_IMAGEMESS:
      // TODO: Pede tela de remover e colocar o dedo
      return;
    case FINGERPRINT_FEATUREFAIL:
      // TODO: Pede tela de remover e colocar o dedo
      return;
    case FINGERPRINT_INVALIDIMAGE:
      // TODO: Pede tela de remover e colocar o dedo
      return;
    case FINGERPRINT_PACKETRECIEVEERR:
      i_controleDoSensorBiometrico_sensorSetErro_fnct("Communication error");
      return ;
    default:
      i_controleDoSensorBiometrico_sensorSetErro_fnct("Unknown error");
      return;
  }

  p = i_controleDoSensorBiometrico_finger_obj.fingerSearch();
  switch (p) {
    case FINGERPRINT_OK:
      fingerId = i_controleDoSensorBiometrico_finger_obj.fingerID;
      confidence = i_controleDoSensorBiometrico_finger_obj.confidence;
      i_controleDoSensorBiometrico_finishLeitura_fnct();
      return;
    case FINGERPRINT_NOTFOUND:
      // TODO: Pede tela de remover e colocar o dedo
      return;
    case FINGERPRINT_PACKETRECIEVEERR:
      i_controleDoSensorBiometrico_sensorSetErro_fnct("Communication error");
      return ;
    default:
      i_controleDoSensorBiometrico_sensorSetErro_fnct("Unknown error");
      return;
  }
}

// Função que finaliza a leitura
void i_controleDoSensorBiometrico_finishLeitura_fnct () {

  // Se não estiver em leitura
  if (!i_controleDoSensorBiometrico_emLeitura_var) {
    // Desliga o sensor
    e_controleDoSensorBiometrico_sensorOn_var = LOW;
    e_controleDeSaidas_updateSaidas_fnct();
    i_controleDoSensorBiometrico_sensorResetErro_fnct();
  }

}

// Função que lê digital
void e_controleDoSensorBiometrico_leDigital_fnct () {

  i_controleDoSensorBiometrico_startLeitura_fnct();
  i_controleDoSensorBiometrico_verificaComunicacao_fnct();
  i_controleDoSensorBiometrico_realizaLeitura_fnct();
  i_controleDoSensorBiometrico_finishLeitura_fnct();

  return;

}
