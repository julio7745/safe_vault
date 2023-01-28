//Bibliotecas
#include <ESPAsyncWebServer.h>
#include <FS.h>
#include <Adafruit_Fingerprint.h>
#include <SoftwareSerial.h>
#include <Keypad.h>

AsyncWebServer server(80);

// INSTANCIANDO OBJETOS
SoftwareSerial mySerial(D7, D8); // mySerial(Tx, Rx) <-- Pinagens do Sensor;
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);

String nome="", sobrenome="", senha="", lv="", id="", idl="", retorno="";
int processo = 0, fase = 0, erro = 0, aberto = 0;

int dia = 1, mes = 2 , ano = 3, hora = 4, minuto = 5;

void setup() {

  finger.begin(57600);
  
  Serial.begin(115200);
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

  //inicia SPIFFS
  if(!SPIFFS.begin()){
    Serial.println("Erro ao iniciar o SPIFFS");
    return;
  }

  //Conecta à um wifi
  Serial.println("Conectando ao wifi");
  WiFi.begin("index", "ipv432072");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  //exibe IP
  Serial.println("");
  Serial.println(WiFi.localIP());

  randomSeed(millis());

  //Declara envios para cada requisições

  //CSSs
  //login
  server.on("/estilos-login.css", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/estilos-login.css", "text/css");
  });
  //geral
  server.on("/estilos-geral.css", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/estilos-geral.css", "text/css");
  });
  //home
  server.on("/estilos-home.css", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/estilos-home.css", "text/css");
  });
  //inspecao
  server.on("/estilos-inspecao.css", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/estilos-inspecao.css", "text/css");
  });
  //abertura
  server.on("/estilos-abertura.css", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/estilos-abertura.css", "text/css");
  });
  //abertura
  server.on("/estilos-abertura2.css", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/estilos-abertura2.css", "text/css");
  });

  //HTML
  //inicial 
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    Serial.println("inicial!");
    erro = 0;
  request->send(SPIFFS, "/pages-login.html", String(), false, processor);
  });

  //Login
  server.on("/pages-login.html", HTTP_GET, [](AsyncWebServerRequest *request){
      String userl = request->getParam("user")->value();
      String senhal = request->getParam("senha")->value();
      //limpeza
      nome = "", sobrenome = "", senha = "", lv = "", id = "";
      File arq = SPIFFS.open("/users.txt" , "r");
      if(!arq){Serial.println("file open failed");}
      char aux = char(arq.read());
      while(arq.available()){
        char aux2 = char(arq.read());
        if (aux2 == 'A'){
          //verificação
          Serial.println(String(nome+"."+sobrenome));
          if( userl == String(nome+"."+sobrenome) ){
            if(senhal==senha){
              Serial.println("loguei!");
              request->send(SPIFFS, "/pages-reload.html", String(), false, processor);
              arq.close();
              return;
            }else{
              erro = 2;
              Serial.println("erro!");
              request->send(SPIFFS, "/pages-login.html", String(), false, processor);
              arq.close();
              return;
            }
          }
          //limpeza
          nome = "", sobrenome = "", senha = "", lv = "", id = "";
        }else
        if(aux2 == 'B' || aux2 == 'C'|| aux2 == 'D' || aux2 == 'E'){
          aux = aux2;
        }else
        
        //Leitura de dados
        if(aux=='A'){
          nome += aux2;
        }else
        if(aux=='B'){
          sobrenome += aux2;
        }else
        if(aux=='C'){
          senha += aux2;
        }else
        if(aux=='D'){
          lv += aux2;
        }else
        if(aux=='E'){
          id += aux2;
        }
      }   
      erro = 1;
      Serial.println("erro!");
      request->send(SPIFFS, "/pages-login.html", String(), false,  processor);
      arq.close();
      return;
  });

  //home
  server.on("/pages-home.html", HTTP_GET, [](AsyncWebServerRequest *request){

      String idl = request->getParam("id")->value();
      atualizauser(idl);
      processo = 0;
      request->send(SPIFFS, "/pages-home.html", String(), false,  processor);

  });

  //Inspecao
  server.on("/pages-inspecao.html", HTTP_GET, [](AsyncWebServerRequest *request){

      String idl = request->getParam("id")->value();
      atualizauser(idl);
      request->send(SPIFFS, "/pages-inspecao.html", String(), false,  processor);
      
  });
  
  //Abertura
  server.on("/pages-abertura.html", HTTP_GET, [](AsyncWebServerRequest *request){

      idl = request->getParam("id")->value();
      atualizauser(idl);
      processo = 1;
      //apos corrigir o erro, preciso atualizar a fase p/ 0
      fase = 0;
      request->send(SPIFFS, "/pages-abertura.html", String(), false,  processor);
  });
  //Abertura
  server.on("/pages-abertura2.html", HTTP_GET, [](AsyncWebServerRequest *request){
      request->send(SPIFFS, "/pages-abertura2.html", String(), false,  processor);
  });
  
  // Inicia o servidor
  server.begin();
  
}

void loop() {
  if ( processo == 1 && fase == 0 ){
    ledigital();
  }else
  if (processo == 1 && fase == 1 ){
    lesenha(); 
  }else
  if (processo == 1 && fase == 2 ){
      Serial.println("Abre cofre");
      abrecofre(); 
  }

  if (millis() > aberto && processo == 1 && fase == 2 ){
    //fecha cofre
    fechacofre();
  }
  
}

/*
  File users;

  APAGAR ARQUIVO 
  SPIFFS.remove(user)

  ABRIR ARQUIVO
  user = SPIFFS.open("user.json" , "a");

  Modos: 
  r = somente leitura com cursor no inicio do documento 
  r+ = leitura e escrita com cursor no inicio do documento 
  
 */



 

 
