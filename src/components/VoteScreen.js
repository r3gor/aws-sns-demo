import React, { useContext, useEffect, useState } from 'react'
import { useParams} from 'react-router-dom';
import { fireDatabase } from '../firebaseconfig';
import { idByEmail, isEmpty, saveVoter, updateVotes } from '../Utils';
import { BandCard } from './BandCard';
import { UserContext } from './userContext';

export const VoteScreen = () => {

    const {setVoteId, currentUser} = useContext(UserContext);
    const {voteId} = useParams();
    
    setVoteId(voteId);

    const [voteData, setVoteData] = useState({});
    const [voteBandIndex, setVoteBandIndex] = useState(-1);

    useEffect(() => {
        fireDatabase.ref(`vote/${voteId}`)
            .on('value', snapshot => {
                if (snapshot.exists()){
                    const data = snapshot.val();
                    setVoteData(data);
                    console.log(voteData);
                }
            })
    }, []);

    useEffect(() => {
        console.log(currentUser);
        if (isEmpty(currentUser)){
            setVoteBandIndex(-1);
            return;
        }

        let index = voteData.voters? voteData.voters[idByEmail(currentUser.email)] : -1;
        if (index == undefined)
            index = -1;
        setVoteBandIndex(index)
    }, [currentUser, voteData]);

    // const voteBandIndex = () => {
    //     if (isEmpty(currentUser)) return -1;
    //     return voteData.voters? voteData.voters[idByEmail(currentUser.email)] : -1;
    // }

    // useEffect(() => {
    //     if (isEmpty(currentUser))
    //         return;
    //     fireDatabase.ref(`vote/${voteId}/voters/${email.split("@")[0]}`)
    //         .on('value', snapshot => {
    //             if (snapshot.exists()){

    //             }
    //         })

    // }, [currentUser])

    return (
        <>
            <h1>Bandas</h1>
            <div className="card-group">
                {
                    voteData.data?.map((band, i) => 
                        <BandCard key={i} band={band} disable={voteBandIndex==-1? false : true} index={i}/>
                    )
                }
            </div>
            
            {
            voteBandIndex!=-1
            &&
            <div>
                <h3>
                    Usted ha votado por: {voteBandIndex} {voteData.data[voteBandIndex]?.bandName}
                </h3>
                <button 
                    className="btn btn-danger"
                    onClick={(e) => {
                        e.preventDefault();
                        saveVoter(idByEmail(currentUser.email), voteId, -1);
                        updateVotes(voteBandIndex, voteId, "decrement");
                    }}
                > 
                Deshacer voto 
                </button>
            </div>
            }

        </>
    )
}
