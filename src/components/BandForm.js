import React, { useEffect } from 'react'
import { useForm } from '../hooks/useForm'

export const BandForm = ({id, onChange, initialState}) => {

    const [formValues, updateFormValues] = useForm(
        initialState 
        ||
        {
            bandName: "",
            bandAlbumName: "",
            votes: 0,
        }
        );

    const handleInputChange = (e) => {
        updateFormValues(e);
        
        onChange(prev => {
            let newData =  [...prev]
            newData[id] = {...formValues};
            return newData;
    })
    }

    useEffect(() => {
        onChange(prevData =>{
            let newData = [...prevData]; 
            newData[id] = {...formValues};
            return newData;
        })
    }, [formValues, onChange, id])

    const {bandName, bandAlbumName} = formValues;

    return (
        <div>
            <form id={`band-${id}`}>
                <div className="mb-3">
                    <label htmlFor="band-name" className="form-label">Nombre de la banda</label>
                    <input
                        onChange={handleInputChange}
                        value={bandName}
                        id="band-name" 
                        name="bandName"
                        type="text" 
                        className="form-control" 
                        aria-describedby="bandNameHelp"
                    />
                    <div id="bandNameHelp" className="form-text">Ingrese el nombre de la banda (por ej. Metallica, Megadeth, etc)</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="band-album-name" className="form-label">Nombre del Album</label>
                    <input
                        onChange={handleInputChange}
                        value={bandAlbumName}
                        id="band-album-name" 
                        name="bandAlbumName"
                        type="text" 
                        className="form-control"
                        aria-describedby="bandAlbumNameHelp"
                    />
                    <div id="bandAlbumNameHelp" className="form-text">Ingrese el nombre del futuro album (por ej. Hypnotize, The Resistance, etc)</div>
                </div>
                {/* TODO: Genero */}
            </form>
        </div>
    )
}
