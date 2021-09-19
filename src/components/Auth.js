import { useContext } from 'react';
import { googleLogin} from '../helpers/googleLogin';
import { isEmpty } from '../helpers/utils';
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
        <div className="d-flex me-5">
            {
                isEmpty(currentUser) ?
                    <button className="btn btn-primary" onClick={handleLogin}> Inicia Sesión </button>
                    :
                    <div className="btn-group">
                        <button className="btn btn-outline-success disabled"> {currentUser.email} </button>
                        <button className="btn btn-primary" onClick={handleLogout}> Cerrar Sesión </button>
                    </div>
            }
        </div>
    )
}
