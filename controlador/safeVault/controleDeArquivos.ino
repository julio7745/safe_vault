
// Bibliotecas
#include <LittleFS.h>

// Função de escrever (Write (w))
void e_controleDeArquivos_writeFile_fnct(String fileName, String newText) {

  // Inicia sistema de Arquivos
  if (!LittleFS.begin()) {
    Serial.printf("\r\ncontroleDeArquivos - e_controleDeArquivos_reescreveArquivo_fnct:\r\n");
    Serial.printf("Error mounting the LittleFS \r\n");
    return;
  }

  // Abre arquivo no modo de escrever
  File file = LittleFS.open(fileName, "w");

  // Se não conseguir abrir o arquivo, escreve o erro
  if (!file) {
    Serial.printf("\r\ne_controleDeArquivos_reescreveArquivo_fnct:\r\n");
    Serial.printf("Error opening file for writing \r\n");
    LittleFS.end();
    return;
  }

  // Escreve texto
  file.println(newText);

  // Salva e fechar o arquivo
  file.close();

  LittleFS.end();
  return;

}

// Função de ler (Read (r))
String e_controleDeArquivos_readFile_fnct(String fileName) {

  // Inicia sistema de Arquivos
  if (!LittleFS.begin()) {
    Serial.printf("\r\ncontroleDeArquivos - e_controleDeArquivos_reescreveArquivo_fnct:\r\n");
    Serial.printf("Error mounting the LittleFS \r\n");
    return "";
  }

  // Verifica se arquivo existe
  const bool fileExists = LittleFS.exists(fileName);
  if (!fileExists) {
    LittleFS.end();
    return "";
  }

  // Abre arquivo no modo de leitura
  File file = LittleFS.open(fileName, "r");

  // Se não conseguir abrir o arquivo, escreve o erro
  if (!file) {
    Serial.printf("\r\ne_controleDeArquivos_reescreveArquivo_fnct:\r\n");
    Serial.printf("Error opening file for writing \r\n");
    LittleFS.end();
    return "";
  }

  String text = file.readString();

  file.close();

  LittleFS.end();
  return text;

}

// Função de escrever no final Anexar (Append (a))
void e_controleDeArquivos_appendFile_fnct(String fileName, String newText) {

  // Inicia sistema de Arquivos
  if (!LittleFS.begin()) {
    Serial.printf("\r\ncontroleDeArquivos - e_controleDeArquivos_reescreveArquivo_fnct:\r\n");
    Serial.printf("Error mounting the LittleFS \r\n");
    return;
  }

  // Abre arquivo no modo de anexar
  File file = LittleFS.open(fileName, "a");

  // Se não conseguir abrir o arquivo, escreve o erro
  if (!file) {
    Serial.printf("\r\ne_controleDeArquivos_reescreveArquivo_fnct:\r\n");
    Serial.printf("Error opening file for writing \r\n");
    LittleFS.end();
    return;
  }

  // Escreve texto
  file.println(newText);

  // Salva e fechar o arquivo
  file.close();

  LittleFS.end();
  return;

}
