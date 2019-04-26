
import * as firebase from 'firebase';
// import moment from 'moment';
  const config = {
    apiKey: "AIzaSyBqKdTFZq3WlY8_hAl7iuB0zwp2-wSaQZQ",
    authDomain: "project3-1b7f7.firebaseapp.com",
    databaseURL: "https://project3-1b7f7.firebaseio.com",
    projectId: "project3-1b7f7",
    storageBucket: "project3-1b7f7.appspot.com",
    messagingSenderId: "281293499110"
  };

var app = firebase.initializeApp(config);
var dataRef = app.database().ref();


const db = {
  upload: (timerObject, cb) =>{
    const key = dataRef.push().key;
    timerObject.refId = key; 
    dataRef.push(timerObject)

  },
  connection:(cb) => {
    dataRef.on("child_changed", function (snapshot){
       cb(snapshot.val())
    },function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    })
  },
  read:(cb) => {
    dataRef.once("value", function (snapshot){
      cb(snapshot.val())
    })
  }, 
  nextUpdate: (newData) =>{
    const newTimer  = {};
    newTimer[newData.refId] = newData;
    return dataRef.update(newTimer);
  }
}

// db.nextUpdate({"-LcgRcKkN5U1z0N98S6l":{name:"Manny", id:1, testRound:0, timeStamp:moment().unix(), status:false, timer:-1, SAT:true, ACT:false , factor:1}}, ()=> console.log("this is done"))
// db.upload({name:"manny", id:2, testRound:0, timeStamp:moment().unix(), status:false, timer:500, SAT:true, ACT:false , factor:1}, ()=> console.log("this is done"))

export default db; 