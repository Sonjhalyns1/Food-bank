import React, { useEffect, useState } from 'react'
import { GiKnifeFork } from 'react-icons/gi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Search from './Search'
import { FaHamburger, FaBars, FaTimes } from 'react-icons/fa'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { styled } from 'styled-components'

export default function Navbar() {
    const auth = getAuth();
    const [pageState, setPageState] = useState("Sign in")
    const [nav, setNav] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        onAuthStateChanged(auth, (user) =>{
            if(user){
                setPageState("Profile")
            }else{
                setPageState("Sign in")
            }
        })
    })
    function pathMatchRoute(route){
        if(route === location.pathname){
            return true
        }
    }
    const handleClick = () => setNav(!nav)
  return (
    <div className=''>

            <header className='flex justify-between items-center px-3 max-w-7xl mx-auto'>
                <div className='flex text-2xl'>
                    <GiKnifeFork className='text-rose-500'/>
                    <curse>
                        <Link to = {"/"} className='text-rose-500'>Tasty</Link>
                    </curse> 
        
                </div>
                <div className='hidden md:flex'>
                    <Search />
        
                </div>
                <div className='hidden md:flex'>
                    <ul className='flex space-x-7'>
                        <li 
                            className={`cursor-pointer py-3 text-sm text-rose-300 font-semibold  border-b-[3px] border-b-transparent ${pathMatchRoute("/") && "!text-rose-500 !border-b-rose-600"}`}onClick={()=>navigate("/")}>
                                Home
                        </li>
                        <li 
                            className={`cursor-pointer py-3 text-sm text-rose-300 font-semibold  border-b-[3px] border-b-transparent ${pathMatchRoute("/mealprep") && "!text-rose-500 !border-b-rose-600"}`}onClick={()=>navigate("/mealprep")}>
                                Meal Prep
                        </li>
                        <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${(pathMatchRoute("/signin") || pathMatchRoute("/profile"))  && "!text-black !border-b-red-500"}`}onClick={()=>navigate("/profile")}>{pageState}</li>
                        
                        
                    </ul>
                </div>
                <div onClick={handleClick} className='md:hidden z-30'>
                    {!nav ? <FaBars />: <FaTimes className='text-2xl'/>}
                </div>
                <ul onClick={()=> handleClick} className={!nav ? 'hidden' : 'absolute top-0 left-0 w-full h-[300px]  bg-rose-200 flex flex-col justify-center items-center'}>
                    <Search />
                    <Link  to = {"/"}
                            className={'cursor-pointer py-3 text-sm text-rose-300 font-semibold  border-b-[3px] border-b-transparent '} >
                                Home
                    </Link>
                    <Link  to = {"/mealprep"}
                            className={'cursor-pointer py-3 text-sm text-rose-300 font-semibold  border-b-[3px] border-b-transparent '} >
                                MealPrep
                    </Link>
                    <Link  to = {"/profile"}
                            className={'cursor-pointer py-3 text-sm text-rose-300 font-semibold  border-b-[3px] border-b-transparent '} >
                                <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${(pathMatchRoute("/signin") || pathMatchRoute("/profile"))  && "!text-black !border-b-red-500"}`}onClick={()=>navigate("/profile")}>{pageState}</li>
                    </Link>
                    
                </ul>
            </header>
        
    </div>
  )
}
const curse = styled.div`
    font-family: 'Lobster Two', cursive

`

{/* <Nav>
        <GiKnifeFork className="text-rose-500"/>
        <Logo to = {"/" }
        className="text-rose-500">Tasty</Logo>
      </Nav> */}
    //   const Logo = styled(Link)`
    //   text-decoration: none;
    //   font-size: 1.5rem;
    //   font-weight:400;
    //   font-family: 'Lobster Two', cursive;
    // `
    // const Nav = styled.div`
    //   padding: 4rem 0rem;
    //   display: flex;
    //   justify-content: flex-start;
    //   align-items: center;
    // `