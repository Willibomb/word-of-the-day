//define variables
let termDiv;
let definitionDiv;
let definition2Div;
let audioDiv;
let originDiv;
let exampleDiv;
let synonymsDiv;
let antonymsDiv;
let partOfSpeechDiv;
let phoneticDiv;
let randomWord = "";
let randomWordURL = 
"https://random-word-api.herokuapp.com/word?number=1";
let wordDefinitionURL = 
"https://api.dictionaryapi.dev/api/v2/entries/en/";

window.onload = function() {
	termDiv = document.getElementById("term");
	definitionDiv = document.getElementById("definition");
	definition2Div = document.getElementById("definition2");
	audioDiv = document.getElementById("audio");
	originDiv = document.getElementById("origin");
	exampleDiv = document.getElementById("example");
	partOfSpeechDiv = document.getElementById("partOfSpeech");
	phoneticDiv = document.getElementById("phonetic");
	synonymsDiv = document.getElementById("synonyms");
	antonymsDiv = document.getElementById("antonyms");
	fetchTerm(randomWordURL);
};



function fetchTerm(randomWordURL) {
	fetch(randomWordURL)
	.then(response => response.json())
	.then(data => updateWord(data[0]))
	.then(word => fetch(wordDefinitionURL + word))
	.then(response => response.json())
	.then(data2 => updateDefinition(data2)
	);
	
}//fetchTerm


function updateWord(newWord) {
	randomWord = newWord;
	termDiv.innerHTML = randomWord;
	return randomWord;
}//updateword

function updateDefinition(data2){
	console.log(data2);
	
	//show definition
	if (data2[0] != undefined){
	  let definition = data2[0].meanings[0].definitions[0].definition;
	definitionDiv.innerHTML = definition;
	//show audio file
	if(data2[0].phonetics[0].audio != undefined){
		let output = "<audio controls><source src='";
		output += "http:" + data2[0].phonetics[0].audio;
		output += "' type='audio/mpeg'>";
		output += "<br>Your browser does not support the audio tag.";
		output += "</audio>";
		audioDiv.innerHTML = output;
	}
	//show origin
	if (data2[0].origin != undefined){
		originDiv.innerHTML = "The word's origins: <br>" + data2[0].origin;
	}
	if (data2[0].meanings[0].definitions[0].example != undefined){
		exampleDiv.innerHTML = data2[0].meanings[0].definitions[0].example;
	}
	if (data2[0].meanings[0].partOfSpeech != undefined){
		partOfSpeechDiv.innerHTML = data2[0].meanings[0].partOfSpeech;
	}
	if (data2[0].meanings[0].definitions[0].synonyms != undefined && data2[0].meanings[0].definitions[0].synonyms.length != 0){
		synonymsDiv.innerHTML = "synonyms:<br>" + data2[0].meanings[0].definitions[0].synonyms;
	}
	if (data2[0].meanings[0].definitions[0].antonyms != undefined && data2[0].meanings[0].definitions[0].antonyms.length != 0){
		antonymsDiv.innerHTML = "Antonyms:<br>" + data2[0].meanings[0].definitions[0].antonyms;
	}
	if (data2[0].meanings[1].definitions[0] != undefined && data2[0].meanings[1].definitions[0].length != 0){
	    definition2Div.innerHTML = data2[0].meanings[1].definitions[0].definition;
	}
	if (data2[0].phonetic != undefined){
		phoneticDiv.innerHTML = data2[0].phonetic;
	}
	if (data2[0].phonetic != undefined){
		phoneticDiv.innerHTML = data2[0].phonetic;
	}
	} else {
		definitionDiv.innerHTML = data2.message + "<br>Please reload page.";
	}
}

