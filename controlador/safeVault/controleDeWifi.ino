
// Bibliotecas
#include <ESP8266WiFi.h>
#include <DNSServer.h>

//imports
String e_controleDeArquivos_readFile_fnct(String path);
void e_controleDeArquivos_writeFile_fnct(String path, String content);
void e_controleDoDnsServer_startDnsServer_fnct();
void e_controleDoWebServer_startWebServer_fnct();
void e_controleDoDnsServer_updateDnsServer_fnct();
void e_controleDoWebServer_updateWebServer_fnct();

void e_controleDoWebServer_stopWebServer_fnct();
void e_controleDoDnsServer_stopDnsServer_fnct();

// Configura ponto de acesso WIFI HOST
const char* i_controleDeWifi_ssidHost_var = "SafeVault";
const char* i_controleDeWifi_passwordHost_var = "00000000";
IPAddress e_controleDeWifi_acessPointIp_obj (192, 168, 4, 1);

// Configura ponto de acesso WIFI CLIENT
String e_controleDeWifi_ssidClient_var = "";
String e_controleDeWifi_passwordClient_var = "";

// Define auxiliares
#define inHost 0
#define notStarted 1
#define connecting 2
#define sucess 3
#define failure 4

// Declara variaveis de controle
unsigned long i_controleDeWifi_timeStartConectionClient_var = 0;
int e_controleDeWifi_conectionStatus_var = inHost;

void e_controleDeWifi_wifiConnect_fnct() {

  // Se já estiver conectado, retorna
  if ( e_controleDeWifi_conectionStatus_var == sucess ) return;

  // Configura WIFI como cliente mantendo o modo de ponto de acesso ativo
  WiFi.mode(WIFI_AP_STA);

  if(e_controleDeWifi_conectionStatus_var == notStarted){
    // Tenta se conectar
    WiFi.begin(e_controleDeWifi_ssidClient_var.c_str(), e_controleDeWifi_passwordClient_var.c_str());
  }

  // Seta Status como conectando
  e_controleDeWifi_conectionStatus_var = connecting;

  // Se n tiver passado o tempo de tentativa, retorna
  if ( (millis() < i_controleDeWifi_timeStartConectionClient_var + 10000) && (WiFi.status() != WL_CONNECTED) ) return;

  // Se conectou
  if ( WiFi.status() == WL_CONNECTED ) {

    // Desliga servidores
    e_controleDoWebServer_stopWebServer_fnct();
    e_controleDoDnsServer_stopDnsServer_fnct();

    // TODO: talvez atrasar para possivel envio de sucesso ao usuario
    // Entra em modo cliente
    WiFi.mode(WIFI_STA);

    // Seta Status como sucesso
    e_controleDeWifi_conectionStatus_var = sucess;

  } else {
    
    // Seta Status como erro
    e_controleDeWifi_conectionStatus_var = failure;

    // Limpa dados de conexão
    e_controleDeArquivos_writeFile_fnct("wificonfig", "");

    // Tenta denovo
    e_controleDeWifi_startWifi_fnct();
    
  }

}

// Função de start do ponto de acesso
void i_controleDeWifi_startAcessPoint_fnct() {

  // Configura Wifi como ponto de acesso
  WiFi.mode(WIFI_AP);

  // Configuramos o ponto de acesso
  WiFi.softAPConfig(
    e_controleDeWifi_acessPointIp_obj,
    e_controleDeWifi_acessPointIp_obj,
    IPAddress(255, 255, 255, 0)
  );
  // Ip do ponto de acesso
  // Gateway - ip servidor de internet, reencaminhamos para o próprio ESP
  // Máscara de rede (tamanho da rede)

  // Iniciamos o ponto de acesso
  WiFi.softAP(i_controleDeWifi_ssidHost_var, i_controleDeWifi_passwordHost_var);

}

// Função de inicialização do WIFI
void e_controleDeWifi_startWifi_fnct() {

  // Le dados da conexão
  String data = e_controleDeArquivos_readFile_fnct("wificonfig");
  int indiceQuebra = data.indexOf('\n');

  // Trata os dados
  if (indiceQuebra != -1) {
    e_controleDeWifi_ssidClient_var = data.substring(0, indiceQuebra);
    e_controleDeWifi_passwordClient_var = data.substring(indiceQuebra + 1);
    e_controleDeWifi_ssidClient_var.trim();
    e_controleDeWifi_passwordClient_var.trim();
  }

  // Se não tiver dados
  if ( e_controleDeWifi_conectionStatus_var == inHost || e_controleDeWifi_conectionStatus_var == failure ) {

    // Inicia servidores
    i_controleDeWifi_startAcessPoint_fnct();
    e_controleDoDnsServer_startDnsServer_fnct();
    e_controleDoWebServer_startWebServer_fnct();
    
  } else {

    // Inicia conexão
    e_controleDeWifi_conectionStatus_var = notStarted;
    i_controleDeWifi_timeStartConectionClient_var = millis();
    e_controleDeWifi_wifiConnect_fnct();
    
  }

}

void e_controleDeWifi_updateWifi_fnct() {

  if (e_controleDeWifi_conectionStatus_var == inHost || e_controleDeWifi_conectionStatus_var == failure ) {
    e_controleDoDnsServer_updateDnsServer_fnct();
    e_controleDoWebServer_updateWebServer_fnct();
  } else {
    e_controleDeWifi_wifiConnect_fnct();
  }
  
}
