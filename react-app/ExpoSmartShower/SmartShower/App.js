import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { db } from './src/config'

let firstChildFlag = 0

export default function App() {
  

  showerPressed = () =>{
    
    db.goOnline()

    if(firstChildFlag == 0){
      db.ref('waterFlow').remove();
    }


    var oldChild
    function getRandomValue(min, max) {
      return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
    
    Alert.alert("Shower is on!")

    db.ref('shower').set({
      value: 1
    })

    let flowRef = db.ref('waterFlow')

    if(firstChildFlag == 0){

      flowRef.push({
        value: 1
      })
      firstChildFlag = 1
    }

    setInterval(function() {
        flowRef.limitToLast(1).on('child_added', (snapshot) => {
          oldChild = snapshot.val()
          oldChild = oldChild.value
        });

        if(oldChild > 0){
          let randomFlow = getRandomValue(11, 14)
          let newChild = oldChild + randomFlow
    
          flowRef.push({
            value: newChild
          })
        }
        else if (oldChild === 0){
          flowRef.push({ value: 0 })
        }
        
      }, 1000)    
    }
    
  
  showerOffPressed = () =>{
    Alert.alert("Shower is off!")
    db.ref('shower').set({
      value: 0
    })
    
    firstChildFlag = 0
    db.goOffline()
  }
  return (
    
    <View style={styles.container}>
      <Text style={styles.text}>Smart Shower 🚿</Text>

      <TouchableOpacity onPress={showerPressed}>
            <Text style={styles.showerPressed}>Start Shower</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={showerOffPressed}>
            <Text style={styles.showerOffPressed}>End Shower</Text>
      </TouchableOpacity>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00334e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#84a9ac',
  },
  showerPressed: {
    backgroundColor: "#3b6978",
    fontWeight: "200",
    color: "#fff",
    padding: "3%",
    marginTop: '10%',
    width: "90%",
    fontSize: 25,
  },
  showerOffPressed: {
    backgroundColor: "#cae8d5",
    fontWeight: "200",
    padding: "3%",
    marginTop: '10%',
    width: "90%",
    fontSize: 25,
  }
});
