import React from 'react'
import ComandState from './comand-state'

const CommandStateBar = () => {
  return (
    <div className='w-full grid grid-cols-5 gap-2'>


        <ComandState isActive={true} color="bg-red-500" text="New" />
        <ComandState isActive = {false} color="green-500" text="Assigned"  />
        <ComandState isActive = {false} color="emerald-500" text="Cooking" />
        <ComandState isActive = {false} color="pink-500" text="Out Of Delivery" />
        <ComandState isActive = {false} color="lime-500" text="Completed" />
    </div>
  )
}

export default CommandStateBar