import axios from 'axios'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import Header from '../../component/customer_component/Header'
import VendorCard from '../../component/customer_component/VendorCard'
import { context } from '../../GlobalContexts/GlobalContext'

const HomePage = () => {
  const {userProfile,getUserProfile} = useContext(context)
  useEffect(()=>{
    getUserProfile()
  },[])
  return (
    <>
      <Header/>
      <VendorCard/>
    </>
  )
}

export default HomePage