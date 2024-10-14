void setup() {
  Serial.begin(115200);

  // Obtém o tamanho total da memória Flash
  uint32_t flashSize = ESP.getFlashChipSize();
  
  Serial.print("Tamanho total da memória flash: ");
  Serial.print(flashSize / 1024 / 1024); // Converte para MB
  Serial.println(" MB");
}

void loop() {
}
