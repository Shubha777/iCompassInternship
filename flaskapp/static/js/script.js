try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
  $('.app').hide();
}


var noteTextarea = $('#msg_input');
var instructions = $('#recording-instructions');
var notesList = $('ul#notes');
var noteContent = '';

/*-----------------------------
      Voice Recognition 
------------------------------*/

// If false, the recording will stop after a few seconds of silence.
// When true, the silence period is longer (about 15 seconds),
// allowing us to keep recording even when the user pauses. 
recognition.lang = 'fr-FR';
//recognition.interimResults = true;
recognition.continuous = true;

// This block is called every time the Speech APi captures a line. 
recognition.onresult = function(event) {

  // event is a SpeechRecognitionEvent object.
  // It holds all the lines we have captured so far. 
  // We only need the current one.
  var current = event.resultIndex;

  // Get a transcript of what was said.
  var transcript = event.results[current][0].transcript;

  // Add the current transcript to the contents of our Note.
  // There is a weird bug on mobile, where everything is repeated twice.
  // There is no official solution so far so we have to handle an edge case.
  var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

  if(!mobileRepeatBug) {
    noteContent += transcript;
    noteTextarea.val(noteContent);

  } 

};


recognition.onstart = function() { 
  instructions.text('Voice recognition activated. Try speaking into the microphone.');
}

recognition.onspeechend = function() {
  instructions.text('You were quiet for a while so voice recognition turned itself off.');
}


document.getElementById("pause-record-btn").onclick = ()=>{
  var tekhdem =false
  setTimeout(()=>{
    var data = {
      'text':noteContent
    }
   
    console.log(JSON.stringify(data));
  },2000)
}


recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.text('No speech was detected. Try again.');  
  };
}

/*-----------------------------
      App buttons and input 
------------------------------*/
//start record
$('#start-record-btn').on('click', function(e) {
  if (noteContent.length) {
    noteContent += ' ';
  }
  document.getElementById("pause-record-btn").style.display="inline-block";
  document.getElementById("start-record-btn").style.display="none";
  recognition.start();
  
});

// pause record
$('#pause-record-btn').on('click', function(e) {
  // vider l'input
  noteContent = '';
  recognition.stop();
  document.getElementById("pause-record-btn").style.display="none";
  document.getElementById("start-record-btn").style.display="inline-block";
  instructions.text('Voice recognition paused.');

});

// Sync the text inside the text area with the noteContent variable.
noteTextarea.on('input', function() {
  noteContent = $(this).val();
})

//---------------------------------- Scroll to the bottom of the chats-------------------------------
// function scrollToBottomOfResults() {
// 	var terminalResultsDiv = document.getElementById('chats');
// 	terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
// }


/*-----------------------------
      Speech Synthesis 
------------------------------*/

function readOutLoud(message) {
	var speech = new SpeechSynthesisUtterance();
  // Set the text and voice attributes.
  speech.lang = 'fr-FR';
	speech.text = message;
	speech.volume = 1;
	speech.rate = 1;
	speech.pitch = 1;
  
	window.speechSynthesis.speak(speech);
}

//script 1

 //card1 flip and// drag
 ( function() {
  var card = document.querySelector('.demo--card-flip ');


  card.addEventListener( 'click', function() {
    console.log(card.children[0].children[0]);
    card.children[0].children[0].classList.toggle('is-flipped');
    document.getElementById("profile_div").style.display="block";
  
   
   
    console.log(card.parentElement);
    

    var card2 = document.querySelector('.demo--card-flip2 '); 
    card2.parentElement.classList.toggle('fadeOutUp'); 
    var card3 = document.querySelector('.demo--card-flip3'); 
    card3.parentElement.classList.toggle('fadeOutUp'); 

    sleep(500).then(() => { 
      card2.parentElement.remove();
      card3.parentElement.remove();
    } ) ;



    
   /* sleep(1000).then(() => {
      card.parentElement.classList.toggle('justify-content-center');
      
    } ) ; 

    sleep(2000).then(() => {
      card.parentElement.classList.toggle('slideInRight');
      
    } ) ; */

    sleep(4000).then(() => {
      console.log(this.parentElement.parentElement.parentElement);
      this.parentElement.remove();
      document.getElementById("kd").style.display="block";
    } ) ; 
    /*card.children[0].children[0].children[1].classList.toggle('fill');
    const empty = document.querySelector('.empty'); 
    const fill = document.querySelector('.fill')
    console.log(card.children[0]); 
    card.children[0].addEventListener('dragstart',dragStart); 
    card.children[0].addEventListener('dragend',dragEnd); 

    empty.addEventListener('dragover',dragOver); 
    empty.addEventListener('dragenter',dragEnter); 
    empty.addEventListener('dragLeave',dragLeave);   
    empty.addEventListener('drop',dragDrop); */
  });
  
})();


//card2 flip and //drag
( function() {
  var card = document.querySelector('.demo--card-flip2 ');
  card.addEventListener( 'click', function() {
    
    card.children[0].children[0].classList.toggle('is-flipped');
    document.getElementById("profile_div").style.display="block";

    var card1 = document.querySelector('.demo--card-flip '); 
    card1.parentElement.classList.toggle('fadeOutUp'); 
    var card3 = document.querySelector('.demo--card-flip3'); 
    card3.parentElement.classList.toggle('fadeOutUp'); 

    sleep(500).then(() => { 
      card1.parentElement.remove();
      card3.parentElement.remove();
    } ) ;

    sleep(4000).then(() => {
      console.log(this.parentElement.parentElement.parentElement);
      this.parentElement.remove();
      document.getElementById("kd").style.display="block";
    } ) ; 
   /* card.children[0].children[0].children[1].classList.toggle('fill');
    const empty = document.querySelector('.empty'); 
    const fill = document.querySelector('.fill')
    console.log(card.children[0]); 
    card.children[0].addEventListener('dragstart',dragStart); 
    card.children[0].addEventListener('dragend',dragEnd); 

    empty.addEventListener('dragover',dragOver); 
    empty.addEventListener('dragenter',dragEnter); 
    empty.addEventListener('dragLeave',dragLeave);   
    empty.addEventListener('drop',dragDrop); */
  });
  
})();

//card3 flip and // drag
( function() {
  var card = document.querySelector('.demo--card-flip3 ');
  card.addEventListener( 'click', function() {
    
    card.children[0].children[0].classList.toggle('is-flipped');
    document.getElementById("profile_div").style.display="block";

    var card1 = document.querySelector('.demo--card-flip '); 
    card1.parentElement.classList.toggle('fadeOutUp'); 
    var card2 = document.querySelector('.demo--card-flip2'); 
    card2.parentElement.classList.toggle('fadeOutUp'); 

    sleep(500).then(() => { 
      card1.parentElement.remove();
      card2.parentElement.remove();
    } ) ;

    sleep(4000).then(() => {
      console.log(this.parentElement.parentElement.parentElement);
      this.parentElement.remove();
      document.getElementById("kd").style.display="block";
    } ) ; 
   /* card.children[0].children[0].children[1].classList.toggle('fill');
    const empty = document.querySelector('.empty'); 
    const fill = document.querySelector('.fill')
    console.log(card.children[0]); 
    card.children[0].addEventListener('dragstart',dragStart); 
    card.children[0].addEventListener('dragend',dragEnd); 

    empty.addEventListener('dragover',dragOver); 
    empty.addEventListener('dragenter',dragEnter); 
    empty.addEventListener('dragLeave',dragLeave);   
    empty.addEventListener('drop',dragDrop); */
  });
  
})();


//fade out effect object destruction 
for (let i=0 ; i<3 ; i++)
{
setTimeout(function(){
  var element = document.querySelector(".fadeOutUp");  
  //element.parentNode.removeChild(element); 
  element.parentElement.parentElement.remove();
},3000) ; 
}

setTimeout(function(){
  var element2 = document.querySelector(".fadeOutDown"); 
   element2.parentElement.parentElement.remove();
},3000);

//sleep function
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
    }








//drag functions
/*
function dragStart()
{
  setTimeout(() => this.parentElement.parentElement.className="invisible",0);
}
function dragEnd()
{   
  this.parentElement.parentElement.parentElement.parentElement.remove();
  
}

function dragOver(e)
{
  e.preventDefault();     
}

function dragEnter(e)
{
  e.preventDefault();    
}
function dragLeave() {}

function dragDrop()
{ 
  this.src = "image1.png";
  this.classList.toggle('animated'); 
  this.classList.toggle('heartBeat');
  console.log(this.parentElement.parentElement.parentElement.parentElement.parentElement);
  
 
  sleep(2000).then(() => {
    this.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
  } ) ; 
    

}
*/

class parallaxTiltEffect {
  constructor({element, tiltEffect}) {
    this.element = element;
    this.container = this.element.querySelector(".cont");
    this.size = [364, 211];
    [this.w, this.h] = this.size;
    
    this.tiltEffect = tiltEffect;
    this.mouseOnComponent = false;
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.defaultStates = this.defaultStates.bind(this);
    this.setProperty = this.setProperty.bind(this);
    this.init = this.init.bind(this);
    this.init();
  }
  handleMouseMove(event) {
    const {offsetX, offsetY} = event;
    let X;
    let Y;
    
    if(this.tiltEffect == "reverse") {
      X = ((offsetX - (this.w/2)) / 3) /3;
      Y = (-(offsetY - (this.h/2)) / 3) /3;
    }
    else if(this.tiltEffect == "normal") {
      X = (-(offsetX - (this.w/2)) / 3) /3;
      Y = ((offsetY - (this.h/2)) / 3) /3;
    }
    
    this.setProperty('--rY', X.toFixed(2));
    this.setProperty('--rX', Y.toFixed(2));
    
    this.setProperty('--bY', (80 - (X/4).toFixed(2)) + '%');
    this.setProperty('--bX', (80 - (Y/4).toFixed(2)) + '%');
  }
  handleMouseEnter() {
    this.mouseOnComponent = true;
    this.container.classList.add("container--active");
  }
  handleMouseLeave() {
    this.mouseOnComponent = false;
    this.defaultStates();
  }
  defaultStates() {
    this.container.classList.remove("container--active");
    this.setProperty('--rY', 0);
    this.setProperty('--rX', 0);
    this.setProperty('--bY', '80%');
    this.setProperty('--bX', '50%');
  }
  
  setProperty(p, v) {
    return this.container.style.setProperty(p, v);
  }
  
  init() {
    this.element.addEventListener('mousemove', this.handleMouseMove);
    this.element.addEventListener('mouseenter', this.handleMouseEnter);
    this.element.addEventListener('mouseleave', this.handleMouseLeave);
  }
}
const c = e => (document).querySelector(e);

const wrap1 = new parallaxTiltEffect({
  element: c('.wrap--1'),
  tiltEffect: 'reverse'
})
const wrap2 = new parallaxTiltEffect({
  element: c('.wrap--2'),
  tiltEffect: 'normal'
})
const wrap3 = new parallaxTiltEffect({
  element: c('.wrap--3'),
  tiltEffect: 'reverse'
})

