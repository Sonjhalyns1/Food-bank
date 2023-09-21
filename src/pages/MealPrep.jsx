import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

export default function MealPrep({ setResult }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Initialize loading as false
    const [heightFeet, setHeightFeet] = useState("");
    const [heightInches, setHeightInches] = useState("");
    const [age, setAge] = useState("");
    const [currentWeight, setCurrentWeight] = useState("");
    const [targetWeight, setTargetWeight] = useState("");
    const [response, setResponse] = useState("");
    const [allergies, setAllergies] = useState("");
    const [numberMeal, setNumberMeal] = useState("");
    const HTTP = "https://chatgpt-server-glyr.onrender.com/chat";

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setLoading(true); // Set loading to true when the request is initiated
        if (loading) {
            return <Spinner />
        }
        const heightInCm = (parseInt(heightFeet) * 30.48 + parseInt(heightInches) * 2.54).toFixed(2);
        const prompt = `        My current weight is 140 lbs, and I want to reach a weight of 180 lbs , 4 meals per day.
        response: 
        Meal 1: Breakfast (7:00 AM)
        Poached eggs in tomatoes or Classic Eggs Benedict
Protein :12-14 grams
Carbs: 20-30 grams
Calories :250-350 calories
        Whole-Grain Toast
        Meal 2: Mid-Morning Snack (10:00 AM)
        Mixed Nuts and a Banana
Protein: 5-7 grams
Carbs: 25-30 grams
Calories: 200-250 calories
        Meal 3: Lunch (1:00 PM)
        Salmon Quinoa Risotto
Protein: 25-30 grams
Carbs:  40-50 grams
Calories: 350-450 calories
        Meal 4: Dinner (7:00 PM)
        Baked Chicken Breasts
Protein: 25-30 grams
Carbs: 0-1
Calories: 200-250 calories
        
Client:
        I am a 34-year-old person with a height of 186 cm. 
        My current weight is 300 lbs, and I want to reach a weight of 200 lbs, 3 meal per day.

response:
        Meal 1: Breakfast (8:00 AM)
        Hard-Boiled Eggs
Protein: 12 grams
Carbs: 1-2 grams
Calories: 140-150 calories
        Meal 2: Lunch (1:00 PM)
Chili Chicken Salad or Beef & Guinness stew
Protein: 20-30 grams
Carbs: 20-30 grams
Calories: 300-400 calories
        Meal 3: Dinner (7:00 PM)
    Garlic Parmesan Baked Hummus
Protein: 5-8 grams
Carbs: 15-20 grams
Calories: 150-200 calories
        Client:
        I am a ${age}-year-old person with a height of ${heightInCm} cm. 
        My current weight is ${currentWeight} lbs, and I want to reach a weight of ${targetWeight} lbs, ${numberMeal} meals per per day.
        response:

        `;

        axios.post(HTTP, { prompt })
            .then((res) => {
                setResponse(res.data);
                setResult(res.data);
                navigate("/text");
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false); // Set loading to false when the request is completed
            });
    };


  return (
    <div className='max-w-7xl mx-auto p-5'>
        <h6 className='text-3xl text-center mt-6 font-weight-bold text-rose-500 mb-9'>Meal Prep</h6>
        <form onSubmit={handleSubmit}>
            <div className='flex space-x-6 justify-start mb-6'>


                <div>
                    <p className='text-lg font-semibold text-rose-400 mt-8'>Height (ft.)</p>

                    <input
                    type='number'
                    id="heightFeet"
                    name='heightFeet'
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(e.target.value)}
                    className='w-full px-4 py-2 text-xl text-gray-700 bg-rose-100 border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-rose-100 focus:text-gray-700 focus:border-slate-600 text-center'
                    required
                    />
                </div>
                <div>
                    <p className='text-lg font-semibold text-rose-400 mt-8'>Height (in.)</p>

                    <input
                    type='number'
                    id="heightInches"
                    name='heightInches'
                    value={heightInches}
                    onChange={(e) => setHeightInches(e.target.value)}
                    className='w-full px-4 py-2 text-xl text-gray-700 bg-rose-100 border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-rose-100 focus:text-gray-700 focus:border-slate-600 text-center'
                    required
                    />
                </div>
            </div>
            <div className='flex space-x-6 justify-start mb-6'>

                <div>
                    <p className='text-lg font-semibold text-rose-400 '>Age</p>
                    <input
                        type='number'
                        id = "age"
                        name='age'
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className= 'w-full px-4 py-2 text-xl text-gray-700 bg-rose-100 border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-rose-100 focus:text-gray-700 focus:border-slate-600 text-center'
                        required
                    
                    
                    />

                </div>
                <div>
                    <p className='  text-lg font-semibold text-rose-400 '>Meals per day</p>
                    <input
                        type='number'
                        id = "numbermeal"
                        name='numbermeal'
                        value={numberMeal}
                        onChange={(e) => setNumberMeal(e.target.value)}
                        className= 'w-full  px-4 py-2 text-xl text-gray-700 bg-rose-100 border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-rose-100 focus:text-gray-700 focus:border-slate-600 text-center'
                        required
                    
                    
                    />

                </div>

            </div>
            <div className='flex space-x-6 justify-start mb-6'>

                <div>
                    <p className='text-lg font-semibold text-rose-400 '>Current Weight (lbs)</p>
                    <input
                        type='number'
                        id = "currentWeight"
                        name='currentWeight'
                        value={currentWeight}
                        onChange={(e) => setCurrentWeight(e.target.value)}
                        className= 'w-full  px-4 py-2 text-xl text-gray-700 bg-rose-100 border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-rose-100 focus:text-gray-700 focus:border-slate-600 text-center'
                        required
                    
                    
                    />

                </div>
                <div>
                    <p className='text-lg font-semibold text-rose-400 '>Target Weight (lbs)</p>
                    <input
                        type='number'
                        id = "targetWeight"
                        name='targetWeight'
                        value={targetWeight}
                        onChange={(e) => setTargetWeight(e.target.value)}
                        className= 'w-full  mb-6 px-4 py-2 text-xl text-gray-700 bg-rose-100 border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-rose-100 focus:text-gray-700 focus:border-slate-600 text-center'
                        required
                    
                    
                    />
                    

                </div>
            </div>
            <div>
            <p className='text-lg font-semibold text-rose-400 '>Allergies</p>
            <select onChange={(e) => setAllergies(e.target.value)} className=' mb-8 px-4 py-2 text-xl text-gray-700 bg-rose-100 border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-rose-100 focus:text-gray-700 focus:border-slate-600 text-center'>
                    <option value= "no">none</option>
                    <option value= "Peanut">peanut</option>
                    <option value= "Dairy">Dairy</option>
                    <option value= "Dairy">Shellfish</option>
                    <option value= "Tree Nut">Tree Nut</option>
                    <option value= "Soy">Soy</option>
                </select>
            </div>
            <button type = "submit" className='mb-6 w-full px-7 py-3 bg-rose-500 text-white font-medium text-lg uppercase rounded shadow-md hover:bg-rose-600 hover:shadow-lg focus:bg-rose-600 focus:shadow-lg active:bg-rose-800 active:shadow-lg transition duration-150 ease-in-out'>
                Prepare
            </button>
            
            

        </form>
        {loading && <Spinner />}
        
        
        

    </div>
  )
}
