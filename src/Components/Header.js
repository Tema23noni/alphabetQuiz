import React, { useEffect, useState } from 'react'
import { Alphabet } from '../Alphabet/Alphabet'
const Header = ({AlphabetObj}) => {
  
  const [name, setName] =useState('Хирагана')
  const [value, setValue] =useState(0)
  const [array, setArray] = useState(Object.values(Alphabet[value])[0])
  const [nameArray, setNameArray] = useState('hiragana')
  const chooseAlphabet = (e) =>{
    setValue(e.target.value)
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
  }
  useEffect(() =>{
    setName(Object.keys(Alphabet[value])[0]);
    setNameArray(Object.values(Alphabet[value])[0][0]['name']);
    setArray(Object.values(Alphabet[value])[0])
  },[value])
  useEffect(() =>{
    AlphabetObj(name,array, nameArray)
  },[name])

  return (
    <div className='header'>
        <div className='logotype'>
            <div className='logo'></div>
            <h1 className='logotype__text'>Alphabet quiz</h1>
        </div>
      
          <select value={value} onChange={chooseAlphabet} className='select'>

              {
                Alphabet.map((e,i) =>{ 
                  if(i == 0)return (<option key={Object.keys(e)} selected Value={i}>{Object.keys(e)}</option>)
                  return(
                    <option key={Object.keys(e)} value={i}>{Object.keys(e)}</option>
                  )
                })
              }
          </select>
       
    </div>
  )
}

export default Header
