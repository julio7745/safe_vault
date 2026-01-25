
// Bibliotecas
#include <DNSServer.h>
#include <ESP8266WiFi.h>

//imports
extern IPAddress e_controleDeWifi_acessPointIp_obj;

// Configura servidor DNS (DNS = Transforma caminho em ip)
DNSServer i_controleDoDnsServer_dnsServer_obj;

// Função de start do ponto de acesso
void e_controleDoDnsServer_startDnsServer_fnct() {

  // Iniciamos o servidor DNS
  i_controleDoDnsServer_dnsServer_obj.start(
    53,
    "*",
    e_controleDeWifi_acessPointIp_obj
  );
  // Porta do servidor DNS (53 padrão para os navegadores)
  // Caminho recebido ( * = qualquer caminho )
  // Ip que o caminho será redirecionado

}

void e_controleDoDnsServer_updateDnsServer_fnct() {
  i_controleDoDnsServer_dnsServer_obj.processNextRequest();
}

// Função de start do ponto de acesso
void e_controleDoDnsServer_stopDnsServer_fnct() {

  i_controleDoDnsServer_dnsServer_obj.stop();

}
