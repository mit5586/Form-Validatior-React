import React from 'react'
import thankYou from '../../images/icon-complete.svg'

const Completed = (props) => {
    function handleClick(){
        props.setIsCompleted(prev => !prev)
    }
    return (
        <div className='form'>
            <img className='my-8' src={thankYou} alt="thank you" />
            <h1 className='my-8'>Thank You</h1>
            <p className=''>We've added your card details</p>
            <button onClick={handleClick} className='btn my-12'>Continue</button>
        </div>
    )
}

export default Completed
