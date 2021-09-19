import { useParams} from 'react-router-dom';
import { BandCard } from './BandCard';
import { useFetchFirebase } from '../../hooks/useFetchFirebase';
import { useValidationVote } from '../../hooks/useValidationVote';

export const VoteScreen = () => {

    const {voteId} = useParams();
    const voteDataFetch = useFetchFirebase(`vote/${voteId}`); 
    const {data: voteData} = voteDataFetch;
    const {currentVote, vote, undoVote, cantVote} = useValidationVote(voteData, voteId);
    
    const handleUndoVote = () => {
        undoVote();
    }

    const handleVote = (bandIndex) => {
        vote(bandIndex);
    }

    if (voteDataFetch.loading)
        return <h4>Loading ...</h4>

    return (
        <>
            <h1>Bandas</h1>

            <div className="card-group">
                {
                    voteData.data?.map((band, i) => 
                        <BandCard 
                            key={i} voteId={voteId} index={i}
                            band={band} onVote={handleVote} 
                            disable={cantVote()? true : false}
                        />
                    )
                }
            </div>
            
            {
            currentVote!==-1
            &&
            <div>
                <h3>
                    Usted ha votado por: {voteData.data[currentVote]?.bandName}
                </h3>
                <button 
                    className="btn btn-danger"
                    onClick={handleUndoVote}
                > 
                Deshacer voto 
                </button>
            </div>
            }

        </>
    )
}