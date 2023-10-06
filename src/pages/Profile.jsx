import { getAuth, updateProfile } from 'firebase/auth'
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { toast } from 'react-toastify'
import { styled } from 'styled-components'
import Moment from 'react-moment'
import MealsItem from '../components/MealsItem'

export default function Profile() {
    const auth = getAuth()
    const navigate = useNavigate()
    const [changeDetail, setChangedDetail] = useState(false)
    const [loading, setLoading] = useState(true);
    const [meals, setMeals] = useState(false)
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    });
    const {name, email} = formData;
    const [savedMeals, setSavedMeals] = useState([]);

    useEffect(() => {
      // Function to fetch saved meals
      const fetchSavedMeals = async () => {
        try {
          const mealsQuery = query(
            collection(db, 'meals'),
            where('uid', '==', auth.currentUser.uid)
          );
          const querySnapshot = await getDocs(mealsQuery);
  
          const mealsData = [];
          querySnapshot.forEach((doc) => {
            const meal = doc.data();
            mealsData.push(meal);
          });
  
          setSavedMeals(mealsData);
        } catch (error) {
          console.error('Error fetching saved meals:', error);
          toast.error('Error fetching saved meals. Please try again later.');
        }
      };
  
      fetchSavedMeals(); // Fetch saved meals when the component mounts
    }, [auth.currentUser.uid]);
    useEffect(() => {
        async function fetchUserMeals(){
            const mealsRef = collection(db, "meals");
            const q = query(mealsRef, where("uid", "==", auth.currentUser.uid), orderBy("timestamp", "desc"))
            const querySnap  = await getDocs(q)
            let meals = [];
            querySnap.forEach((doc) => {
                return meals.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            setMeals(meals)

        }
        fetchUserMeals()

    },[])
    function onLogout(){
        auth.signOut()
        navigate("/")
    }
    function onChange(e){
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }
    async function onSubmit(){
        try {
            console.log(savedMeals)
            if(auth.currentUser.displayName !== name) {
                await updateProfile(auth.currentUser, {displayName: name,
                })
                const docRef = doc(db, "users", auth.currentUser.uid)
                await updateDoc(docRef, {
                    name,
                })
                toast.success("Profile has been updated")
            }
            
        } catch (error) {
            toast.error("Could not update the profile detail")
        }
        
    }
    // const onDelete = async (mealID) => {
    //     if (window.confirm('Are you sure you want to remove this saved item?')) {
    //       try {
    //         await deleteDoc(doc(db, 'meals', mealID));
    //         const updatedMeals = savedMeals.filter((meal) => meal.id !== mealID);
    //         setSavedMeals(updatedMeals);
    //         toast.success('Item removed');
    //       } catch (error) {
    //         console.error('Error deleting item:', error);
    //         toast.error('Error deleting item. Please try again later.');
    //       }
    //     }
    //   };
    //   const handleDelete = async (meal) => {
    //     console.log("Meal:", meal.name);
    //     await deleteDoc(doc(db, "meals", meal.name))
    //   }

    async function onDelete(mealID){
        if(window.confirm("Are you sure you want to delete your posting?")){
            await deleteDoc(doc(db, "meals", mealID))
            const updatedListings = meals.filter(
              (meal) => meal.id !== mealID
            )
            setMeals(updatedListings)
            toast.success("meal deleted")
    }
}
  return (
    <>
    
        <section className='max-w-8xl mx-auto flex justify-center items-center flex-col'>
        <h1 className = "text-3xl text-center mt-6 font-bold text-rose-500" > My Profile </h1>
        <div className='w-full md:w-[50%] mt-6 px-3'>
          <form>
            {/* name Input */}
            <input 
            type="text" 
            id = "name" 
            value = {name} 
            disabled = {!changeDetail} 
            onChange= {onChange}  
            className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${changeDetail && "bg-red-200 focus:bg-red-200"}`}/> 
            {/*email imput */}
            <input type="email" id = "email" value = {email} disabled className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out '/> 
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='flex items-center mb-6'> Do you want to change you name?
                <span onClick={() => { changeDetail && onSubmit() 
                  setChangedDetail((prevState) => !prevState)}} 
                  className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer' >{changeDetail ? "Apply change" : "Edit"}</span>
              </p>
              <p onClick = {onLogout}  className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer'> Sign out</p>

            </div>

          </form>
          {meals.length > 0 && (
            <>
            <h6 className='text-2xl text-rose-400 text-center font-semibold '>Saved Meals</h6>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3  '>
                {meals.map((meal) =>(
                    <MealsItem 
                    key = {meals.id}
                    id = {meal.id}
                    onDelete = {() => onDelete(meal.id)}
                    meal = {meal.data}
                    
                    
                    />
                ))}
            </ul>

            
            
            </>
          )}
          
        </div>
      </section>
    </>
  )
}
const MealGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const MealCard = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

// useEffect(() => {
//  
//     const fetchSavedMeals = async () => {
//       try {
//         const mealsQuery = query(
//           collection(db, 'meals'),
//           where('uid', '==', auth.currentUser.uid)
//         );
//         const querySnapshot = await getDocs(mealsQuery);

//         const mealsData = [];
//         querySnapshot.forEach((doc) => {
//           const meal = doc.data();
//           mealsData.push(meal);
//         });

//         setSavedMeals(mealsData);
//       } catch (error) {
//         console.error('Error fetching saved meals:', error);
//         toast.error('Error fetching saved meals. Please try again later.');
//       }
//     };

//     fetchSavedMeals(); // Fetch saved meals when the component mounts
//   }, [auth.currentUser.uid])
