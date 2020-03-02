import Vue from 'vue';
import VueRouter from 'vue-router';

import DashBoard from '../views/DashBoard';
import ManageUsers from '../views/ManageUsers'
import ManageAgents from '../views/ManageAgents'
import FleetTypes from '../views/FleetTypes';
import FleetRegister from '../views/FleetRegister'
import TripLocations from '../views/TripLocations'
import TripRoutes from '../views/TripRoutes';
import TripAssignments from '../views/TripAssignments'
import TripFares from '../views/TripFares';
import Settings from '../views/Settings'


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: DashBoard
    },
    {
        path: '/users',
        name: 'users',
        component: ManageUsers

    },
    {
        path: '/agents',
        name: 'agents',
        component: ManageAgents
    },
    {
        path: '/fleets/types',
        name: 'fleet-types',
        component: FleetTypes,
    },
    {
        path: '/fleets/register',
        name: 'fleet-register',
        component: FleetRegister,
    },
    {
        path: '/trips/locations',
        name: 'trip-locations',
        component: TripLocations,
    },
    {
        path: '/trips/routes',
        name: 'trip-routes',
        component: TripRoutes,
    },
    {
        path: '/trips/assign',
        name: 'trip-assign',
        component: TripAssignments,
    },
    {
        path: '/trips/fares',
        name: 'prices',
        component: TripFares
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings
    },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;