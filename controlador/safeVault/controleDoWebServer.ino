
// Bibliotecas
#include <ESP8266WebServer.h>
#include <ESP8266WiFi.h>

//imports
String e_controleDeArquivos_readFile_fnct(String path);
void e_controleDeArquivos_writeFile_fnct(String path, String content);
extern int e_controleDeWifi_conectionStatus_var;
void e_controleDeWifi_wifiConnect_fnct();
extern IPAddress e_controleDeWifi_acessPointIp_obj;

// Declara variaveis de controle
bool i_controleDoWebServer_serverStatus_var = false;

// Instancia servidor WEB na porta padrão do http
ESP8266WebServer i_controleDoWebServer_webServer_obj(80);

// Declara função para caminho "/"
void i_controleDoWebServer_homeView_fnct() {

  // Abrimos o arquivo que contem o formulário
  String file = e_controleDeArquivos_readFile_fnct("/main.html");

  // Enviamos o arquivo
  i_controleDoWebServer_webServer_obj.send(
    200, "text/html",
    file
  );
  
}

// Declara função para caminho "/main.css"
void i_controleDoWebServer_homeViewCss_fnct() {

  // Abrimos o arquivo que contem o formulário
  String file = e_controleDeArquivos_readFile_fnct("/main.css");

  // Enviamos o arquivo
  i_controleDoWebServer_webServer_obj.send(
    200, "text/css",
    file
  );
  
}

// Declara função para caminho "/logoClara1.svg"
void i_controleDoWebServer_logoClara1Asset_fnct() {

  // Abrimos o arquivo que contem o formulário
  String file = e_controleDeArquivos_readFile_fnct("/logoClara1.svg");

  // Enviamos o arquivo
  i_controleDoWebServer_webServer_obj.send(200, "image/svg+xml", file);
  
}

// Declara função para caminho "/wifi.svg"
void i_controleDoWebServer_wifiAsset_fnct() {

  // Abrimos o arquivo que contem o formulário
  String file = e_controleDeArquivos_readFile_fnct("/wifi.svg");

  // Enviamos o arquivo
  i_controleDoWebServer_webServer_obj.send(200, "image/svg+xml", file);
  
}

// Declara função para caminho "/password.png"
void i_controleDoWebServer_passwordAsset_fnct() {

  // Abrimos o arquivo que contem o formulário
  String file = e_controleDeArquivos_readFile_fnct("/password.png");

  // Enviamos o arquivo
  i_controleDoWebServer_webServer_obj.send(
    200, "image/png",
    file
  );
  
}

// Declara função para caminho "/handleDisplayPassword.png"
void i_controleDoWebServer_handleDisplayPasswordAsset_fnct() {

  // Abrimos o arquivo que contem o formulário
  String file = e_controleDeArquivos_readFile_fnct("/handleDisplayPassword.png");

  // Enviamos o arquivo
  i_controleDoWebServer_webServer_obj.send(
    200, "image/png",
    file
  );
  
}

// Declara função para caminho "/submit.svg"
void i_controleDoWebServer_submitAsset_fnct() {

  // Abrimos o arquivo que contem o formulário
  String file = e_controleDeArquivos_readFile_fnct("/submit.svg");

  // Enviamos o arquivo
  i_controleDoWebServer_webServer_obj.send(200, "image/svg+xml", file);
  
}

// Declara função para caminho "/wificonfig"
void i_controleDoWebServer_wificonfigComand_fnct() {

  // Enviamos a resposta com o tipo correto
  i_controleDoWebServer_webServer_obj.send(
    200, 
    "text/plain", 
    "connecting"
  );

  const String data = i_controleDoWebServer_webServer_obj.arg("networkName") + "\n" + i_controleDoWebServer_webServer_obj.arg("networkPassword");
  e_controleDeArquivos_writeFile_fnct("wificonfig.txt", data);

  e_controleDeWifi_conectionStatus_var = notStarted;
  e_controleDeWifi_startWifi_fnct();

}

// Declara função para caminho "/wificonfigupdate"
void i_controleDoWebServer_wificonfigupdateComand_fnct() {

  String state = "";

  switch (e_controleDeWifi_conectionStatus_var) {
      case connecting:
      state = "connecting";
      break;
    case success:
      state = "success";
      break;
    case failure:
      state = "failure";
      break;
    default:
      state = "failure"; 
      break;
  }
     
  // Enviamos a resposta com o tipo correto
  i_controleDoWebServer_webServer_obj.send(
    200, 
    "text/plain", 
    state
  );

}

// Função de inicialização
void e_controleDoWebServer_startWebServer_fnct() {

  if (i_controleDoWebServer_serverStatus_var == HIGH) return;
  i_controleDoWebServer_serverStatus_var = HIGH;

  // Configura caminhos e funções executadas para cada caminho
  i_controleDoWebServer_webServer_obj.on( "/", i_controleDoWebServer_homeView_fnct);
  
  i_controleDoWebServer_webServer_obj.on( "/main.css", i_controleDoWebServer_homeViewCss_fnct);
  i_controleDoWebServer_webServer_obj.on( "/logoClara1.svg", i_controleDoWebServer_logoClara1Asset_fnct);
  i_controleDoWebServer_webServer_obj.on( "/password.png", i_controleDoWebServer_passwordAsset_fnct);
  i_controleDoWebServer_webServer_obj.on( "/wifi.svg", i_controleDoWebServer_wifiAsset_fnct);
  i_controleDoWebServer_webServer_obj.on( "/handleDisplayPassword.png", i_controleDoWebServer_handleDisplayPasswordAsset_fnct);
  i_controleDoWebServer_webServer_obj.on( "/submit.svg", i_controleDoWebServer_submitAsset_fnct);
  
  i_controleDoWebServer_webServer_obj.on( "/wificonfig", i_controleDoWebServer_wificonfigComand_fnct);
  i_controleDoWebServer_webServer_obj.on( "/wificonfigupdate", i_controleDoWebServer_wificonfigupdateComand_fnct);

  // Ao capturar erro 404 (NotFound):
  //  - Configuramos a propriedade "Location" do cabeçalho;
  //  - Enviamos o erro 302;
  // Quando o navegador recebe 302, ele vai para o caminho configurado no "Location"
  // Tamém limpamos alguns caches
  i_controleDoWebServer_webServer_obj.onNotFound([]() {
    String target = "http://" + e_controleDeWifi_acessPointIp_obj.toString() + "/";
    // Cabeçalhos para evitar que o celular guarde o redirecionamento errado no cache
    i_controleDoWebServer_webServer_obj.sendHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    i_controleDoWebServer_webServer_obj.sendHeader("Pragma", "no-cache");
    i_controleDoWebServer_webServer_obj.sendHeader("Expires", "-1");
    i_controleDoWebServer_webServer_obj.sendHeader("Location", target, true);
    i_controleDoWebServer_webServer_obj.send(302, "text/plain", "Encaminhando para /");
  });

  // Iniciamos servidor
  i_controleDoWebServer_webServer_obj.begin();

}

void e_controleDoWebServer_updateWebServer_fnct() {
    if (i_controleDoWebServer_serverStatus_var == LOW) return;
    i_controleDoWebServer_webServer_obj.handleClient();
}

void e_controleDoWebServer_stopWebServer_fnct() {
  i_controleDoWebServer_serverStatus_var = LOW;
  i_controleDoWebServer_webServer_obj.stop();
}
