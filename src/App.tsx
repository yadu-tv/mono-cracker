import { useState } from 'react'
import './App.css'
import { Input, Button } from 'antd';
import CryptoJS from 'crypto-js';

function App() {
  const [email, setEmail] = useState<any>('');
  const [generatedVsKey, setgeneratedVsKey] = useState<string>();
  const [generatedSubKey, setgeneratedSubKey] = useState<string>();
  const [emailError, setEmailError] = useState<boolean>(false);

  const handleChange = (event: { target: { value: any; }; }) => {
    const value = event.target.value;
    setEmail(value);
  };
  
  const validateEmail = () => {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if( emailRegex.test(email) == true) {
      setgeneratedVsKey(keygen_vscode(email));
      setgeneratedSubKey(keygen_sublime(email));
      setEmailError(false);
    } else {
      setEmailError(true);
      setgeneratedVsKey('');
      setgeneratedSubKey('');
    }
  };

  function keygen_vscode(email: string) {
    const fillerString = 'fd330f6f-3f41-421d-9fe5-de742d0c54c0';
    const hash = CryptoJS.MD5(`${fillerString}${email}`).toString().slice(0, 25);
    return(keygenInsertSeparator(hash))
  };

  function keygen_sublime(email: string) {
    const hash = CryptoJS.MD5(email).toString().slice(0, 25);
    return(keygenInsertSeparator(hash));
  }

  function keygenInsertSeparator(generater_key: string) {
    let counter = 1;
    let keyFinal = '';
  
    for (let i = 0; i < generater_key.length; i++) {
      const letter = generater_key[i];
  
      if (counter % 5 === 0 && counter !== 25) {
        keyFinal += letter + '-';
      } else {
        keyFinal += letter;
      }
  
      counter++;
    }
    return(keyFinal);
  }

  return (
    <>
      <h2>Monokai Pro Key Generator</h2>
      <div className="email">
        <p className='email-text'>Enter your email address: </p>
        <Input onChange={handleChange} className='email-input'/>
      </div>
        <Button className='confirm-button' type='primary' onClick={validateEmail}>Confirm</Button>
      <div className="key-output">
        {generatedVsKey && (
          <p>VS Code key: <span className='key'>{generatedVsKey}</span></p>
        )}
        {generatedVsKey && (
          <p>Sublime Editor key: <span className='key'>{generatedSubKey}</span></p>
        )}
      </div>
      {emailError && (
        <p style={{'fontWeight':500}}>Enter a valid Email!!!</p>
      )}
    </>
  )
}

export default App