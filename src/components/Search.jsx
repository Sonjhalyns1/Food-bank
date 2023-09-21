import styled from 'styled-components';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Search() {

    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        navigate('/searched/' + input)


    };

  return (
    <div className='flex justify-center'>

        <form onSubmit = {submitHandler}>
            
            <div className='flex space-x-1'>
                
                
        
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaSearch 
                        className='text-rose-400'/>
                    </div>
                    <input 
                            onChange= {(e) => setInput(e.target.value)}    
                            type='text' 
                            value={input}
                            placeholder='Search meal'
                            className='w-full px-8 py-2 pl-10 border border-rose-100 text-xl text-gray-700   rounded-lg transition ease-in-out '/>
                
                    
                </div>
                <button type="submit" class="text-gray-700  bg-rose-400 hover:bg-rose-500 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800">Search</button>


                    
            </div>
            
            
            
        </form>
    </div>
    
  )
}
const FormStyle= styled.form`
    margin: 0rem 20rem;
    div {
        position: relative;
        width: 100%;
    }
    

    input{
        border: none;
        background: linear-gradient(35deg, #494949, #313131);
        font-size: 1.5rem;
        color: white;
        padding: 1rem 3rem;
        border: none;
        border-radius: 1rem;
        outline: none;
        width: 100%;


    }
    svg{
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(100%, -50%);
        color: white;
    }
`

export default Search
{/* <FormStyle onSubmit = {submitHandler}>
        
        <div>
            <FaSearch />
            <input 
                onChange= {(e) => setInput(e.target.value)}    
                type='text' 
                value={input}/>
        </div>
        
        
        
    </FormStyle> */}