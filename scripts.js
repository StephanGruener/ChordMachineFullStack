const { response } = require("express");

var currentSong;

let flag = false;

function showAllPretty(){
    fetch('http://localhost:8000/api/tab/',  {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
      const div = document.getElementById("response");
      div.innerHTML = "";
      for(i=0; i<data.response.length; i++) {
        div.innerHTML +="<div>Song Name: "  + data.response[i].songID + 
                        "<br>Accord: " + data.response[i].accord +
                        "<br>Length: " + data.response[i].length + "<br>"
                        +"______________________________________________" + "<br></div>";
      }
    })
    .catch(error => {
      console.error('Request failed', error);
    });
}

// //for showing all songs 
// function showAllSongs(){
//     fetch('http://localhost:8000/api/tab/',  {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         const div = document.getElementById("response");
//         div.innerHTML = "";
//         let uniqueSongs = new Set();
        
//         for(i=0; i<data.response.length; i++) {
//             uniqueSongs.add(data.response[i].songID);
//         }
//         for(let song of uniqueSongs){
//           if (uniqueSongs.size > 0) {
//           div.innerHTML += "<div class=\"flexContainerHorizontal\">" +
//               "<div onclick='showSongID(false,\"" + song + "\")' style=\"padding: 15px; font-size: large\">" + song + "</div>" +
//               "<div class=\"playButton\" style=\"padding: 15px;\"><button style=\"background-color: rgba(255,255,255,0); border: 0px\" onclick='setCurrentSongAndPlay(\"" + song + "\")'><img src=\"src/play.png\"></button><button value=\"löschen\" onclick='setCurrentSongAndDelete(\"" + song + "\")'></div>" +
//           "</div>";
//           }
//         }
//     })
//     .catch(error => {
//         console.error('Request failed', error);
//     });
// }

function showAllSongs() {
  fetch('http://localhost:8000/api/tab/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    const div = document.getElementById("response");
    div.innerHTML = "";
    let uniqueSongs = new Set();

    for (i = 0; i < data.response.length; i++) {
      if (data.response[i].songID != undefined) {
        uniqueSongs.add(data.response[i].songID);
      }
    }
    for (let song of uniqueSongs) {
      if (uniqueSongs.size > 0) {
        div.innerHTML += "<div class=\"flexContainerHorizontal\">" +
          "<div style=\"width: 50%; padding-top:15px\" onclick='showSongID(false,\"" + song + "\")' style=\"padding: 15px; font-size: large\">" + song + "</div>" +
          "<div class=\"playButton\" style=\"padding: 15px;\">" +
          "<button style=\"background-color: rgba(255,255,255,0); border: 0px\" onclick='setCurrentSongAndPlay(\"" + song + "\")'><img src=\"src/play.png\"></button>" +
          "<button style=\"background-color: rgba(255,255,255,0); border: 0px\" onclick='confirmDelete(\"" + song + "\")'><img src=\"src/delete.png\"></div>" +
          "</div>";
      }
    }
  })
  .catch(error => {
    console.error('Request failed', error);
  });
}

function confirmDelete(song) {
  if (confirm("Song wirklich löschen?")) {
    setCurrentSongAndDelete(song);
  }
}


function showAll(){
    fetch('http://localhost:8000/api/tab/',  {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
      const div = document.getElementById("response");
      div.innerHTML = JSON.stringify(data);
    })
    .catch(error => {
      console.error('Request failed', error);
    });
}

function showSongID(updateID = false, IDforSearch){
    if (updateID) {
        IDforSearch = document.getElementById("inputForSearch").value;
      }
    fetch('http://localhost:8000/api/tab/show',  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          songID: IDforSearch
        })
    })
    .then(
        response => response.json())
        .then(data => {
            const div = document.getElementById("response");
            if(data.response.length>0){
                div.innerHTML = "<h1>Song Name: "  + data.response[0].songID + "</h1>"
                +"<br><div class=\"flexContainerHorizontal\" style=\"padding-inline: 10px\"><h2>Akkord</h2> <h2>Länge</h2><h2>Löschen</h2></div>";
                for(i=1; i<data.response.length; i++) {
                    div.innerHTML += "<div class=\"flexContainerHorizontal\" style=\"padding-inline: 10px\">" + "<div style=\"width: 30px\">" +data.response[i].accord + "</div><div style=\"width: 30px\">" + data.response[i].length + "</div><div style=\"width: 30px\">" + "<button style=\"background-color: rgba(255,255,255,0); border: 0px\" id='"+data.response[i]._id+"' value='"+data.response[i].songID+"'onclick='deleteAccord(\""+data.response[i]._id+"\")'><img src=\"src/delete.png\"></button></div>" + "</div>";
                  }
                  div.innerHTML += "<div class=\"flexContainerHorizontal\" style=\"padding-inline: 10px\" onclick='chordSelector()'>" + "<div style=\"width: 30px\"></div>" +"<div style=\"width: 30px\">" + '+' + "</div>" + "<div style=\"width: 30px\"></div>" + "</div>"; 
                  currentSong = data.response;
            }
            else{
                div.innerHTML = "No chords found!"
            }
            console.log(data.response[0].songID)
            
          })
    .catch(error => {
      console.error('Request failed', error);
    });
    
}




function postAccord(songID, accord, length){
    songID = currentSong[0].songID;
    length = document.getElementById("length").value;
    // accord = document.getElementById("accord").value;
    // length = document.getElementById("length").value;
    fetch('http://localhost:8000/api/tab/create',  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          songID: songID,
          accord: accord,
          length: length
        })
    })
    .then(console.log(message = 'accord added!'))
    .then(showSongID(false, songID))
    .then(hideChordSelector())
    .catch(error => {
      console.error('Request failed', error);
    });
}

function deleteAccord(_id){
  console.log('_id:', _id);
    fetch('http://localhost:8000/api/tab/destroyTab',  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _id: _id
        })
    })
    .then(console.log(message = 'accord deleted!'))
    .then(showSongID(false,document.getElementById(_id).value))
    .catch(error => {
      console.error('Request failed', error);
    });
}

function deleteAccordWithoutShowSongID(_id){
  console.log('_id:', _id);
    fetch('http://localhost:8000/api/tab/destroyTab',  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _id: _id
        })
    })
    .then(console.log(message = 'accord deleted!'))
    .then(showAllSongs())
    .catch(error => {
      console.error('Request failed', error);
    });
}

//TODO: Funktion dergestalt anpassen, dass es direkt an ESP32 gesendet wird
//changes the current accord to be played in manual mode
function updateCurrentAccord(buttonId, accord){
    accord = document.getElementById(buttonId).value;
    fetch('http://localhost:8000/api/tab/updateTab',  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        //das wird in die DB geschrieben
        body: JSON.stringify({
          _id: "63c170cee5ec75c8b732702a",
          accord: accord,
          songID: "currentSong"
        })
    })
    .then(console.log(message = 'accord updated!'))
    .catch(error => {
      console.error('Request failed', error);
    });
}

//function that gets a chord from a button and sends it to the ESP32
function sendChord(buttonId){
    accord = document.getElementById(buttonId).value;

    //change name attribute to of currently active chord to "0" for styling
    const currentActive = document.getElementsByName("1")[0];
    if(currentActive){
      currentActive.setAttribute("name", "0");
    }
    


    document.getElementById(buttonId).name = "1";
    fetch('http://192.168.111.48/akkord',  {
    mode: 'no-cors',    
    method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        //das wird an der Gerät geschrieben
        body: JSON.stringify({
          akkord: accord
        })
    })
    .then(console.log(message = 'accord sent!'))
    .catch(error => {
      console.error('Request failed', error);
    });
}

//function similar to sendChord, but it sends the bpm to the ESP32
function sendBPM(bpm){
  bpm = parseInt(bpm);
    fetch('http://192.168.111.48/bpm',  {
    mode: 'no-cors',    
    method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        //das wird an der Gerät geschrieben
        body: JSON.stringify({
          bpm: bpm
        })
    })
    .then(console.log(message = 'bpm sent:', bpm))
    .catch(error => {
      console.error('Request failed', error);
    });
}

function changeChord(buttonId, newChord){
    const chord = document.getElementById(buttonId);
    chord.value = newChord;
    //change name attribute to of bigDiv to "invisible" for styling
    const bigDiv = document.getElementById("bigDiv");
    bigDiv.setAttribute("name", "invisible");

}

function hideChordSelector(){
  const bigDiv = document.getElementById("bigDiv");
  bigDiv.setAttribute("name", "invisible");
}

function chordSelector(buttonId){
  const bigDiv = document.getElementById("bigDiv");
  bigDiv.setAttribute("name", "visible");
  const buttons = document.querySelectorAll('#bigDiv div div input');
  //loop over all the buttons and set their name attribute to the id of the button that was clicked
  for (i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute("name", buttonId);
      
  }
}

//creates a new song in the database with the given songID and bpm (chords are added later)
function createNewSong(songID, bpm){
   fetch('http://localhost:8000/api/tab/create',  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      songID: songID,
      bpm: bpm
    })
  })
  .then(console.log(message = 'song saved:', songID))
  .then(alert(message = 'song gespeichert!'))
  .catch(error => {
    console.error('Request failed', error);
  });
}


function prepareSongForESP32(){
  songID = currentSong[0].songID;
  bpm = currentSong[0].bpm;
  chords = [];
  for (i = 1; i < currentSong.length; i++) {
    chordAndLength = { "akkord": currentSong[i].accord, "laenge": currentSong[i].length };
    //append the chord to the chords array
    chords.push(chordAndLength);   
  }
 
  console.log(songID, bpm, chords);
  return chords;
}


function sendSongToESP32(){
  const songname = currentSong[0].songID;
  const bpm = currentSong[0].bpm;
  const song = prepareSongForESP32();
  
  fetch('http://192.168.111.48/song',  {
    mode: 'no-cors',    
    method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        //das wird an der Gerät geschrieben
        body: JSON.stringify({
          songname: songname,
          bpm: bpm,
          song: song
        })
    })
    .then(console.log(message = 'bpm sent!'))
    .then(console.log(songname, bpm, song))
    .catch(error => {
      console.error('Request failed', error);
    });
}

function setCurrentSongAndPlay(song){
  fetch('http://localhost:8000/api/tab/show',  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          songID: song
        })
    })
    .then(response => response.json())
    .then(data => {
        currentSong = data.response;
        console.log('current song set!', currentSong);
        sendSongToESP32();
    })
    .catch(error => {
      console.error('Request failed', error);
    });
}

function setCurrentSongAndDelete(song){
  fetch('http://localhost:8000/api/tab/show',  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          songID: song
        })
    })
    .then(response => response.json())
    .then(data => {
        currentSong = data.response;
        console.log('current song set!', currentSong);
        deleteSong();
    })
    .catch(error => {
      console.error('Request failed', error);
    });
}

//function that takes the current song and deletes all chords from the database
function deleteSong(){
  songID = currentSong[0].songID;
  for (i = 0; i < currentSong.length; i++) {
    chordID = currentSong[i]._id;
    console.log(currentSong[i]._id);
    deleteAccordWithoutShowSongID(chordID);
    console.log('Song deleted: ', songID);
  }
}


function showCurrentSong(){
  console.log(currentSong);
}

