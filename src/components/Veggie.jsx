import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import {Splide, SplideSlide} from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css'
import { Link } from 'react-router-dom';

function Veggie() {
    const [veggie, setVeggie] = useState([]);
    useEffect(() => {
        getVeggie();
    },[]);

    const getVeggie = async () =>{

        const check = localStorage.getItem('veggie');

        if(check){
            setVeggie(JSON.parse(check));

        }else{
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);

            const data = await api.json()
            localStorage.setItem('veggie', JSON.stringify(data.recipes));
            setVeggie(data.recipes)
        }
        

    }
  return (
    <div className=''>
        
            
    <Wrapper>
        <h3 className=''>Veggie Picks</h3>
        <Splide options={{
                
                
                perPage: 4,
                breakpoints: {
                  1500: {
                    perPage: 3,
                   
                  },
                  1200: {
                    perPage: 2,
                
                  },
                  840: {
                    perPage: 1,
              
                  },
                },
                focus: "center",
                gap: '1em',
                updateOnMove : true,
                pagination: false,
                arrows: false,
            
        }}>

        {veggie.map((recipe) =>{
            return (
                <SplideSlide key={recipe.id}>

                <Card className='max-w-xl mx-auto'>
                <Link to={"/recipe/"+ recipe.id}>

                    <p className='text-rose-700 '>{recipe.title}</p>
                    <img 
                    className='h-auto max-w-sm rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30'
                    src={recipe.image} 
                    alt = {recipe.image} />
                    <Gradient />
                </Link>
                </Card>
                </SplideSlide>
            );
        })}
        </Splide>
    </Wrapper>



</div>
)
}
const Wrapper = styled.div`
margin: 4rem 0rem;
`
const Card = styled.div`
min-height: 25rem;
border-radius: 2rem;
overflow: hidden;

img{
border-radius: 2rem;
position: absolute;
left: 0;
width: 100%;
height: 100%;
object-fit: cover;

}
p{
position: absolute;
z-index: 50;
left: 50%;
bottom: 0%;
transform: translate(-50%, 0%);

width: 100%;
text-align: center;
font-weight: 600;
font-size: 1rem;
height: 40%;
display: flex;
justify-content: center;
align-items: center;
}
`
const Gradient = styled.div`
z-index: 3;
position: absolute;
width: 100;
height: 100%;
background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.5))

`
export default Veggie


{/* <div className=''>
        
            
        <Wrapper>
            <h3 className=''>Veggie Picks</h3>
            <Splide options={{
                    perPage: 4,
                    arrows: false,
                    pagination: false,
                    drag: "free",
                    gap: "5rem",
                
            }}>
    
            {veggie.map((recipe) =>{
                return (
                    <SplideSlide key={recipe.id}>
    
                    <Card className='max-w-xl mx-auto'>
                    <Link to={"/recipe/"+ recipe.id}>
    
                        <p>{recipe.title}</p>
                        <img src={recipe.image} alt = {recipe.image} />
                        <Gradient />
                    </Link>
                    </Card>
                    </SplideSlide>
                );
            })}
            </Splide>
        </Wrapper>
    
    
    
    </div> */}