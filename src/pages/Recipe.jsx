import { getAuth } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useEffect, useState} from 'react'
import {GrSave} from "react-icons/gr"
import React from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { styled } from 'styled-components';
import { db } from '../firebase';


function Recipe() {
  const auth = getAuth();
  let params = useParams();
  const [details, setDetails] = useState([]);
  const [activeTab, setActiveTab] = useState("instructions");

  const fetchDetails = async () => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
    const detailData = await data.json();
    setDetails(detailData);
  }

  const saveMeal = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const mealData = {
          name: params.name,
          timestamp: serverTimestamp(),
          uid: user.uid,
          title: details.title,
          img: details.image
        };

        const docRef = await addDoc(collection(db, 'meals'), mealData);
        toast.success('Meal saved successfully!');
      } else {
        toast.error('User not authenticated. Please sign in.');
      }
    } catch (error) {
      console.error('Error saving meal:', error);
      toast.error('Error saving meal. Please try again later.');
    }
  }

  useEffect(() => {
    fetchDetails();
  }, [params.name]);
  return (
    <div>
      <div>
        <h2 className='mt-7 text-center text-bold text-rose-800 text-xl mb-5'>{details.title}</h2>
        <div className='flex space-x-2 justify-center'>
          <button 
          className={activeTab === 'instructions' ? "text-gray-600 group border-2 px-8 py-3 my-2 flex bg-rose-300 hover:bg-rose-500 hover:border-rose-500 rounded-lg": "text-gray-600 group border-2 px-8 py-3 my-2 flex bg-rose-100 hover:bg-rose-500 hover:border-rose-500 rounded-lg"} 
          onClick={() => setActiveTab("instructions")}>
            Intructions
          </button>
          <button
          
          className= {activeTab === 'ingredients' ? "text-gray-600 group border-2 px-8 py-3 my-2 flex bg-rose-300 hover:bg-rose-500 hover:border-rose-500 rounded-lg": "text-gray-600 group border-2 px-8 py-3 my-2 flex bg-rose-100 hover:bg-rose-500 hover:border-rose-500 rounded-lg"}
          onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </button>
        </div>
        
      </div>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-10xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6 '>

          <img className='rounded-lg' src= {details.image} alt= "" />
          <form onSubmit={(e) => {
          e.preventDefault();
          saveMeal();
        }}>
          <div className='flex border w-[90px] items-center justify-center rounded-xl bg-rose-200 p-2 mt-2 space-x-1 '>
            <GrSave />

            <button type="submit">Save</button>
          </div>
        </form>
          
        </div>
        <div className='w-full md:w-[75%] lg:w-[40%] lg:ml-10'>

          {activeTab === "instructions" && (
          <div>
            <h3 className='text-sm' dangerouslySetInnerHTML={{__html: details.summary }}></h3>
            <h3 className='text-sm' dangerouslySetInnerHTML={{__html: details.instructions }}></h3>
          </div>

          )}
          {activeTab === "ingredients" && (
            <ul>
            {details.extendedIngredients.map((ingredient) =>
            <li key={ingredient.id}>{ingredient.original}</li>
            )}
          </ul>
          )}
        </div>
        
      </div>
    </div>
  )
}
const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  h2{
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`
const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 2rem;
  font-weight: 600;
`
const Info = styled.div`
  margin-left: 10rem;
`

export default Recipe

{/* <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src= {details.image} alt= "" />
      </div>
      <Info>
        <Button 
        className={activeTab === 'instructions' ? "active": ""} 
        onClick={() => setActiveTab("instructions")}>
          Intructions
        </Button>
        <Button 
        className={activeTab === 'ingredients' ? "active": ""} 
        onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" && (
        <div>
          <h3 dangerouslySetInnerHTML={{__html: details.summary }}></h3>
          <h3 dangerouslySetInnerHTML={{__html: details.instructions }}></h3>
        </div>

        )}
        {activeTab === "ingredients" && (
          <ul>
          {details.extendedIngredients.map((ingredient) =>
          <li key={ingredient.id}>{ingredient.original}</li>
          )}
        </ul>
        )}
        
      </Info>
    </DetailWrapper> */}