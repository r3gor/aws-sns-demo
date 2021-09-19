import React, { useReducer } from 'react'
import { createVote } from '../../helpers/vote';
import { BandFormGroup } from './BandFormGroup';
import { InputQuantity } from './InputQuantity'
import { voteDataReducer } from './VoteDataReducer';

export const VoteForm = () => {

    const [stateVoteData, dispatch] = useReducer(voteDataReducer, {
        voteName: '',
        bandsQuantity: 0,
        bandsData: [],
    });

    const handleVoteNameChange = (e) => {
        dispatch({
            type: 'setVoteName',
            payload: e.target.value,
        })
    }

    const handleBandsQuantityChange = (qty) => {
        dispatch({
            type: 'setBandsQuantity',
            payload: qty,            
        })
    }

    const handleBandDataChange = (index, field, value) => {
        dispatch({
            type: 'setBandData',
            payload: {index, field, value},            
        })
    }

    const handleSubmit = (e) => {
        const {voteName, bandsData, bandsQuantity} = stateVoteData;
        createVote(voteName, bandsData, bandsQuantity);
    }

    return (
        <div className="col-lg-6 offset-lg-3">
            <h6 className="lead mt-3 mb-4">Nombre de la votación </h6>
            <div className="form-group mb-3">
                <input
                    name='voteName'
                    className="form-control"
                    placeholder="Escriba un nombre"
                    aria-label="Votaciones de Diciembre 2022"
                    onChange={handleVoteNameChange}
                />
            </div>

            <hr />

            <h3 className='lead mt-3 mb-4'>Información de las bandas </h3>

            <InputQuantity 
                name='bandsQuantity'
                onChange={handleBandsQuantityChange}
            />

            <BandFormGroup 
                name='bandsData'
                bandsQuantity={stateVoteData.bandsQuantity} 
                bandsData={stateVoteData.bandsData} 
                onChange={handleBandDataChange}
            />

            {
            (stateVoteData.bandsQuantity !== 0)
            && 
            <button type="submit" className="btn btn-primary text-center" onClick={handleSubmit}>Crear Votación</button>
            }
        </div>
    )
}
