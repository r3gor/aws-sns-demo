import { useContext } from 'react';
import { googleLogin, isEmpty } from '../Utils';
import { UserContext } from './userContext';

export const Auth = () => {

    const {currentUser, setCurrentUser} = useContext(UserContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        googleLogin(setCurrentUser);
    }

    const handleLogout = (e) => {
        e.preventDefault();
        setCurrentUser({});
    }

    return (
        <>
            {
                isEmpty(currentUser) ?
                    <button className="btn btn-primary" onClick={handleLogin}> Inicia Sesión </button>
                    :
                    <div>
                        <button className="btn btn-success"> {currentUser.email} </button>
                        <button className="btn btn-primary" onClick={handleLogout}> Cerrar Sesión </button>
                    </div>
            }
        </>
    )
}
