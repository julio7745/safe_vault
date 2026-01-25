
// Bibliotecas
#include <ESP8266WebServer.h>
#include <ESP8266WiFi.h>

//imports
String e_controleDeArquivos_readFile_fnct();
extern String i_controleDeWifi_ssidClient_var;
extern String i_controleDeWifi_passwordClient_var;
void e_controleDeWifi_wifiConnect_fnct();
extern int e_controleDeWifi_conectionStatus_var;
extern IPAddress e_controleDeWifi_acessPointIp_obj;

// Instancia servidor WEB na porta padrão do http
ESP8266WebServer i_controleDoWebServer_webServer_obj(80);

// Declara função para caminho "/"
void i_controleDoWebServer_homeView_fnct() {

  // Abrimos o arquivo que contem o formulário
  String file = e_controleDeArquivos_readFile_fnct("/main.html");

  // Adicionamos a classe que oculta avisos
  file.replace("%VISIBLE_CONNECTING%", "hidden");
  file.replace("%VISIBLE_SUCESS%", "hidden");
  file.replace("%VISIBLE_FAILURE%", "hidden");

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

// Declara função para caminho "/logoClara1.png"
void i_controleDoWebServer_logoClara1Asset_fnct() {

  // Abrimos o arquivo que contem o formulário
  String file = e_controleDeArquivos_readFile_fnct("/logoClara1.png");

  // Enviamos o arquivo
  i_controleDoWebServer_webServer_obj.send(
    200, "image/png",
    file
  );
  
}

// Declara função para caminho "/wifi.png"
void i_controleDoWebServer_wifiAsset_fnct() {

  // Abrimos o arquivo que contem o formulário
  String file = e_controleDeArquivos_readFile_fnct("/wifi.png");

  // Enviamos o arquivo
  i_controleDoWebServer_webServer_obj.send(
    200, "image/png",
    file
  );
  
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

// Declara função para caminho "/submit.png"
void i_controleDoWebServer_submitAsset_fnct() {

  // Abrimos o arquivo que contem o formulário
  String file = e_controleDeArquivos_readFile_fnct("/submit.png");

  // Enviamos o arquivo
  i_controleDoWebServer_webServer_obj.send(
    200, "submit.png",
    file
  );
  
}

// Declara função para caminho "/wificonfig"
void i_controleDoWebServer_wificonfigView_fnct() {

  // Abrimos o arquivo que contem o formulário
  String file = e_controleDeArquivos_readFile_fnct("/main.html");

  // Adicionamos a classe que oculta avisos e form
  file.replace("%VISIBLE_SUCESS%", "hidden");
  file.replace("%VISIBLE_FAILURE%", "hidden");
  file.replace("%VISIBLE_FORM%", "hidden");

  // Enviamos o arquivo
  i_controleDoWebServer_webServer_obj.send(
    200, "text/html",
    file
  );


  // TODO: Remover, ele deve apenas salvar no spiffs
  e_controleDeWifi_ssidClient_var = i_controleDoWebServer_webServer_obj.arg("networkName");
  e_controleDeWifi_passwordClient_var = i_controleDoWebServer_webServer_obj.arg("networkPassword");

  e_controleDeWifi_wifiConnect_fnct();

}

// Função de inicialização
void e_controleDoWebServer_startWebServer_fnct() {

  // Configura caminhos e funções executadas para cada caminho
  i_controleDoWebServer_webServer_obj.on( "/", i_controleDoWebServer_homeView_fnct);
  
  i_controleDoWebServer_webServer_obj.on( "/main.css", i_controleDoWebServer_homeViewCss_fnct);
  i_controleDoWebServer_webServer_obj.on( "/logoClara1.png", i_controleDoWebServer_logoClara1Asset_fnct);
  i_controleDoWebServer_webServer_obj.on( "/password.png", i_controleDoWebServer_passwordAsset_fnct);
  i_controleDoWebServer_webServer_obj.on( "/wifi.png", i_controleDoWebServer_wifiAsset_fnct);
  i_controleDoWebServer_webServer_obj.on( "/handleDisplayPassword.png", i_controleDoWebServer_handleDisplayPasswordAsset_fnct);
  i_controleDoWebServer_webServer_obj.on( "/submit.png", i_controleDoWebServer_submitAsset_fnct);
  
  i_controleDoWebServer_webServer_obj.on( "/wificonfig", i_controleDoWebServer_wificonfigView_fnct);

  // Ao capturar erro 404 (NotFound):
  //  - Configuramos a propriedade "Location" do cabeçalho;
  //  - Enviamos o erro 302;
  // Quando o navegador recebe 302, ele vai para o caminho configurado no "Location"
  i_controleDoWebServer_webServer_obj.onNotFound([]() {
    String target = "http://" + e_controleDeWifi_acessPointIp_obj.toString() + "/";
    i_controleDoWebServer_webServer_obj.sendHeader("Location", target, true);
    i_controleDoWebServer_webServer_obj.send(302, "text/plain", "Encaminhando para /");
  });

  // Iniciamos servidor
  i_controleDoWebServer_webServer_obj.begin();

}

void e_controleDoWebServer_updateWebServer_fnct() {
  i_controleDoWebServer_webServer_obj.handleClient();
}

void e_controleDoWebServer_stopWebServer_fnct() {
  i_controleDoWebServer_webServer_obj.stop();
}
