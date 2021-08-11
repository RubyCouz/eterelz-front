import BackOfficePage from '../pages/BackOffice'
import HomePage from '../pages/Home'
import EventsPage from '../pages/Events'
import AuthPage from '../pages/Auth'
import AccountPage from '../pages/Account/Account'
import DashboardPage from '../pages/Dashboard'
import TournamentsPage from '../pages/Tournaments'
import ClanPage from '../pages/Clan'


const dataRouteur = [
    { type : 'redirect',    auth : true,    from : '/',     to : '/dashboard' },
    { type : 'redirect',    auth : true,    from : '/auth', to : '/dashboard' }, 
    { type : 'redirect',    auth : true,    from : '/home', to : '/dashboard' },
    { type : 'route',       auth : true,    path : '/account',      component : AccountPage },
    { type : 'route',       auth : true,    path : '/tournaments',  component : TournamentsPage },
    { type : 'route',       auth : true,    path : '/dashboard',    component : DashboardPage },
    { type : 'route',       auth : true,    path : '/events',       component : EventsPage },
    { type : 'route',       auth : true,    path : '/clan',         component : ClanPage },
    { type : 'redirect',    auth : false,   from : '/',     to : '/home'},
    { type : 'redirect',    auth : true,    from : '/clan', to : '/auth'},
    { type : 'route',       auth : false,   path : '/auth',         component : AuthPage},
    { type : 'route',       auth : true,    path : '/backOffice',   component : BackOfficePage, role : 'admin', },
    { type : 'route',       auth : false,   path : '/home',         component : HomePage },
]

export default dataRouteur