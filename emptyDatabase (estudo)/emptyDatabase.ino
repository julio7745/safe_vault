#include <Adafruit_Fingerprint.h>

SoftwareSerial mySerial(2, 3);

Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);

void setup()
{
  Serial.begin(9600);
  while (!Serial);  // For Yun/Leo/Micro/Zero/...
  delay(100);

  // set the data rate for the sensor serial port
  finger.begin(57600);

  if (finger.verifyPassword()) {
    Serial.println("Found fingerprint sensor! :)");
  } else {
    Serial.println("Did not find fingerprint sensor :(");
    while (1);
  }

    Serial.print("Set password... ");
    uint8_t p = finger.setPassword(0);
    if (p == FINGERPRINT_OK) {
    Serial.println("OK"); // Password is set
    } else {
    Serial.println("ERROR"); // Failed to set password
    }

  finger.emptyDatabase();

  Serial.println("Banco de digitais limpo :)");
}

void loop() {

  int p =-10;

  Serial.println("Coloque o dedo");
  while (p != FINGERPRINT_OK ){
    p = finger.getImage();
  }
 
  p = FINGERPRINT_NOFINGER;
  
  finger.image2Tz(1);
  
  Serial.println("coloque o dedo novamente para adiciona-lo");
  while (p != FINGERPRINT_OK ){
    p = finger.getImage();
  }
  
  finger.image2Tz(2);
  
  p = finger.createModel();     
  
  if ( p != FINGERPRINT_OK ){
    Serial.println("Não batem");
    return;
  }
  p = finger.storeModel(0);
  
  if (p != FINGERPRINT_OK ){
    Serial.println("Falha ao guardar na memoria");
    return;
  }
  Serial.println("Salva na posição 0");

  
}
