import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../components/userContext';
import { isEmpty } from '../helpers/utils';
import { idByEmail, saveVoter, updateVotes } from '../helpers/vote';

export const useValidationVote = (voteData, voteId) => {
    

    const { currentUser } = useContext(UserContext);
    const [ currentVote, setCurrentVote ] = useState(-1);

    useEffect(() => {

        const notLogedIn = isEmpty(currentUser); 
        // debugger;
        if (notLogedIn || voteData.length === 0) setCurrentVote(-1);

        else {

            const voteIndexBand = voteData.voters && voteData.voters[idByEmail(currentUser.email)];
            const hasVoted = (voteIndexBand !== undefined) && (voteIndexBand !== -1)  
            
            setCurrentVote( hasVoted? voteIndexBand : -1 )
        }
    
    }, [currentUser, voteData])

    const cantVote = () => {

        const notLogedIn = isEmpty(currentUser);
        const hasVoted = currentVote !== -1;
    
        return notLogedIn || hasVoted;

    }

    const vote = (bandIndex) => {

        if (cantVote()) return;

        console.log(`Nuevo voto a ${bandIndex}`)

        updateVotes(bandIndex, voteId, "increment");
        saveVoter(idByEmail(currentUser.email), voteId, bandIndex);
    
    }

    const undoVote = () => {

        const notLogedIn = isEmpty(currentUser);
        const hasVoted = currentVote !== '-1'
        
        if (notLogedIn || !hasVoted) return

        updateVotes(currentVote, voteId, "decrement");
        saveVoter(idByEmail(currentUser.email), voteId, -1);

    } 

    return {currentVote, vote, undoVote, cantVote}
}
