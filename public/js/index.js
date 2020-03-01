// Set the configuration for your app
// Firebase
var flowElement = $('.flow');
var volumeElement = $('.volume');
var costElement = $('.cost');
console.log(flowElement);

var config = {
    apiKey: "AIzaSyDftOy-HCtgqFWq9H-FsP-Yoi8BuXLe9Ks",
    authDomain: "smart-shower-master.firebaseapp.com",
    databaseURL: "https://smart-shower-master.firebaseio.com",
    storageBucket: "gs://smart-shower-master.appspot.com"
};

firebase.initializeApp(config);

// Get a reference to the database service  
var database = firebase.database();
console.log(database)

// Get element from the DOM


// References in firebase
var flag = 0;
var flowRef = database.ref('waterFlow');
var volumeRef = database.ref('volume');
var showerRef = database.ref('shower');

console.log("BANHOSO " + showerRef);

// Sync objects changes
flowRef.limitToLast(1).on('value', function(snapshot) {

    snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        console.log("Fluxo: " + childData);
        flowElement.html("Fluxo: " + (childData / 1000).toFixed(4) + " L");

        console.log("Vazão: " + (childData) / 60);
        volumeElement.html("Vazão: " + ((childData) / (1000 * 60)).toFixed(4) + " L/s");

        console.log("Custo: " + childData * (0.004890 / 1000));
        costElement.html("Custo: " + ((childData) * (0.004890)).toFixed(4) + " R$");
    });
});

showerRef.limitToLast(1).on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        let showerStatus = childSnapshot.val();
        console.log("Shower: " + showerStatus);

        if (showerStatus == 1 && flag == 0) {
            flag = 1;
            timer.start();
        } else if (showerStatus == 0) {
            flag = 0;
            timer.stop();
        }
    });
});

// 0.004890; custo por litro, em centavos (dados da CAGEPA: 1m³ = R$ 4,89 em Nov/19)


// Time variables
var timer = new Timer();


$('#chronoExample .startButton').click(function() {
    timer.start();
});
$('#chronoExample .pauseButton').click(function() {
    timer.pause();
});
$('#chronoExample .stopButton').click(function() {
    timer.stop();
});
$('#chronoExample .resetButton').click(function() {
    timer.reset();
});
timer.addEventListener('secondsUpdated', function(e) {
    $('#chronoExample .values').html(timer.getTimeValues().toString());
    timerCounting = timer.getTimeValues()
    console.log(timerCounting)
});
timer.addEventListener('started', function(e) {
    $('#chronoExample .values').html(timer.getTimeValues().toString());
});
timer.addEventListener('reset', function(e) {
    $('#chronoExample .values').html(timer.getTimeValues().toString());
});
