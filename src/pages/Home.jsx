import React from 'react'
import Veggie from "../components/Veggie"
import Popular from '../components/Popular'
import Category from '../components/Category'
import CategoryType from '../components/CategoryType'


export default function Home() {
  return (
    <div className='max-w-7xl mx-auto p-4'>
        <Category />
        <CategoryType />
        <Veggie />
        <Popular />
        
    </div>
  )
}
