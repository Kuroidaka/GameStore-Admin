import { Routes, Route } from 'react-router-dom'
import config from '~/config'
import Home from '~/page/Admin/Home/Home'
import Login from '~/page/Admin/Login/Login'
import Register from '~/page/Admin/Register/Register'
import HeaderSideBar from '~/layout/admin/HeaderSideBar'
import Profile from '~/page/Admin/Profile/Profile'
import AddUser from '~/page/Admin/ManageUser/ManageUser'
import ManageTeam from '~/page/Admin/ManageTeam/ManageTeam'
import ContactInfo from '~/page/Admin/ContactInfo/ContactInfo'

const AdminRoutes = () => {
    return ( 
        <Routes>
            <Route path={config.adminRoutePath.login} element={<Login />}/>
            <Route path={config.adminRoutePath.register} element={<Register />}/>
            <Route path={config.adminRoutePath.home} element={<HeaderSideBar><Home /></HeaderSideBar>}/>
            <Route path={config.adminRoutePath.profile} element={<HeaderSideBar><Profile /></HeaderSideBar>}/>
            <Route path={config.adminRoutePath.addUser} element={<HeaderSideBar><AddUser /></HeaderSideBar>}/>
            <Route path={config.adminRoutePath.manageTeam} element={<HeaderSideBar><ManageTeam /></HeaderSideBar>}/>
            <Route path={config.adminRoutePath.userContact} element={<HeaderSideBar><ContactInfo /></HeaderSideBar>}/>
        </Routes>
    );
}
 
export default AdminRoutes;