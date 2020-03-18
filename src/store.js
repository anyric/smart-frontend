import Vue from 'vue';
import Vuex from 'vuex';

import authStore from './stores/auth';
import usersStore from './stores/users';
import agentsStore from './stores/agents';
import fleetTypesStore from './stores/fleetTypes';
import fleetsStore from './stores/fleets';
import locationsStore from './stores/locations';
import routesStore from './stores/routes';
import assignedTripsStore from './stores/assignedTrips';
import faresStore from './stores/fares';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth: authStore,
        users: usersStore,
        agents: agentsStore,
        fleetTypes: fleetTypesStore,
        fleets: fleetsStore,
        locations : locationsStore,
        routes: routesStore,
        assignedTrips: assignedTripsStore,
        fares: faresStore
    },
    state: {},
    getters: {},
    mutations: {},
    actions: {},
});

