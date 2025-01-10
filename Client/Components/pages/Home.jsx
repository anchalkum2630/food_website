import React from 'react'
import Head from '../Head'
import Delivery from '../Delivery'
import FoodSlider from '../FoodSlider'
import FeedBack from '../FeedBack'
import {useViewContext } from '../Context/Context_view'

const Home = () => {

  const {UserName}=useViewContext();

  return (
    <div>
      <Head/>
      <Delivery/>
      {UserName ? <FoodSlider /> : null}
      <FeedBack/>
    </div>
  )
}

export default Home


