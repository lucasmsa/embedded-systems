#include <Arduino.h>
#include <DHT.h>
#include <DHT_U.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <FirebaseArduino.h>

#include "creds.h"

#define DONT_HAVE_SENSORS

#define MQ5PIN 		D6
#define FLOWPIN 		D2

#define BAUDRATE	115200

struct readings {		
  float waterFlow = 1;  				
  bool shower = 1;
} readings; 

// Generally, you should use "unsigned long" for variables that hold time
// The value will quickly become too large for an int to store

// will store last time data was sent to Firebase
unsigned long previousMillis = 0;
const long interval = 2000;

void connectToWiFi(char const *ssid, char const *password);
void readSensors(struct readings *r);
void displaySensors(struct readings r);
void sendDataToFirebase(struct readings r);

void setup() {
  pinMode(MQ5PIN, INPUT);
  Serial.begin(BAUDRATE);
  connectToWiFi(SSID, PASSWORD);
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}

void loop() {
  // check to see if it's time to send data to Firebase; that is, if the difference
  // between the current time and last time we sent data is bigger than
  // the interval at which we want to send data.
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    // save the last time we sent data to Fireabase
    previousMillis = currentMillis;
    readSensors(&readings);
    displaySensors(readings);
    sendDataToFirebase(readings);
  }
}

void connectToWiFi(char const *ssid, char const *password) {
  delay(10);
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.print(ssid);
  /* Explicitly set the ESP8266 to be a WiFi-client, otherwise, it by default,
  would try to act as both a client and an access-point and could cause
  network-issues with your other WiFi-devices on your WiFi-network. */
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  //start connecting to WiFi
  WiFi.begin(ssid, password);
  //while client is not connected to WiFi keep loading
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("WiFi connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.println("");
}

void readSensors(struct readings *r) {

  #ifdef DONT_HAVE_SENSORS
    if (readings.waterFlow > 0 && readings.waterFlow < 100000)
    {
      readings.shower = 1;
    }
    else
    {
      readings.shower = 0;
    }
    
    if (readings.shower == 1)
    {
      readings.waterFlow += random(11, 14);
    }
    else
    {
      readings.waterFlow = 0;
    }
  #endif
}

void displaySensors(struct readings r) {
  if (r.shower == true) {
    Serial.println("[INFO] Shower IS TURNED ON!!!");
  }
  Serial.print("[INFO] Shower status: ");
  Serial.println(r.shower);
  Serial.print("[INFO] Water flow: ");
  Serial.print(r.waterFlow);
  Serial.println("mL/s");
}

void sendDataToFirebase(struct readings r) {
  String gasStatusID = Firebase.pushInt("shower", r.shower);
  if (Firebase.failed()) {
    Serial.print("[ERROR] pushing showerStatus failed:");
    Serial.println(Firebase.error());
    return;
  }

  String humValueID = Firebase.pushFloat("waterFlow", r.waterFlow);
  if (Firebase.failed()) {
    Serial.print("[ERROR] pushing waterFlow failed:");
    Serial.println(Firebase.error());
    return;
  }
}