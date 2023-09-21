import React, { useState } from 'react';
import Home from './Home';
import { Route, Routes } from 'react-router-dom';
import Cuisine from './Cuisine';
import Searched from './Searched';
import Recipe from './Recipe';
import MealPrep from './MealPrep';
import Text from './Text';
import Signin from './Signin';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import Forget from './Forget';
import PrivateRoute from '../components/PrivateRoute';
import Profile from './Profile';
import TypeMeal from './TypeMeal';

function Pages() {
    const [result, setResult] = useState("");

    return (
        <Routes>
            <Route path="/signin" element = {<Signin />} />
            
            <Route path="/recipe/:name" element={<Recipe />} />
            <Route path="/searched/:search" element={<Searched />} />
            <Route path="/Cuisine/:type" element={<Cuisine />} />
            <Route path="/type/:type" element={<TypeMeal />} />
            <Route path="/mealprep" element={<MealPrep setResult={setResult} />} />
            
            <Route path="/" element={<Home />} />
            <Route path="/text" element={<Text result={result} />} />
            <Route path="/sign-up" element = {<SignUp/>} />
            <Route path="/forget" element = {<Forget/>} />
            <Route path = "/profile" element = {<PrivateRoute />}>
                <Route path = "/profile" element = {<Profile />} />
            </Route>
            
        </Routes>
    );
}

export default Pages;