

var currentScene;
var speech = new SpeechSynthesisUtterance();
speech.rate = 0.8;
setVoice("Samantha");

var queue = [
	{ "type" : "water",
		"speech" : "Good evening. I’m glad you made it to this wind down shower practice. When you hear the first chime it's time to turn on the shower and soak your body. When the repeating chimes and light itensifies it's time to turn it off again.",
		"duration" : 60,
		"background" : "radial-gradient(closest-side, #ffcf7c 88.24%, #ffb430 95.8%, #fca100);"
	},
	{ "type" : "pause",
		"speech" : "Good job. I hope you are all soaked by now, because now it's time to soap your body.",
		"duration" : 30,
		"background": "radial-gradient(closest-side, #ff9e7c 88.24%, #ff6530 95.8%, #fc6100);"
	},
	{ "type" : "water",
		"speech" : "Time to rinse away all stress. Turn the water back on.",
		"duration" : 120,
		"background" : "radial-gradient(closest-side, #ffcf7c 88.24%, #ffb430 95.8%, #fca100);"
	},
	{ "type" : "pause",
		"speech" : "Good. Now it's time to get dry and go to bed. Hope you enjoyed it.",
		"duration" : 0,
		"background": "radial-gradient(closest-side, #ff9e7c 88.24%, #ff6530 95.8%, #fc6100);"
	}
];
queue.reverse();

var duration;
var interval;
function timeinterval(){
	
	// sound.fade(1.0, 0.0, interval * 1000);
	if (interval = = 0) { //if dry mode
		playNextScene();
	}
	else if (interval < 1.1){
		sound.play();
		stopSound.play();
		playNextScene();
	} else {
		sound.play();
	
		document.querySelector('.bg').classList.add('blink');
		setTimeout(function(){
			document.querySelector('.bg').classList.remove('blink');
		}, 400);	
		
		setTimeout(timeinterval, (interval-1) * 1000);
		interval = Math.pow(interval,1/1.5);	
	}
}


[].forEach.call(document.querySelectorAll('.btn'), function(btn){
	btn.addEventListener('click', btnListener, false);	
});

function btnListener(e){
	if (e.currentTarget.dataset.action == "start") {
		startInterval();
	} else {
		document.querySelector('.modal:not(.hide)').classList.add('hide');
		document.querySelector(e.currentTarget.dataset.action).classList.remove('hide');
	}
}

function startInterval(){
	speech.text = " ";
	speechSynthesis.speak(speech);
	document.querySelector('.modal:not(.hide)').classList.add('hide');
	document.body.classList.add('playing');
	playNextScene();
	

	// setTimeout(function(){initTimer(30)},6000);
}




function initTimer(dur) {
	duration = dur;
	interval = dur - Math.pow(dur,1/1.5) * 0.8;
	timeinterval();
}


var sound = new Howl({
  src: ['assets/vibra.mp3'],
  autoplay: false,
  volume: 1.0
});

var stopSound = new Howl({
  src: ['assets/stop-bowl.m4a'],
  autoplay: false,
  volume: 1.0
});


function playNextScene(){

	if (queue.length >= 1){
		currentScene = queue.pop();
		document.querySelector('.bg').setAttribute('style', 'background: ' + currentScene.background + ';');
		document.querySelector('.bg').classList.add('low');
		setTimeout(function(){
			
			speech.text = currentScene.speech;
			speech.onend = function(){
				initTimer(currentScene.duration);
			}
			speechSynthesis.speak(speech);	
		},2000);
	}
	
}

function setVoice(x) {
	var voices = speechSynthesis.getVoices();
	for (var i = 0;i< voices.length;i++){
		if (voices[i].name == x){
			speech.voice = voices[i];
			return true;
		}
	}
}