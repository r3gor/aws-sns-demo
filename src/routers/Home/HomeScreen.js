import { Link } from 'react-router-dom'
import { useFetchFirebase } from '../../hooks/useFetchFirebase';

export const HomeScreen = () => {

    const [fetchVotes] = useFetchFirebase('vote');

    const { data: votes } = fetchVotes; 

    return (
        <>
            <h1>¡Bienvenido!</h1>
            <br />

                <p> Aquí podrás votar por tu banda favorita para apoyarlos en su proximo lanzamiento. </p>
                <hr />
                <p className="lead">Votaciones </p>

                {
                    fetchVotes.loading?

                    <h4> Loading... </h4>
                    :
                    <div className="col-11 mx-auto">

                        {
                            Object.keys(votes).length === 0
                            &&
                            "No existen votaciones"
                        }
                        <div className="text-center">
                            {
                                Object.keys(votes).map(k => (
                                    <Link key={k}  to={`/vote/${k}`} className="btn d-inline-flex btn-primary m-1"> {votes[k].name} </Link>
                                ))
                            }
                        </div>
                    </div>
                }
        </>
    )
}
