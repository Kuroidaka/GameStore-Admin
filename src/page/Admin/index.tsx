import { Routes, Route, useNavigate } from 'react-router-dom'
import config from '~/config'
import Home from '~/page/Admin/Home/Home'
import Login from '~/page/Admin/Login/Login'
import Register from '~/page/Admin/Register/Register'
import HeaderSideBar from '~/layout/admin/HeaderSideBar'
import Profile from '~/page/Admin/Profile/Profile'
import AddUser from '~/page/Admin/ManageUser/ManageUser'
import ManageTeam from '~/page/Admin/ManageTeam/ManageTeam'
import ContactInfo from '~/page/Admin/ContactInfo/ContactInfo'
import { useAppSelector } from '~/hook'
import { selectLoggedIn, selectUser } from './auth.slice'
import { Fragment, useEffect } from 'react'

const AdminRoutes = () => {
    const currentUser = useAppSelector(selectUser)
    const LoggedIn = useAppSelector(selectLoggedIn)
    const navigate = useNavigate()

    useEffect(() => {
        if(!LoggedIn) {
            navigate(config.adminRoutePath.login)
        }
    }, [LoggedIn])

    return ( 
        <Routes>

            <Route path={config.adminRoutePath.login} element={<Login />}/>
            <Route path={config.adminRoutePath.register} element={<Register />}/>
        {currentUser && 
            <Fragment>
                <Route path={config.adminRoutePath.home} element={<HeaderSideBar><Home /></HeaderSideBar>}/>
                <Route path={config.adminRoutePath.profile} element={<HeaderSideBar><Profile /></HeaderSideBar>}/>
                <Route path={config.adminRoutePath.addUser} element={<HeaderSideBar><AddUser /></HeaderSideBar>}/>
                <Route path={config.adminRoutePath.manageTeam} element={<HeaderSideBar><ManageTeam /></HeaderSideBar>}/>
                <Route path={config.adminRoutePath.userContact} element={<HeaderSideBar><ContactInfo /></HeaderSideBar>}/>
            </Fragment>
            }
        </Routes>
    )

}
 
export default AdminRoutes;