import { Routes, Route } from 'react-router-dom'
import config from '~/config'

import { Fragment } from 'react'
import Home from './Home/Home'
import HeaderOnly from '~/layout/user/HeaderOnly/HeaderOnly'

const UserRoutes = () => {


    return ( 
        <Routes>

            <Route path={config.routePath.home} element={<HeaderOnly><Home /></HeaderOnly>}/>
            {/* <Route path={config.adminRoutePath.register} element={<Register />}/>
            <Fragment>
                
                <Route path={config.adminRoutePath.home} element={<HeaderSideBar><Home /></HeaderSideBar>}/>
                <Route path={config.adminRoutePath.profile} element={<HeaderSideBar><Profile /></HeaderSideBar>}/>
            </Fragment> */}

        </Routes>
    )

}
 
export default UserRoutes;