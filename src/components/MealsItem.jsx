import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

import {FaTrash} from 'react-icons/fa'

export default function MealsItem({meal, id, onDelete}) {
  return (
    <li className="relative bg-slate-200 flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]">
        <Link className="contents" to={`/recipe/${meal.name}`}>
            <img
            className='h-[220px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in'
            loading='lazy'
            src={meal.img}
        />
        </Link>
        <Moment
            className='absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg' fromNow>
                {meal.timestamp?.toDate()}
        </Moment>
        <div className='w-full p-[10px]'>
            
            <p className='font-semibold m-0 text-lg text-rose-300 truncate'>{meal.title}</p>

        </div>

        {onDelete && (
            <FaTrash
            className = "absolute bottom-1 right-2 h-[14px] cursor-pointer text-red-500"
            onClick = {() => onDelete(meal.id)}
            />
        )}
        

  </li>
  )
}
