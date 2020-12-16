#include "OneWire.h"
#include "etherShield.h"
#include "ETHER_28J60.h"
#include "DallasTemperature.h"

static uint8_t mac[6] = {0x54, 0x55, 0x58, 0x10, 0x10, 0x24};  
static uint8_t ip[4] = {192, 168, 1, 155};    
static uint16_t port = 80;  
float t;

ETHER_28J60 ethernet;
#define ONE_WIRE_BUS_1 9 //   вход датчика 18b20
OneWire oneWire_in(ONE_WIRE_BUS_1);
DallasTemperature sensor_in_house(&oneWire_in);





void setup(){ 
  Serial.begin(9600);
  Serial.println("Temperature WEB server");
  ethernet.setup(mac, ip, port);
  sensor_in_house.begin();
}

void loop()
{
  char* params;
  if (params = ethernet.serviceRequest())
  { 
    get_temp();
    ethernet.print("<meta http-equiv='refresh' content='60'/>");
    ethernet.print("<html><head><title>temperature</title> </head>");
    ethernet.print("<body background='https://goo.gl/WqfNp7'>");
    ethernet.print("<CENTER><H3>Arduino based temperature server. <em>ENC28j60 + DS18B20</em></H3></BR>");
    ethernet.print("<CENTER><H2>Autorefresh rate: 60 sec</H2></BR>");
    ethernet.print("<CENTER><H2>Loc: KN56IK</H2></BR>");
    ethernet.print("<a href='https://goo.gl/AXLnfT'><H1>Map</a></BR>");
    ethernet.print("<CENTER>Outdoor temperature:</BR>");
    ethernet.print(t);
    ethernet.print("C</H1></CENTER></body></html>");
    ethernet.respond();
    //Serial.println(params);
    //Serial.println(t);
  }
  delay(100);
}
void get_temp() {
  //Serial.print("Requesting temperatures...");
   sensor_in_house.requestTemperatures();
  //sensor_outhouse.requestTemperatures();
  //Serial.println(" done");

  //Serial.print("Inhouse: ");
  t = sensor_in_house.getTempCByIndex(0);
  Serial.println(t);

  //Serial.print("Outhouse: ");
  //Serial.println(sensor_outhouse.getTempCByIndex(0));

}
