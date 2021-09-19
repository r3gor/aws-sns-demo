import React from 'react'
import { isNumeric } from '../../helpers/utils.js';

export const InputQuantity = ({ onChange, name }) => {

    const handleInputChange = (e) => {
        
        const value = e.target.value;

        if ( isNumeric(value) ) {
            onChange( parseInt(value) );
        } else {
            e.target.value = '';
            onChange(0)
        }
    };

    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="vote-bands-quantity">Cantidad de Bandas</span>
                <input
                    type="number" min="0" step="1"
                    className="form-control"
                    placeholder="Escriba un numero"
                    aria-label="BandsQuantity"
                    aria-describedby="vote-bands-quantity"
                    onChange={handleInputChange}
                />
            </div>
        </>
    )
}
