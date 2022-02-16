document.getElementById("idc").addEventListener("submit", async (event) => {
  event.preventDefault();
  document.getElementById("searchResult").style.visibility = "visible";
  document.getElementById("SeeMore").style.visibility = "hidden";

  const word = document.getElementById("word");
  const verb = document.getElementById("verb");
  const definition = document.getElementById("definition");
  const synonyms = document.getElementById("synonyms");
  const example = document.getElementById("example");
  const spell = document.getElementById("spell");
  const wordToSearch = document.getElementById("searchBox").value;

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${wordToSearch}`;
  const response = await fetch(url);
  const JsonRes = await response.json();

  if (wordToSearch == "") {
    alert("Enter a Word");
  } else if (response.status >= 200 && response.status < 400) {
    word.innerHTML = JsonRes[0].word;
    verb.innerHTML = JsonRes[0].meanings[0].partOfSpeech;
    definition.innerHTML = JsonRes[0].meanings[0].definitions[0].definition;
    synonyms.innerHTML = JsonRes[0].meanings[0].definitions[0].synonyms;
    example.innerHTML = JsonRes[0].meanings[0].definitions[0].example;

    // Audio OutPut
    spell.setAttribute("src", JsonRes[0].phonetics[0].audio);
    spell.setAttribute("controls", "controls");
    spell.setAttribute("autoplay", "autoplay");
  } else {
    word.innerHTML = "The Word You are Looking is Not Found.";
    verb.innerHTML = "The Word You are Looking is Not Found.";
    definition.innerHTML = "The Defination You are Looking is Not Found";
    synonyms.innerHTML = "The synonyms You are Looking is Not Found";
    example.innerHTML = "The example You are Looking is Not Found";
    document.getElementById("SeeMore").style.visibility = "hidden";
  }
});

const MoreData = async () => {
  document.getElementById("SeeMore").style.visibility = "visible";

  const verb = document.getElementById("erb");
  const definition = document.getElementById("efinition");
  const efinition = document.getElementById("finition");
  const synonyms = document.getElementById("ynonyms");
  const example = document.getElementById("xample");

  const wordToSearch = document.getElementById("searchBox").value;

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${wordToSearch}`;
  const response = await fetch(url);
  const JsonRes = await response.json();

  verb.innerHTML = JsonRes[0].meanings[1].partOfSpeech;
  definition.innerHTML = JsonRes[0].meanings[1].definitions[0].definition;
  example.innerHTML = JsonRes[0].meanings[1].definitions[0].example;
  synonyms.innerHTML = JsonRes[0].meanings[1].definitions[0].synonyms;

  const url2 = `https://api.wordnik.com/v4/word.json/${wordToSearch}/definitions?limit=10&includeRelated=false&useCanonical=false&includeTags=false&api_key=e0d094e089e87c411680f08f6ab0e7be39143f84626e8c9e4`;
  const response2 = await fetch(url2);
  const JsonRes2 = await response2.json();

  efinition.innerHTML = JsonRes2[1].text;
};

// Speech TO Text Conversion
function SToT() {
  var output = document.getElementById("output");
  const Inp = document.getElementById("searchBox");
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  recognition.onresult = function (event) {
    var transcript = event.results[0][0].transcript;
    output.innerText = transcript;
    Inp.value = output.innerText;
  };
  recognition.start();
}
