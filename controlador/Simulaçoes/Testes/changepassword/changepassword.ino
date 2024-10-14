
#include <Adafruit_Fingerprint.h>

SoftwareSerial mySerial(13, 15);

Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial, 2345);

// Using sensor with password
//Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial, 1337);

void setup()
{

  Serial.begin(115200);
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
