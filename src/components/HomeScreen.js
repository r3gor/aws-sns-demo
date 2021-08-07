import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fireDatabase } from '../firebaseconfig';

export const HomeScreen = () => {

    const [votes, setVotes] = useState({});

    useEffect(() => {
        fireDatabase.ref('vote').on('value', (snapshot) => {
            if (snapshot.exists()){
                const data = snapshot.val();
                console.log(data);
                setVotes(data);
            }
        })
    }, [])
    
    return (
        <>
            <h1>¡Bienvenido!</h1>
            <br />
            <p>
                ¡Hola!
                <br />
                Aquí podrás votar por tu banda favorita para apoyarlos en su proximo lanzamiento.
            </p>

            <p className="lead">Votaciones: </p>

            {
                Object.keys(votes).length == 0
                &&
                "No existen votaciones"
            }
            <ul className="list-group">
                {
                    Object.keys(votes).map(k => (
                        <Link key={k} className="btn btn-primary m-1" to={`/vote/${k}`}> Votacion {votes[k].name} </Link>
                    ))
                }
            </ul>
        </>
    )
}
