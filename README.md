# Made in partnership with:
[Renan Goes](https://github.com/Renan-Goes)
<br>
[Thiago Gonzaga Gomes](https://github.com/oitgg)

# Smart Shower 💧
The idea was to monitor shower price using an ESP8266 and a flow sensor with firebase integration, reading and writing from its realtime database, calculating the water cost based on the region that the user is,
fbut due to the covid outbreak/isolation of group members the connection with the web app was hardened, so aside from the esp connection part we've made a simple react-native app connecting with the web app through firebase

# How to Run
```
git clone https://github.com/lucasmsa/embedded-systems.git
```
### Start web app
```
npm install
nodemon app.js
```
### Run mobile app
```
cd react-app/ExpoSmartShower/SmartShower
npm install -g expo-cli
npm start
```
# Result
![Apps image](/public/imgs/apps.png)



