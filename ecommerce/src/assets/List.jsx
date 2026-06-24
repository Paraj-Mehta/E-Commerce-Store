import React from 'react'

export const List = () => {
    const li = ["item1", "item2", "item3"];

  return (
    <>
     {
        li.map((item , index)=>(
            <div key={index}> {item}</div>
        ))
    }
    </>
  )
}
