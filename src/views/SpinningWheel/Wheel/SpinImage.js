import "react-roulette-pro/dist/index.css"

import { Button } from "reactstrap"
import RoulettePro from "react-roulette-pro"
import { useState } from "react"

const prizes = [
  {
    id: 1,
    image: "https://i.ibb.co/6Z6Xm9d/good-1.png",
  },
  {
    id: 2,
    image: "https://i.ibb.co/T1M05LR/good-2.png",
  },
  {
    id: 3,
    image: "https://i.ibb.co/Qbm8cNL/good-3.png",
  },
  {
    id: 4,
    image: "https://i.ibb.co/5Tpfs6W/good-4.png",
  },
  {
    id: 5,
    image: "https://i.ibb.co/64k8D1c/good-5.png",
  },
]

const winPrizeIndex = 0

const reproductionArray = (array = [], length = 0) => [
  ...Array(length)
    .fill("_")
    .map(() => array[Math.floor(Math.random() * array.length)]),
]

const reproducedPrizeList = [
  ...prizes,
  ...reproductionArray(prizes, prizes.length * 3),
  ...prizes,
  ...reproductionArray(prizes, prizes.length),
]

const generateId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).substring(2)}`

const prizeList = reproducedPrizeList.map((prize) => ({
  ...prize,
  id:
    typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : generateId(),
}))

const SpinImage = () => {
  const [start, setStart] = useState(false)

  const prizeIndex = prizes.length * 4 + winPrizeIndex

  const handleStart = () => {
    setStart((prevState) => !prevState)
  }

  const handlePrizeDefined = () => {
    console.log("🥳 Prize defined! 🥳")
  }

  return (
    <div className="roulette-pro-spin">
      <RoulettePro
        prizes={prizeList}
        prizeIndex={prizeIndex}
        start={start}
        soundWhileSpinning="https://react-roulette-pro.ivanadmaers.com/assets/f3722b4574da2a35a4ef.mp3"
        onPrizeDefined={handlePrizeDefined}
      />
      <div className="roulette-actions">
        <div className="gray-block">
          <Button className="btn-wheel mt-1" onClick={handleStart}>
            Start
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SpinImage
