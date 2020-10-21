import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../views/Login';
import DashBoard from '../views/DashBoard';
import ManageUsers from '../views/ManageUsers';
import ManageAgents from '../views/ManageAgents';
import FleetTypes from '../views/FleetTypes';
import FleetRegister from '../views/FleetRegister';
import TripLocations from '../views/TripLocations';
import TripRoutes from '../views/TripRoutes';
import TripAssignments from '../views/TripAssignments';
import TripFares from '../views/TripFares';
import TripTicket from '../views/TripTicket';
import Settings from '../views/Settings';
import Store from '../store';
import Container from '../components/Container';


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login,
        beforeRouteEnter(to, from, next){
            if(Store.getters.GET_IS_LOGIN){
                return next();
            } else{
                return next("login");
            }
        }
    },
    {
        path: '/',
        component: Container,
        beforeEach(to, from, next){
            if(Store.getters.GET_IS_LOGIN){
                return next(to);
            }else{
                next("/login");
            }
        },
        children: [
            {
                path: '',
                redirect: 'dashboard',
            },
            {
                path: 'dashboard',
                name: 'dashboard',
                component: DashBoard
            },
            {
                path: 'users',
                name: 'users',
                component: ManageUsers
        
            },
            {
                path: 'agents',
                name: 'agents',
                component: ManageAgents
            },
            {
                path: 'fleets/types',
                name: 'fleet-types',
                component: FleetTypes,
            },
            {
                path: 'fleets/register',
                name: 'fleet-register',
                component: FleetRegister,
            },
            {
                path: 'trips/locations',
                name: 'trip-locations',
                component: TripLocations,
            },
            {
                path: 'trips/routes',
                name: 'trip-routes',
                component: TripRoutes,
            },
            {
                path: 'trips/assignments',
                name: 'trip-assigned',
                component: TripAssignments,
            },
            {
                path: 'trips/fares',
                name: 'trip-fares',
                component: TripFares
            },
            {
                path: 'trips/tickets',
                name: 'trip-ticket',
                component: TripTicket
            },
            {
                path: 'settings',
                name: 'settings',
                component: Settings
            },
        ],

    },
    
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;