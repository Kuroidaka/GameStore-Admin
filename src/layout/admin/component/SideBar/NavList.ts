import { AiOutlineHome, AiOutlineTeam, AiOutlineUserAdd } from 'react-icons/ai'
import { RiContactsBookLine } from 'react-icons/ri'
import config from '~/config'

export const NavList = [
    {
        id: 0,
        title: 'Dashboard',
        Icon: AiOutlineHome,
        route: config.adminRoutePath.home
    },
    {
        id: 1,
        title: 'Manage Team',
        Icon: AiOutlineTeam,
        route: config.adminRoutePath.manageTeam
    },
    {
        id: 2,
        title: 'Contacts information',
        Icon: RiContactsBookLine,
        route: config.adminRoutePath.userContact
    },
    {
        id: 3,
        title: 'Manage User',
        Icon: AiOutlineTeam,
        route: config.adminRoutePath.addUser
    },

    
]