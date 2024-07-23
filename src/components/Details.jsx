import React, { useState, useRef, useEffect } from 'react'


const Details = (props) => {
  const nameRef = useRef()
  const numberRef = useRef()
  const monthRef = useRef()
  const yearRef = useRef()
  const cvcRef = useRef()

  const [isValidated, setIsValidated] = useState([true, true, true, true, true])
  const [checkValidate, setCheckValidate] = useState(false)

  useEffect(() => {
    if(checkValidate === true){
      let checker = arr => arr.every(ele => ele === true)
      if(!checker(isValidated)) return
      props.setIsCompleted(prev => !prev)
      setCheckValidate(prev => !prev)
    }
  }, [checkValidate])
  

  function validate() {
    let name = nameRef.current.value
    let number = numberRef.current.value
    let month = monthRef.current.value
    let year = yearRef.current.value
    let cvc = cvcRef.current.value

    if (name.length > 3) {
      setIsValidated(prev => [true, ...prev.slice(1)])
    }
    else {
      setIsValidated(prev => [false, ...prev.slice(1)])
    }

    if (/^\d{12}$/.test(number)) {
      setIsValidated(prev => [prev[0], true, ...prev.slice(2)])
    }
    else {
      setIsValidated(prev => [prev[0], false, ...prev.slice(2)])
    }

    if (month <= 12 && month > 0) {
      setIsValidated(prev => [...prev.slice(0, 2), true, ...prev.slice(3)])
    } else {
      setIsValidated(prev => [...prev.slice(0, 2), false, ...prev.slice(3)])
    }

    let currentYear = new Date().getFullYear() - 1
    currentYear = currentYear.toString()
    if (year > currentYear.slice(-2)) {
      setIsValidated(prev => [...prev.slice(0, 3), true, ...prev.slice(4)])
    }
    else {
      setIsValidated(prev => [...prev.slice(0, 3), false, ...prev.slice(4)])
    }

    if (/^\d{3}$/.test(cvc)) {
      setIsValidated(prev => [...prev.slice(0, 4), true, ...prev.slice(5)])
    }
    else {
      setIsValidated(prev => [...prev.slice(0, 4), false, ...prev.slice(5)])
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    setCheckValidate(prev => !prev)
    validate()
  }
  


  return (
    <form className='form' onSubmit={(e) =>  handleSubmit(e) }>
      <div>
        <label htmlFor="name">CARDHOLDER'S NAME</label>
        <div>
          <input className={!isValidated[0]?"outline-red": "" } type="text" placeholder='e.g Jane Miller' name="name" id="name" ref={nameRef} />
          {!isValidated[0] && <span className='validation-text'>Must be atleast 3 characters, cannot be blank</span>}
        </div>
      </div>
      <div>
        <label htmlFor="cardNumber">CARD NUMBER</label>
        <div>
          <input className={!isValidated[0]?"outline-red": "" } type="text" placeholder='e.g 9854 5698 5865 5555' name="cardNumber" id="cardNumber" ref={numberRef} />
          {!isValidated[1] && <span className='validation-text'>Wrong format, numbers only</span>}
        </div>
      </div>
      <div className='flex'>
        <div className='mx-4'>
          <label htmlFor="Date">EXP.DATE (MM/YY)</label>
          <div className='flex'>
            <div>
              <input className={!isValidated[0]?"outline-red": "" } placeholder='MM' type="text" name="Date" id="month" ref={monthRef} />
              {(!isValidated[3] && !isValidated[4]) && <span className='validation-text'>can't be blank</span>}
            </div>
            <div>
              <input className={`mx-4 ${!isValidated[0]?"outline-red": "" }`} placeholder='YY' type="text" name="Date" id="year" ref={yearRef} />
            </div>
          </div>
        </div>
        <div className='mx-4'>
          <label htmlFor="cardNumber">CVC</label>
          <div>
            <input className={!isValidated[0]?"outline-red": "" } type="text" placeholder='e.g 123' name="cardNumber" id="cardNumber" ref={cvcRef} />
            {!isValidated[4] && <span className='validation-text'> can't be blank</span>}
          </div>
        </div>
      </div>
      <div>
        <button className='btn' type='submit'>Confirm</button>
      </div>
    </form>
  )
}

export default Details