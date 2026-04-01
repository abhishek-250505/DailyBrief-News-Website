import React from 'react'
import TrendingSection from '../component/TrendingSection'
import Category from './Category'
import News from './News'
import Footer from './Footer'
import { useNewsContext } from '../context/NewsContext'

const Home = () => {
  const { currentCategory } = useNewsContext();

  return (
    <div>
        {(currentCategory === 'general' || currentCategory === 'world') && <TrendingSection />}
        <Category/>
        <News/>
        <Footer/>
    </div>
  )
}

export default Home