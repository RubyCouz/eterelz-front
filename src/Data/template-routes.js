import BackOffice from '../pages/BackOffice'
import HomePage from '../pages/Home'
import EventsPage from '../pages/Events'
import AuthPage from '../pages/Auth'
import AccountPage from '../pages/Account/Account'
import Dashboard from '../pages/Dashboard'
import Tournaments from '../pages/Tournaments'
import Clan from '../pages/Clan'


const routes = [
    { type : "redirect",    auth : true,    from : "/",     to : "/dashboard" },
    { type : "redirect",    auth : true,    from : "/auth", to : "/dashboard" }, 
    { type : "redirect",    auth : true,    from : "/home", to : "/dashboard" },
    { type : "route",       auth : true,    path : "/account",      component : AccountPage },
    { type : "route",       auth : true,    path : "/tournaments",  component : Tournaments },
    { type : "route",       auth : true,    path : "/dashboard",    component : Dashboard },
    { type : "route",       auth : true,    path : "/events",       component : EventsPage },
    { type : "route",       auth : true,    path : "/clan",         component : Clan },
    { type : "redirect",    auth : false,   from : "/",     to : "/home"},
    { type : "redirect",    auth : true,    from : "/clan", to : "/auth"},
    { type : "route",       auth : false,   path : "/auth",         component : AuthPage},
    { type : "route",       auth : true,    path : "/backOffice",   component : BackOffice, role : "admin", },
    { type : "route",       auth : false,   path : "/home",         component : HomePage },
]

export default routes