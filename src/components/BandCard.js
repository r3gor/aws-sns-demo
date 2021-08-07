import React, { useContext, useEffect, useState } from 'react'
import { fireDatabase } from '../firebaseconfig';
import { idByEmail, isEmpty, saveVoter, updateVotes, validateVote } from '../Utils';
import { UserContext } from './userContext';

export const BandCard = ({ band, index, disable }) => {

    const {currentUser, voteId} = useContext(UserContext);

    const { bandName, bandAlbumName, votes } = band;

    const [validVote, setValidVote] = useState(false);

    // useEffect(() => {
    //     setValidVote(validateVote(currentUser?.email, voteId))
    // }, [])

    const handleVotar = async (e) => {
        e.preventDefault()
        console.log(`Nuevo voto a ${bandName} (band #${index})`)
        updateVotes(index, voteId, "increment");
        saveVoter(idByEmail(currentUser.email), voteId, index);
        
        // if (validateVote(currentUser.email, voteId)){
        //     saveVoter(currentUser.email, voteId, index);
        //     setValidVote(validateVote(currentUser?.email, voteId))
        // }
    }

    return (
        <>
        <div className="card">
            <img className="card-img-top" src="https://garajedelrock.com/wp-content/uploads/2020/08/muse-1536x805.jpg" alt="Music Band" />
            <div className="card-body">
                <h5 className="card-title">{ bandName }</h5>
                <h6>Votos: { votes }</h6>
                <p className="card-text">Con el album: {bandAlbumName}</p>
                <button className={" btn btn-primary " + ((isEmpty(currentUser) || disable)? " disabled " : "")} onClick={handleVotar}>Votar</button>
            </div>
        </div>
        </>
    )
}
