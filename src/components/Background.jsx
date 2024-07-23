import React, {useState} from 'react'
import cardLogo from '../../images/card-logo.svg'
import Completed from './Completed'
import Details from './Details'

const Background = () => {
  const [isCompleted, setIsCompleted] = useState(false)
  return (
    <section className='main'>
        <div className='card-wrapper'>
            <div className='card card-front'>
              <img src={cardLogo} alt="card-logo"/>
              <div className='card-detalis'>
                <div className='numbers'>1234 564 8797 4564</div>
                <div className='other-details'>
                  <p>FELICIA LEIRE</p>
                  <p>09/00</p>
                </div>
              </div>
            </div>
            <div className='card card-back'></div>
        </div>
        <div className='form-content'>
          {!isCompleted ?<Details setIsCompleted={setIsCompleted}/> : <Completed setIsCompleted={setIsCompleted}/>}
        </div>
    </section>
  )
}

export default Background   