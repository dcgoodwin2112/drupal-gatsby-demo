import React from "react"

const DelayToggle = () => {
  let delay = window.localStorage.getItem("fetchDelay")

  if (delay == null) {
    delay = 0
  }

  const timeStates = {
    slow: {
      delay: 500,
      label: "Slow Time",
    },
    normal: {
      delay: 0,
      label: "Normal Time",
    },
  }

  const initTime = delay > 0 ? timeStates.slow : timeStates.normal

  const [timeState, setTimeState] = useState(initTime)

  const setTime = e => {
    setTimeState(timeStates[e.target.name])
    window.localStorage.setItem(
      "fetchDelay",
      timeStates[e.target.name]["delay"]
    )
  }

  return (
    <div className="fetch-delay-toggle" style={{ position: `absolute` }}>
      <button
        name="slow"
        disabled={timeState.delay > 0 && true}
        onClick={setTime}
      >
        {timeStates.slow.label}
      </button>
      <button
        name="normal"
        disabled={timeState.delay === 0 && true}
        onClick={setTime}
      >
        {timeStates.normal.label}
      </button>
    </div>
  )
}

export default DelayToggle
