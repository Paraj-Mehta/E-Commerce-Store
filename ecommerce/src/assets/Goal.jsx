import React from 'react'
import { MissedGoal } from './MissedGoal'
import { MadeGoal } from './MadeGoal'

export const Goal = (props) => {
  return (
    <div>{!props.isGoal ? <MissedGoal /> : <MadeGoal /> }</div>
  )
}
