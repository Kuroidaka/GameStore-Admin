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
    {
        id: 4,
        title: 'Manage Product',
        Icon: AiOutlineTeam,
        route: config.adminRoutePath.products
    },
    {
        id: 5,
        title: 'Manage Product Group',
        Icon: AiOutlineTeam,
        route: config.adminRoutePath.productsGroup
    },
    {
        id: 6,
        title: 'Manage Costumer',
        Icon: AiOutlineTeam,
        route: config.adminRoutePath.customer
    },
    {
        id: 7,
        title: 'Manage Cart',
        Icon: AiOutlineTeam,
        route: config.adminRoutePath.cart
    },
]