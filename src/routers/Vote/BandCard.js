import React from 'react'

export const BandCard = ({ band, index, disable, onVote }) => {

    const { bandName, bandAlbumName, votes } = band;

    const handleVotar = async (e) => {
        onVote(index);
    }

    return (
        <>
        <div className="card">
            <img className="card-img-top" src="https://garajedelrock.com/wp-content/uploads/2020/08/muse-1536x805.jpg" alt="Music Band" />
            <div className="card-body">
                <h5 className="card-title">{ bandName }</h5>
                <h6>Votos: { votes }</h6>
                <p className="card-text">Con el album: {bandAlbumName}</p>
                <button 
                    className={" btn btn-primary " + (disable? " disabled " : "")} 
                    onClick={handleVotar}
                >
                    Votar
                </button>
            </div>
        </div>
        </>
    )
}
