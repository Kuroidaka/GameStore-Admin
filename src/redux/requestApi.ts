import { RootState } from './store';
import { currentUserType, login } from "./auth.slice";
import { AppDispatch } from "./store";
import { NavigateFunction } from 'react-router-dom';


export const ReduxLogin = (dispatch: AppDispatch, data: currentUserType, navigate: NavigateFunction) => {
    try {
        dispatch(login(data))

        navigate('/admin/dashboard')
    } catch (error) {
        console.log(error);
        
    }
   

}