import React, { useState } from 'react'
import { fireDatabase } from '../firebaseconfig';
import { BandForm } from './BandForm';
import { InputQuantity } from './InputQuantity'

export const AdminScreen = () => {

    const [bandsQuantity, setBandsQuantity] = useState(0);
    const [voteName, setVoteName] = useState("")
    const [bandsData, setbandsData] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const voteData = bandsData.slice(0, bandsQuantity);
        console.log("send to firebase: ");
        console.log(voteData);
        var newItemRef = fireDatabase.ref('vote').push();
        newItemRef.set({
            name: voteName,
            data: { ...voteData },
        });

    }

    console.log("AdminScreen")

    return (
        <>
            <h1>Nueva Votación</h1>
            <hr />

            <h6>Nombre: </h6>
            <div className="form-group mb-3">
                <input
                    className="form-control"
                    placeholder="Escriba un nombre"
                    aria-label="VoteName"
                    onChange={(e) => setVoteName(e.target.value)}
                />
            </div>

            <h6>Información de las bandas: </h6>

            <InputQuantity onChange={(q) => setBandsQuantity(parseInt(q))} />

            {
                (bandsQuantity != 0)
                &&
                <div>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        {
                            [...Array(bandsQuantity).keys()].map(i =>
                                <li key={i} className="nav-item" role="presentation">
                                    <button
                                        className={i === 0 ? "nav-link active" : "nav-link"}
                                        id={`nav-${i}-tab`}
                                        data-bs-toggle="tab"
                                        data-bs-target={`#nav-${i}`}
                                        type="button"
                                        role="tab"
                                        aria-controls={`nav-${i}`}
                                        aria-selected="false"
                                    >
                                        {`Banda ${i + 1}`}
                                    </button>
                                </li>
                            )
                        }
                    </ul>

                    <div className="tab-content" id="myTabContent">
                        {
                            [...Array(bandsQuantity).keys()].map(i =>
                                <div
                                    key={i}
                                    className={i === 0 ? "tab-pane fade show active" : "tab-pane fade"}
                                    id={`nav-${i}`}
                                    role="tabpanel"
                                    aria-labelledby={`nav-${i}-tab`}
                                >
                                    <BandForm key={i} id={i} onChange={setbandsData} initialState={bandsData[`${i}`]} />
                                </div>
                            )
                        }
                    </div>
                    <button type="submit" className="btn btn-primary text-center" onClick={handleSubmit}>Crear Votación</button>
                </div>
            }

        </>
    )
}
