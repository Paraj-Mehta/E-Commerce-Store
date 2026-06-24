import React from 'react'

export const ButtonComponent = (props) => {
  return (
    <button onClick={props.onClick}>{props.btnName}</button>
  )
}
