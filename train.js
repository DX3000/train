// Initialize Firebase
var config = {
    apiKey: "AIzaSyAjiyGVfgnHoK_o2saFhrFk27REyN0v9AU",
    authDomain: "project-d28bf.firebaseapp.com",
    databaseURL: "https://project-d28bf.firebaseio.com",
    projectId: "project-d28bf",
    storageBucket: "project-d28bf.appspot.com",
    messagingSenderId: "634308834726"
};
firebase.initializeApp(config);

var FBsaver = firebase.database().ref('taindata');
FBsaver.on('value', dataDisplay)

function dataDisplay(data) {
     console.log(data.val());
    //var trains = data.val();
    //var keyLog = Object.keyLog(trains);
    //console.log(keyLog)
    $("#schedule").find("tbody").html("");

    // Places form data into child so I can display 
    data.forEach(function(child) {
        var tableRow = $("<tr>");
        tableRow.append($("<td>").text(child.val().name));
        tableRow.append($("<td>").text(child.val().Destination));
        tableRow.append($("<td>").text(child.val().time));
        tableRow.append($("<td>").text(moment(child.val().time,"HH:mm").to(moment())));
        $("#schedule").find("tbody").append(tableRow);
        //console time test 
        //console.log(moment(child.val().time, "HH:mm").to(moment()));
    });

}

document.getElementById("inputForm").addEventListener('submit', inputForm);

function inputForm(event) {
    event.preventDefault();

    var name = getVal('trainName');
    var Destination = getVal('trainDestination');
    var time = getVal('trainTime');
   

    saveTrain(name, Destination, time);
    //clears form after submit 
    document.getElementById('inputForm').reset();

}

// function to get form values
function getVal(id) {
    return document.getElementById(id).value;
}

//save train data to Firebase
function saveTrain(name, Destination, time) {
    var newTrain = FBsaver.push();
    newTrain.set({
        name: name,
        Destination: Destination,
        time: time,
    })
}

