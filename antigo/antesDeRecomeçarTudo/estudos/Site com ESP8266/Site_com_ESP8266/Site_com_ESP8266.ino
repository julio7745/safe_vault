//Bibliotecas
#include <ESPAsyncWebServer.h>

AsyncWebServer server(80);

String rede = "index", senha = "ipv432072", color;

void setup() {

  if(!SPIFFS.begin()){
    Serial.println("Erro ao iniciar o SPIFF");
    return;
  }

  Serial.begin(115200);
  delay(500);
  Serial.println("");

  Serial.println("Conectando ao wifi " + rede);
  WiFi.begin(rede, senha);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.println(WiFi.localIP());

  server.on("/style.css", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/style.css", "text/css");
  });
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/index.html", String(), false, processor);
  });

  server.on("/update", HTTP_GET, [] (AsyncWebServerRequest *request){   
    Serial.print("---> ");
    color = request->getParam("color")->value();
    Serial.println(color);
    request->send(SPIFFS, "/index.html", String(), false, processor); 
  });

  // Inicio o servidor
  server.begin();
  
}

void loop() {

}

String processor(const String& var){  
  if(color=="1"){
    Serial.println("color == green");
    return "style=\"color:green\"";
  }
  if(color=="2"){
    Serial.println("color == red");
    return "style=\"color:red\"";
  }
  if(color=="3"){
    Serial.print("color == blue");
    return "style=\"color:blue\"";
  }
  if(color=="4"){
    Serial.print("color == yellow");
    return "style=\"color:yellow\"";
  }
  return "erro";
}
