import {FaPizzaSlice, FaHamburger} from 'react-icons/fa';
import {GiNoodles, GiChopsticks} from 'react-icons/gi'
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import React from 'react'

function CategoryType() {
  return (
    <div className='flex space-x-4 justify-center mt-5 mb-5'>
      

        <NavLink to = {'/type/breakfast'}
        className="flex justify-center p-4 border border-rose-400 rounded-lg bg-rose-400 hover:bg-rose-500 hover:border-rose-600 border-3">
            <FaPizzaSlice 
            className=''/>
            <h4 className='ml-1'>breakfast</h4>
        </NavLink>
      
        <NavLink to = {'/type/salade'}
        className="flex justify-center p-4 border border-rose-400 rounded-lg bg-rose-400 hover:bg-rose-500 hover:border-rose-600 border-3">
            <FaHamburger />
            <h4>Salade</h4>
        </NavLink>
        <NavLink to = {'/type/snack'}
        className="flex justify-center p-4 border border-rose-400 rounded-lg bg-rose-400 hover:bg-rose-500 hover:border-rose-600 border-3">
            <GiNoodles />
            <h4>snack</h4>
        </NavLink>
        <NavLink to = {'/type/dessert'}
        className="flex justify-center p-4 border border-rose-400 rounded-lg bg-rose-400 hover:bg-rose-500 hover:border-rose-600 border-3">
            <GiChopsticks />
            <h4>dessert</h4>
        </NavLink>
    </div>
  )
}
const List = styled.div `
  display: flex;
  justify-content: center;
  margin: 2rem 0rem;
  
`
const Slink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 2rem;
  text-decoration: none;
  background: linear-gradient(35deg, #494949, #313131);
  width: 6rem;
  height: 6rem;
  cursor: pointer;
  transform: scale(0.8);

  h4 {
    color: white;
    font-size: 0.8rem;

  }
  svg {
    color: white;
    font-size: 1.5rem;

  }
  &.active{
    background: linear-gradient(to right, #f27121, #e94057);

    svg{
      color: white;

    }
    h4 {
      color: white;

    }
  }


`


export default CategoryType