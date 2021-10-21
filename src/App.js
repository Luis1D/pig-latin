import './App.css';
import React, { useState } from 'react';

function App() {
  const [pigLatin, setPigLatin] = useState({text: "", submited: false});
  const translate = (str) => {
    let cleanupStr = str.trim().toLowerCase();
    let reg = /[aeiou]|[AEIOU]/
    if (/\s/.test(cleanupStr)) {
      let sentence = cleanupStr.split(" ").map(word => {
        let matchStr = word.match(reg);
        if (matchStr === null) {
          return word += "ay"
        }
        if (matchStr.index > 0) {
          let consonent = word.substr(0, matchStr.index);
          let subStr = word.substr(matchStr.index);
          return subStr += consonent += "ay";
        }
        return word += "way";
      })
      return sentence.join(" ");
    }
    let matchStr = cleanupStr.match(reg);
    if (matchStr === null) {
      return cleanupStr += "ay";
    }
    if (matchStr.index > 0) {
      let consonent = cleanupStr.substr(0, matchStr.index);
      let subStr = cleanupStr.substr(matchStr.index);
      return subStr += consonent += "ay";
    }
    return cleanupStr += "way";
  }

  const handleChange = e => {
    setPigLatin({ text: e.target.value, submited: false });
  }

  const handleSubmit = e => {
    e.preventDefault();
    let textToUse = translate(pigLatin.text);
    setPigLatin({ text: textToUse, submited: true });
  }

  return (
    <div className="App">
      <div className="header">
        <img 
          className={ pigLatin.submited ? "triggerPig" : null }
          src="pig.png" 
          alt="Pigy"
        />
        <h1>Pig Latin Translator</h1>
      </div>
      <form onSubmit={ handleSubmit }>
        <input className="input-text" type="text" onChange={ handleChange } placeholder="Type something" />
        <input className="input-submit" type="submit" />
      </form>
      <div className="output">
        <p>{ pigLatin.submited ? pigLatin.text : "Enter text above.." }</p>
      </div>
    </div>
  );
}

export default App;
