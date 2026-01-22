
#include <SoftwareSerial.h>
#include <Adafruit_Fingerprint.h>

SoftwareSerial mySerial(D6,D7); // RX, TX (ESP)

Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial, 0);
//Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial, PASSWORD);

void setup()
{

  // Inicia Comunicação Serial
  Serial.begin(115200);
  Serial.println("Serial Iniciada");

  Serial.println("Adafruit fingerprint sensor, change password example");
  
  // set the data rate for the sensor serial port
  finger.begin(57600);

  if (finger.verifyPassword()) {
    Serial.println("Found fingerprint sensor!");
    Serial.println(finger.verifyPassword());
    
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
}

void loop()
{

}
