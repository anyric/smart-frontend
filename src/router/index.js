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
import Company from '../views/Company';
import IndexPage from '../views/IndexPage';
import Store from '../store';
import Container from '../components/Container';
import BookingBoard from '../views/BookingBoard';
import Schedule from '../views/Schedule';
import Payment from '../views/Payment';
import Preview from '../views/Preview';
import NavBar from '../components/NavBar';


Vue.use(VueRouter);

const routes = [
    {
        path: '/navbar',
        component: NavBar
    },
    {
        path: '',
        name: 'indexpage',
        component: IndexPage
    },
    {
        path: '/bookingboard',
        name: 'bookingboard',
        component: BookingBoard
    },
    {
        path: '/schedule/:scheduleId',
        name: 'schedule',
        component: Schedule,
    },
    {
        path: '/payment/:paymentId',
        name: 'payment',
        component: Payment,
    },
    {
        path: '/preview/:previewId',
        name: 'preview',
        component: Preview,
    },
    {
        path: '/login',
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
                path: '/',
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
                path: 'settings/company',
                name: 'company',
                component: Company
            },
        ],
    },
    
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;