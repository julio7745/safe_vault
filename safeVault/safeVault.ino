//Bibliotecas
#include <ESPAsyncWebServer.h>
#include <FS.h>
#include <SoftwareSerial.h>
#include <Keypad.h>

AsyncWebServer server(80);

String nome="", sobrenome="", senha="", lv="", id="", idl="", retorno="";
int processo = 0, fase = 0, erro = 0, aberto = 0;

String dia = "0", mes = "0", ano = "0", hora = "0", minuto = "0";

String novonome="", novosobrenome="", novasenha="", novolv="", novoid="";

void setup() {

  Serial.begin(115200);
  delay(500);
  Serial.println("Serial iniciada");

  //inicia SPIFFS
  if(!SPIFFS.begin()){
    Serial.println("Erro ao iniciar o SPIFFS");
    return;
  }
  
  //Conecta à um wifi
  Serial.println("Conectando ao wifi");
  WiFi.begin("LinkSpeed_Index", "ipv432072");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  //exibe IP
  Serial.println("");
  Serial.println(WiFi.localIP());

  randomSeed(millis());

  //Declara envios para cada requisições

  //inicial 
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    Serial.println("inicial!");
    erro = 0;
  request->send(SPIFFS, "/pages-login.html", String(), false, processor);
  });

  //Login
  server.on("/pages-login.html", HTTP_GET, [](AsyncWebServerRequest *request){
      processo = 0;
      fase = 0;
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
          aux = aux2;
          //verificação
          Serial.println("inicio da verificação");
          Serial.println("dados");
          Serial.println(String(nome+"."+sobrenome));
          Serial.println("recebido");
          Serial.println(userl);
          if( userl == String(nome+"."+sobrenome) ){
            if(senhal==senha){
              Serial.println("loguei!");
              request->send(SPIFFS, "/pages-reload.html", String(), false, processor);
              arq.close();
              return;
            }else{
              erro = 2;
              Serial.println("erro de senha!");
              request->send(SPIFFS, "/pages-login.html", String(), false, processor);
              arq.close();
              return;
            }
          }
          //limpeza
          nome = "", sobrenome = "", senha = "", lv = "", id = "";
        }else
        if(aux2 == 'B' || aux2 == 'C'|| aux2 == 'D' || aux2 == 'E' || aux2 == 'F'){
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
      Serial.println("erro de usuario");
      request->send(SPIFFS, "/pages-login.html", String(), false,  processor);
      arq.close();
      return;
  });

  //home
  server.on("/pages-home.html", HTTP_GET, [](AsyncWebServerRequest *request){

      String idl = request->getParam("id")->value();
      
      atualizauser(idl);
      processo = 0;
      fase = 0;
      erro = 0;
      retorno = "";
      request->send(SPIFFS, "/pages-home.html", String(), false,  processor);

  });

  //Inspecao
  server.on("/pages-inspecao.html", HTTP_GET, [](AsyncWebServerRequest *request){

      String idl = request->getParam("id")->value();
      String aux = request->getParam("p")->value();
      if (aux == "1")
      {
        limparlog(); 
      }
      atualizauser(idl);
      request->send(SPIFFS, "/pages-inspecao.html", String(), false,  processor);
      
  });
  
  //Abertura
  server.on("/pages-abertura.html", HTTP_GET, [](AsyncWebServerRequest *request){
      idl = request->getParam("id")->value();
      atualizauser(idl);
      processo = 1;
      fase = 1;
      request->send(SPIFFS, "/pages-abertura.html", String(), false,  processor);
  });
  server.on("/pages-abertura2.html", HTTP_GET, [](AsyncWebServerRequest *request){
      dia = request->getParam("dia")->value();
      mes = request->getParam("mes")->value(); 
      ano = request->getParam("ano")->value();
      hora = request->getParam("hora")->value();
      minuto = request->getParam("minuto")->value();
      request->send(SPIFFS, "/pages-abertura2.html", String(), false,  processor);
  });

  //Inscrição
  server.on("/pages-inscricao.html", HTTP_GET, [](AsyncWebServerRequest *request){
      idl = request->getParam("id")->value();
      Serial.println("Pegou parametro");
      atualizauser(idl);
      Serial.println("Atualizou dados");
      request->send(SPIFFS, "/pages-inscricao.html", String(), false,  processor);
      Serial.println("Devolveu");
  });
   server.on("/pages-inscricao1.html", HTTP_GET, [](AsyncWebServerRequest *request){
      novonome = request->getParam("novonome")->value();
      Serial.print(novonome);
      Serial.print(".");
      novosobrenome = request->getParam("novosobrenome")->value();
      Serial.println(novosobrenome);
      novasenha = request->getParam("novasenha")->value();
      novolv = request->getParam("novolv")->value();
      increveusuario();
      request->send(SPIFFS, "/pages-inscricao.html", String(), false,  processor);
  });

  server.on("/pages-perfis.html", HTTP_GET, [](AsyncWebServerRequest *request){
      idl = request->getParam("id")->value();
      Serial.println("Pegou parametro");
      atualizauser(idl);
      Serial.println("Atualizou dados");
      request->send(SPIFFS, "/pages-perfis.html", String(), false,  processor);
      Serial.println("Devolveu");
  });

  server.on("/pages-perfis2.html", HTTP_GET, [](AsyncWebServerRequest *request){
      idl = request->getParam("id")->value();
      atualizauser(idl);
      String idapagar = request->getParam("apagar")->value();
      apagarusuario(idapagar);
      request->send(SPIFFS, "/pages-perfis2.html", String(), false,  processor);
      Serial.println("Devolveu");
  });
  
  // Inicia o servidor
  server.begin();
  
}

void loop() {
  if (processo == 1){
    switch (fase){
      case 1:
        lesenha();
        break;
      case 2:
        Serial.println("Abre cofre");
        abrecofre();
        break;
    }
  }
  if (millis() >= aberto && processo == 1 && fase == 3 ){
    //fecha cofre
    Serial.println("Fecha cofre");
    fechacofre();
  }
  delay(500);
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



 

 
