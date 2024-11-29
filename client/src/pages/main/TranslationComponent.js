import React, { useState } from 'react';
import axios from 'axios';

const TranslationComponent = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('hi'); // Default to Hindi

  const apiKey = '75b2b65ee24b1f20f4228ec1556c6aa8a635c2d4'; // Replace with your actual API key

  const handleTranslate = async () => {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    const data = {
      q: text,
      target: targetLanguage,
      format: 'text',
    };

    try {
      const response = await axios.post(url, data);
      setTranslatedText(response.data.data.translations[0].translatedText);
      console.log("ref",response)
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  return (
    <div>
      <h1>Google Translate</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className='text-black'
        placeholder="Enter text to translate"
      />
      <br />
      <select
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
        className='bg-black'
      >
        <option value="hi">Hindi</option>
        <option value="en">English</option>
      </select>
      <br />
      <button onClick={handleTranslate}>Translate</button>
      <h2>Translated Text:</h2>
      <p>{translatedText}</p>
    </div>
  );
};

export default TranslationComponent;
