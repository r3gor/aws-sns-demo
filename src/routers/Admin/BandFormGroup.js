import React, { useEffect, useRef } from 'react'
import { BandForm } from './BandForm'

export const BandFormGroup = ({bandsQuantity, bandsData, onChange}) => {
    
    const fixActiveNav = () => {
        /** Cuando el usuario clickea una pestaña nro. X y luego cambia la cantidad de bandas
         * a un valor menor X la pestaña 'activa' se pierde, esta función corrige eso, haciendo
         * que al ocurrir dicho evento se seleccione la última pestaña visible para que esta
         * se ponga como 'activa'.  
         */
        if (bandsQuantity === 0) return;
        
        const navButtons = Array.from(groupForm.current.querySelector('.nav').children);
        
        const activeBandFormIndex = navButtons.findIndex(
            el => el.querySelector('button').className.includes('active')
            );
            
            const existActiveBandForm = activeBandFormIndex !== -1
            
            if ( !existActiveBandForm ){
                const lastBandFormButton = navButtons.slice(-1)[0];
                lastBandFormButton.querySelector('button').click();
            }
    } 
        
    const groupForm = useRef();
    
    useEffect(() => { // Luego de cada renderizado ejecutamos la función.
        fixActiveNav();
    })

    if (bandsQuantity === 0)
        return (
            <p>
                <button className='btn btn-sm btn-outline-warning'> 
                Ingrese una cantidad de bandas mayor a cero. 
                </button>
            </p>
        )

    return (
        <div ref={groupForm}>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                {
                    bandsData.slice(0, bandsQuantity).map((_, i) =>
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
                    bandsData.map((data, i) =>
                        <div
                            key={i}
                            className={i === 0 ? "tab-pane fade show active" : "tab-pane fade"}
                            id={`nav-${i}`}
                            role="tabpanel"
                            aria-labelledby={`nav-${i}-tab`}
                        >
                            <BandForm 
                                key={i} id={i} 
                                onChange={onChange} 
                                bandData={data}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
}
