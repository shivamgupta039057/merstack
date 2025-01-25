import { useContext } from 'react';
import { MyContext } from '../context/Main.Context';

const useMyProvider = () => {
    const { usercredentials, setUserCredentials } = useContext(MyContext);
    console.log("wwwwwwwwwwwwwwwwwwwwwww" , usercredentials);
    

    return {
        usercredentials,
        setUserCredentials
    };
};

export default useMyProvider;
