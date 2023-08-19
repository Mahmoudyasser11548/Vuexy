import React, { useState } from 'react'
import SpinningWheel from '../../../Components/SpinningWheel'

const data = [
  { id: 0, option: 'تيشيرت' },
  { id: 1, option: 'كرة قدم' },
  { id: 2, option: 'شاشة 32 بوصة' },
  { id: 3, option: 'حظ أوفر' },
  { id: 4, option: 'قسيمة شراء' },
  { id: 5, option: '1000 نقطة' },
  { id: 6, option: '100 نقطة' },
  { id: 7, option: 'حظ أوفر' }
]

const SpinWheel = () => {
  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState()

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length)
      setPrizeNumber(newPrizeNumber)
      setMustSpin(true)
    }
  }
  return (
    <div className="d-flex flex-column ">
      <SpinningWheel 
        mustSpin={mustSpin}
        prizeNumber={prizeNumber}
        handleSpinClick={handleSpinClick}
        data={data}
        outerBorderWidth={[20]}
        outerBorderColor={['#dc3545']}
        innerBorderColor={["#f2f2f2"]}
        textColors={["#f5f5f5"]}
        textDistance={55}
        fontSize={[25]}
        backgroundColors={[
          "#ffc107",
          "#052c65",
          "#0d6efd"
        ]}
        onStopSpinning={() => {
          setMustSpin(false)
        }}
      />
      <button type="button" className="spin-btn btn btn-dark fw-bold" onClick={handleSpinClick}>
        SPIN
      </button>
    </div>
  )
}

export default SpinWheel