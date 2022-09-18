
import { useEffect } from 'react';
import { useState } from 'react';
import Header from './Components/Header';
import { hiragana } from './Alphabet/Hiragana/Hiragana';
function App() {


  const [input, setInput] =useState('');
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [error, setError] = useState(false);
  const [nameAlphabet, setNameAphabet] = useState('hiragana');
  const [arrayAlphabet,setArrayAlphabet] = useState([])
  const [nameArray,setNameArray] = useState('');
  const [letterUpdate, setLetterUpdate] = useState('')
  const AlphabetObj = (namealphabet, arrayalphabet,namearray) =>{
    if(arrayAlphabet === undefined) return ;
    if(nameArray !== namearray){localStorage.setItem(`score${namearray}`, 0)}
    arrayalphabet.length ===1?setArrayAlphabet(...arrayalphabet):setArrayAlphabet(arrayalphabet);
    setNameAphabet(namealphabet);
    setArrayAlphabet(arrayalphabet)
    setNameArray(namearray)
  };
  
  const randomLetter = () => {
    setCurrent(Math.floor(Math.random() * arrayAlphabet.length))
  }
  const handleAnswer = (e) =>{
    setInput(e.target.value);
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    
    if(input.toLowerCase() === arrayAlphabet[current].cyrillic){
      
      setScore(score+1);
      setMaxScore(Math.max(score+1,maxScore))
      setError(false);
      localStorage.setItem(`score${nameArray}`, score + 1);
      localStorage.setItem(`maxScore${nameArray}`,Math.max(score+1,maxScore));
    }else{
      setScore(0);
      setError(`Неправильно, ${arrayAlphabet[current][nameArray]} это ${arrayAlphabet[current].cyrillic} `)
      localStorage.setItem('score', 0);
    }
    setInput('');
    randomLetter()
  }

  useEffect(() =>{
    randomLetter();
    
    setScore(parseInt(localStorage.getItem(`score${nameArray}`)) || 0);
    setMaxScore(parseInt(localStorage.getItem(`maxScore${nameArray}`)) || 0)
    setInput('');
    
 
  },[arrayAlphabet])

  return (
    <div className='App' >
      <Header AlphabetObj={AlphabetObj}/>
      <div className='AlphabetScore'>
          <p className='TypeAlphabet'>{nameAlphabet}</p>
          <div className='Score'><span>{score}/{maxScore}</span></div>
      </div>
      <div className='AlphabetQuiz'>
        <h2 className='AlphabetQuiz__text'>{!arrayAlphabet[current]?'':arrayAlphabet[current][nameArray]}</h2>
      </div>
      <form className='FormAplhabet' onSubmit={handleSubmit}>
        <input
          autoFocus
          maxLength={3}
          type="text"
          className='InputWord' 
          value={input}
          onChange={handleAnswer}
        />
      </form>
      {error && <p className='error'>{error}</p>}
    </div> 
  );
}

export default App;
