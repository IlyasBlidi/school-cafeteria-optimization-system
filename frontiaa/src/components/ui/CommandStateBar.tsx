'use client'
import React, { useState } from 'react'
import ComandState from './comand-state'


const CommandStateBar = () => {
  const [activeState, setActiveState] = useState(0);

  const states = [
    { color: "red-500", text: "New" },
    { color: "green-500", text: "Assigned" },
    { color: "emerald-500", text: "Cooking" },
    { color: "pink-500", text: "Out Of Delivery" },
    { color: "lime-500", text: "Completed" }
  ];

  return (
    <div className='w-full grid grid-cols-5 gap-2'>
      {states.map((state, index) => (
        <ComandState
          key={index}
          isActive={activeState === index}
          color={state.color}
          text={state.text}
          onClick={() => setActiveState(index)}
        />
      ))}
    </div>
  );
};

export default CommandStateBar;
