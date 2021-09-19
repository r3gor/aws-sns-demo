import React, { useContext, useEffect, useState } from 'react'
import { useParams} from 'react-router-dom';
import { isEmpty } from '../../helpers/utils';
import { idByEmail, saveVoter, updateVotes } from '../../helpers/vote';
import { UserContext } from '../../components/userContext';
import { BandCard } from './BandCard';
import { useFetchFirebase } from '../../hooks/useFetchFirebase';

export const VoteScreen = () => {

    const {currentUser} = useContext(UserContext);
    const {voteId} = useParams();

    const [voteDataFetch] = useFetchFirebase(`vote/${voteId}`); 
    const {data: voteData} = voteDataFetch;
    // setVoteId(voteId);

    // const [voteData, setVoteData] = useState({});
    const [voteBandIndex, setVoteBandIndex] = useState(-1);

    // useEffect(() => {
    //     fireDatabase.ref(`vote/${voteId}`)
    //         .on('value', snapshot => {
    //             if (snapshot.exists()){
    //                 const data = snapshot.val();
    //                 setVoteData(data);
    //                 console.log(voteData);
    //             }
    //         })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    useEffect(() => {
        console.log(currentUser);
        if (isEmpty(currentUser)){
            setVoteBandIndex(-1);
            return;
        }
        debugger;
        let index = voteData.voters? voteData.voters[idByEmail(currentUser.email)] : -1;
        if (index === undefined)
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
                        <BandCard key={i} voteId={voteId} band={band} disable={voteBandIndex===-1? false : true} index={i}/>
                    )
                }
            </div>
            
            {
            voteBandIndex!==-1
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