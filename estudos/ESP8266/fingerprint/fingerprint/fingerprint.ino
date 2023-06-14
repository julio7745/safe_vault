// INCLUSÃO DAS BIBLIOTECAS BAIXADAS!
#include <Adafruit_Fingerprint.h>
#include <SoftwareSerial.h>
#include <Wire.h>

#define trava 13

// INSTANCIANDO OBJETOS
SoftwareSerial mySerial(D7, D8); // mySerial(Tx, Rx) <-- Pinagens do Sensor;
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);

// DECLARAÇÃO DAS VARIÁVEIS E FUNCOES
uint8_t numID = 0;
bool gravar = false;

uint8_t modoGravacaoID(uint8_t IDgravar);

void setup() {

  pinMode(trava, OUTPUT);
  digitalWrite(trava, HIGH);

  Serial.begin(115200);
  finger.begin(57600);
  delay(500);
  Serial.println("Serial iniciada");

  if (finger.verifyPassword()) {
    Serial.println("DY-50 encontrado!");
    delay(1000);
  } else {
    Serial.println("DY-50 não encontrado");
    delay(3000);
    while (true) {
      delay(1);
    }
  }
  Serial.println("sensor Carregado");
  
  delay(900);
  Serial.println("   Aguardando");
  Serial.println("   entrada");


}
int incomingByte = 0; // variável para o dado recebido
void loop() {

  if (Serial.available() > 0) {
    // lê do buffer o dado recebido:
    incomingByte = Serial.read();
  }

  if ( incomingByte == (int) 'G' ) {
    gravar = true;
  }

  if (gravar) {
    modoGravacaoID(numID++);
    gravar = false;
  }

  getFingerprintIDez();

}

uint8_t modoGravacaoID(uint8_t IDgravar) {

  int p = -1;
  Serial.println("Registre o ADM #");
  Serial.println(IDgravar);
  delay(2000);

  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    switch (p) {
      case FINGERPRINT_OK:
        Serial.println(" concluído");
        break;
      case FINGERPRINT_NOFINGER:
        Serial.println(".");
        delay(200);
        break;
      case FINGERPRINT_PACKETRECIEVEERR:
        Serial.println("Erro");
        break;
      case FINGERPRINT_IMAGEFAIL:
        Serial.println("Erro leitura");
        break;
      default:
        Serial.println("ERROR");
        break;
    }
  }

  // Se não entrou em algum dos erros, todos os processos estão OK !

  p = finger.image2Tz(1);
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Leitura convertida");
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("tente novamente ");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("ERROR");
      return p;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Endereço invalido");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Imagem invalida");
      return p;
    default:
      Serial.println("ERRO");
      return p;
  }

  Serial.println("Retire o Dedo");
  delay(2000);

  p = 0;
  while (p != FINGERPRINT_NOFINGER) {
    p = finger.getImage();
  }
  Serial.println("ID ");
  Serial.println(IDgravar);
  p = -1;
  Serial.println("  Insira o dedo ");

  Serial.println("  novamente");
  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    switch (p) {
      case FINGERPRINT_OK:
        Serial.println("Concluido ! ");
        break;
      case FINGERPRINT_NOFINGER:
        Serial.println(".");
        delay(200);
        break;
      case FINGERPRINT_PACKETRECIEVEERR:
        Serial.println("Erro no pacote");
        break;
      case FINGERPRINT_IMAGEFAIL:
        Serial.println("Erro na imagem");
        break;
      default:
        Serial.println("Erro ");
        break;
    }
  }

  // Se não entrou em algum dos erros, o primeiro processo está OK !

  p = finger.image2Tz(2);
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Leitura convertida");
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Má leitura");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Erro- comunicacao");
      return p;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Endereco invalido");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("imagem invalida");
      return p;
    default:
      Serial.println("Erro ");
      return p;
  }

  // Se não entrou em algum dos erros, todos os processos estão OK !
  Serial.println("Novo ID para #");
  Serial.println(IDgravar);

  p = finger.createModel();
  if (p == FINGERPRINT_OK) {
    Serial.println("As digitais batem!");
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Erro de comunicação");
    return p;
  } else if (p == FINGERPRINT_ENROLLMISMATCH) {
    Serial.println("As digitais não batem");
    return p;
  } else {
    Serial.println("Erro desconhecido");
    return p;
  }

  Serial.println("ID ");
  Serial.println(IDgravar);
  p = finger.storeModel(IDgravar);
  if (p == FINGERPRINT_OK) {
    Serial.println("Armazenado!");
    return p;
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Erro de comunicação");
    return p;
  } else if (p == FINGERPRINT_BADLOCATION) {
    Serial.println("Erro na memória");
    return p;
  } else if (p == FINGERPRINT_FLASHERR) {
    Serial.println("Erro-memória flash");
    return p;
  } else {
    Serial.println("Erro desconhecido");
    return p;
  }
}

int getFingerprintIDez() {
  uint8_t p = finger.getImage();
  if (p != FINGERPRINT_OK){ 
    return -1;
  }
  p = finger.image2Tz();
  if (p != FINGERPRINT_OK){
    Serial.println("finger.image2Tz()");
    return -1;
  }

  p = finger.fingerFastSearch();
  if (p != FINGERPRINT_OK){
    Serial.println("finger.fingerFastSearch()");
    return -1;
  }

  //Alguma digital foi reconhecida pelo sensor
    digitalWrite(trava, LOW);
    Serial.println("ID encontrado #");
    Serial.println(finger.fingerID);

    Serial.println("seguranca:");
    Serial.println(finger.confidence); //Confiabilidade da leitura !
    delay(1000); //<<----- Tempo que a trava ficará aberta em milisegundos
    digitalWrite(trava, HIGH);
    delay(1000);

    Serial.println("   Aguardando");
    Serial.println("   entrada");
    return 0;
}
