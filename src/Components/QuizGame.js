import React,{useState,useEffect} from 'react'

const QuizGame = () => {
    const [input, setInput] =useState('');
    const [current, setCurrent] = useState(0)
    const [score, setScore] = useState(0);
    const [maxScore, setMaxScore] = useState(0);
    const [error, setError] = useState(false);
    const [nameAlphabet, setNameAphabet] = useState('');
    const [arrayAlphabet,setArrayAlphabet] = useState([])
    const randomLetter = () => {
      const num = Math.floor(Math.random() * arrayAlphabet.length)
      if(num === 0)return 1
      setCurrent(num)
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
        localStorage.setItem('score', score + 1);
        localStorage.setItem('maxScore',Math.max(score+1,maxScore));
      }else{
        setScore(0);
        setError(`Неправильно, ${arrayAlphabet[current].hiragana} это ${arrayAlphabet[current].cyrillic} `)
        localStorage.setItem('score', 0);
      }
      setInput('');
      randomLetter()
    }
  
    useEffect(() =>{
      randomLetter();
      setScore(parseInt(localStorage.getItem('score')) || 0);
      setMaxScore(parseInt(localStorage.getItem('maxScore')) || 0)
  
    },[])
    const AlphabetObj = (nameAlphabet, arrayAlphabet) =>{
        setNameAphabet(nameAlphabet);
        setArrayAlphabet(arrayAlphabet)
      }
      useEffect(() =>{
        console.log(arrayAlphabet, 'heelo')
      },[nameAlphabet])
  return (
    <>
      <div className='AlphabetScore'>
          <p className='TypeAlphabet'>{nameAlphabet}</p>
          <div className='Score'><span>{score}/{maxScore}</span></div>
      </div>
      <div className='AlphabetQuiz'>
        <h2 className='AlphabetQuiz__text'>arrayAlphabet[current]</h2>
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
    </>
  )
}

export default QuizGame
