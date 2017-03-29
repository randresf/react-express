import React from 'react'
import './style.css'

const UserInput = function({returnValue, name}) {
  function getValue(e){
    return returnValue(e.target)
  }

  return (
    <div className="userInput">
      <input
        type="text"
        name={name}
        onChange={getValue}
        placeholder="enter user name"
      />
    </div>
  )
}

export default UserInput
