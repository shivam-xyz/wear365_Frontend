import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Profile from '../../component/customer_component/Profile'
import { context } from '../../GlobalContexts/GlobalContext';
import LogInPage from './LogInPage'

const ProfilePage = () => {
  const navigate = useNavigate();
  const { userProfile, dispatch, getUserProfile } = useContext(context);
  console.log('User Profile', userProfile);
  useEffect(() => {
    getUserProfile()
  }, [userProfile.length])
  console.log(userProfile)
  return (
    <>
      <Profile userProfile={userProfile} />
    </>
  )
}

export default ProfilePage