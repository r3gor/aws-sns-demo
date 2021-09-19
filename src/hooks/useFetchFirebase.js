import { useEffect, useState } from "react";
import { fireDatabase } from "../firebaseconfig";

export const useFetchFirebase = (ref) => {

    const [state, setState] = useState({
        data: [], 
        loading: true,
    })

    useEffect(() => {

        const voteRef = fireDatabase.ref(ref);

        voteRef.on('value', (snapshot) => {
            if (snapshot.exists()){
                const data = snapshot.val();
                setState({
                    data, loading: false, 
                });
            }
        })

        return () => {
            voteRef.off()
        };

    }, [ref])

    return [state]
}
