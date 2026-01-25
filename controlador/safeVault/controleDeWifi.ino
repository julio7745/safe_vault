
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
#define notStarted 0
#define connecting 1
#define success 2
#define failure 3

#define i_controleDeWifi_timeToFail_var 30000
#define i_controleDeWifi_delayToOffServer_var 20000

// Declara variaveis de controle
unsigned long i_controleDeWifi_timeStartConectionClient_var = 0;
int e_controleDeWifi_conectionStatus_var = notStarted;
unsigned long i_controleDeWifi_offServerTime_var = 0;

void e_controleDeWifi_wifiConnect_fnct() {

  // TODO: o que acontece se desligar dps de conectado

  if (e_controleDeWifi_conectionStatus_var == success) {

    // Se ja desligou tudo, retorna
    if (WiFi.getMode() == WIFI_STA) return;

    // Se tiver passado um tempo desde a conexão
    if (millis() - i_controleDeWifi_offServerTime_var > i_controleDeWifi_delayToOffServer_var) {
        //Desliga servidores
        e_controleDoWebServer_stopWebServer_fnct();
        e_controleDoDnsServer_stopDnsServer_fnct();
        WiFi.mode(WIFI_STA);
    }
    
    return;
  }

  if (e_controleDeWifi_ssidClient_var == "") return;

  if(e_controleDeWifi_conectionStatus_var == notStarted){

    // Configura WIFI como cliente mantendo o modo de ponto de acesso ativo
    WiFi.mode(WIFI_AP_STA);

    // Seta Status como conectando
    e_controleDeWifi_conectionStatus_var = connecting;

     // Configura WIFI como cliente mantendo o modo de ponto de acesso ativo
    i_controleDeWifi_timeStartConectionClient_var = millis();

    // Tenta se conectar
    Serial.println("WIFI iniciado");
    WiFi.begin(e_controleDeWifi_ssidClient_var.c_str(), e_controleDeWifi_passwordClient_var.c_str());
 
  }

  // trava de segurança para o tempo de tentativa
  unsigned long tempoPassado = millis() - i_controleDeWifi_timeStartConectionClient_var;
  bool conectou = (WiFi.status() == WL_CONNECTED);
  bool deuTimeout = (tempoPassado > i_controleDeWifi_timeToFail_var) && i_controleDeWifi_timeStartConectionClient_var != 0;

  if (!conectou && !deuTimeout) return;
  Serial.print("TEMPO: ");
  Serial.println(millis() > i_controleDeWifi_timeStartConectionClient_var + 10000);
  Serial.print("CONEXAO: ");
  Serial.println(WiFi.status() == WL_CONNECTED);
  
  // Se conectou
  if ( conectou ) {

    Serial.println("Sucesso");

    // Seta desligamento dos Servidores
    i_controleDeWifi_offServerTime_var = millis();

    // Seta Status como sucesso
    e_controleDeWifi_conectionStatus_var = success;

  } else {

    Serial.println("Erro");
    
    // Seta Status como erro
    e_controleDeWifi_conectionStatus_var = failure;

    // Limpa dados de conexão
    e_controleDeArquivos_writeFile_fnct("wificonfig.txt", "");

    // Limpa tentativa de conexão
    i_controleDeWifi_timeStartConectionClient_var = 0;

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

  Serial.println("WIFI START");

  // Le dados da conexão
  String data = e_controleDeArquivos_readFile_fnct("wificonfig.txt");
  int indiceQuebra = data.indexOf('\n');

  // Trata os dados
  if (indiceQuebra != -1) {
    e_controleDeWifi_ssidClient_var = data.substring(0, indiceQuebra);
    e_controleDeWifi_passwordClient_var = data.substring(indiceQuebra + 1);
    e_controleDeWifi_ssidClient_var.trim();
    e_controleDeWifi_passwordClient_var.trim();
  }
  
  Serial.println(e_controleDeWifi_ssidClient_var);
  Serial.println(e_controleDeWifi_passwordClient_var);

  // Se não tiver dados
  if ( e_controleDeWifi_ssidClient_var == "" ) {

    Serial.println("SERVERS ON");

    // Inicia servidores
    i_controleDeWifi_startAcessPoint_fnct();
    e_controleDoDnsServer_startDnsServer_fnct();
    e_controleDoWebServer_startWebServer_fnct();
    
  } else {

    // Inicia conexão
    e_controleDeWifi_wifiConnect_fnct();
    
  }

}

void e_controleDeWifi_updateWifi_fnct() {

  e_controleDoWebServer_updateWebServer_fnct();
  e_controleDoDnsServer_updateDnsServer_fnct();
  e_controleDeWifi_wifiConnect_fnct();

  if( WiFi.getMode() == WIFI_STA && WiFi.status() != WL_CONNECTED ){
    
    // Seta Status como sem tentativa
    e_controleDeWifi_conectionStatus_var = notStarted;

    // Limpa dados de conexão
    e_controleDeArquivos_writeFile_fnct("wificonfig.txt", "");

    // Limpa tentativa de conexão
    i_controleDeWifi_timeStartConectionClient_var = 0;

    // Tenta denovo
    e_controleDeWifi_startWifi_fnct();
    
  }
  
}
