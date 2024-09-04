const btn = document.querySelector('.search-btn');
const textBody = document.querySelector('.text-body');
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

let sound = document.querySelector('.word-sound'); // Define sound here so it can be accessed later

btn.addEventListener('click', () => {
  let textIn = document.querySelector('.input').value;

  fetch(`${url}${textIn}`)
    .then((response) => response.json())
    .then((data) => {
      if (data && data[0]) {
        const wordData = data[0];
        const meaning = wordData.meanings[0];
        const definition = meaning.definitions[0];
        const phoneticAudio = wordData.phonetics[0]?.audio || ''; // Get the audio source

        textBody.innerHTML = `
        <div class="word-div">
          <h3 class="word-text">${textIn}</h3>
          
          <button onclick="playSound()" class="word-sound">
          🔊
          </button>
          </div><br>
          
          <label>Part Of Speech / Phonetics:</label>
          <br>
          
          <br>
          <p class="part-of">
            <small> ${meaning.partOfSpeech} / 
              <span class="sign-text"> ${wordData.phonetic || '??'}</span> / 
            </small>
          </p><br>
          
          <label>Meaning:</label>
          <br>
          
          <br>
          <p class="meaning">  ${definition.definition}</p><br>
          
          <label>Example:</label>
          <br>
          
          <br>
          <p class="sentence">
            <small> ${definition.example || "No example available."}</small>
          </p><br>
              
        <hr><br>
        <p class="text-2" style="text-align: center;"><small class="search-bar">
          {Mac Handel Fabian Codes/}.
          </small>
        </p>
        <br>
        `;

        if (phoneticAudio) {
          // If the audio exists, create or select the audio element and set its source
          sound = new Audio(phoneticAudio);
        } else {
          // If no audio exists, set sound to null or show a message
          sound = null;
          //("No audio available for this word.");
        }
      } else {
        textBody.innerHTML = `<p>No results found for "${textIn}".</p>`;
      }
    })
    .catch(error => {
      console.error('Error fetching the dictionary data:', error);
      textBody.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
    });
});

function playSound() {
   if (sound) {
     sound.play();
   } else {
     alert("No sound available to play.");
   }
}