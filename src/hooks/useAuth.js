import { useState } from 'react';


export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState({});

    const reset = () => {
        setValues(initialState);
    }

    const handleInputChange = ({ target }) => {

        setValues({
            ...values,
            [target.name]: target.value
        });

    }

    return [values, handleInputChange, reset];

}