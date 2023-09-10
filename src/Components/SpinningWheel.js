import React from "react"
import { Wheel } from "react-custom-roulette"

const SpinningWheel = (props) => {
  const { data, prizeNumber, mustSpin, ...rest } = props

  return (
    <div>
      <div
        align="center"
        className="wheel-container m-auto position-relative shadow mb-4"
      >
        <div className="position-absolute top-50 start-50 d-flex justify-content-center align-items-center circle shadow"></div>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          {...rest}
        />
      </div>
    </div>
  )
}

export default SpinningWheel
