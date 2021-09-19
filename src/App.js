import React, { useState } from 'react'
import { UserContext } from './components/userContext';
import { AppRouter } from './routers/AppRouter'

export const App = () => {

  const [currentUser, setCurrentUser] = useState({});
  const [voteId, setVoteId] = useState("");

  return (
    
    <UserContext.Provider value={{
      currentUser,
      setCurrentUser,
      voteId,
      setVoteId,
    }}>

      <AppRouter />

    </UserContext.Provider>
  )
}