import React, { useContext } from 'react'
import { isEmpty } from '../../helpers/utils';
import { idByEmail, saveVoter, updateVotes } from '../../helpers/vote';
import { UserContext } from '../../components/userContext';

export const BandCard = ({ band, index, disable, voteId }) => {

    const {currentUser} = useContext(UserContext);

    const { bandName, bandAlbumName, votes } = band;

    // const [validVote, setValidVote] = useState(false);

    const handleVotar = async (e) => {
        e.preventDefault()
        console.log(`Nuevo voto a ${bandName} (band #${index})`)
        updateVotes(index, voteId, "increment");
        saveVoter(idByEmail(currentUser.email), voteId, index);
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
