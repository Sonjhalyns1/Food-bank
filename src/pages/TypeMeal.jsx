import { useEffect, useState } from 'react'
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {Link, useParams} from "react-router-dom";
import Recipe from './Recipe';


export default function TypeMeal() {
    const [type, setType] = useState([]);
    let params = useParams();

    const getType = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&type=${name}`)
        const recipes = await data.json();
        setType(recipes.results)
    }
    useEffect(() => {
        getType(params.type)
        
    }, [params.type])
  return (
    <Grid>
        {type.map((item) => {

            return(
                <Card key={item.id}>
                    <Link to={"/recipe/"+ item.id}>

                    <img src= {item.image} alt='' />
                    <h4 className='text-rose-800'>{item.title}</h4>
                    </Link>
                </Card>
            )
        })}
    </Grid>
  )
}

const Grid = styled.div `
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
`;

const Card = styled.div`
    img{
        width: 100%;
        border-radius: 2rem;
    }
    a {
        text-decoration: none;
    }
    h4{
        text-align: center;
        padding: 1rem;
    }
`

