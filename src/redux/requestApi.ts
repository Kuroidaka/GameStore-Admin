import { RootState } from './store';
import { login } from "../page/Admin/auth.slice";
import { AppDispatch } from "./store";
import { NavigateFunction } from 'react-router-dom';

import { User } from '~/model/User.model'

export const ReduxLogin = (dispatch: AppDispatch, data: User, navigate: NavigateFunction) => {
    try {
        // dispatch(login(data))

        navigate('/admin/dashboard')
    } catch (error) {
        console.log(error);
        
    }
   

}