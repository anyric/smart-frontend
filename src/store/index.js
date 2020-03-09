import Vue from 'vue';
import Vuex from 'vuex';

import Api from '@/service/api'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        users: null,
        defaultUsers: [
            {
                id: 1,
                mobile: "+256700000000",
                username: "anyric",
                email: 'anyric@smart.com',
                firstName: 'Ric',
                lastName: 'Any',
                staff: false,
                active: true,
            },
            {
                id: 2,
                mobile: "+256701111111",
                username: "smart",
                email: 'info@smart.com',
                firstName: 'smart',
                lastName: 'info',
                staff: true,
                active: true,
            }
        ],
        agents: [
            {
                id: 1,
                mobile: "+256700000000",
                username: "anyric",
                email: 'anyric@smart.com',
                firstName: 'Ric',
                lastName: 'Any',
                station:'Moyo',
                presentAdress: 'Elenderea',
                permanentAdress: 'Lefori',
                staff: false,
                active: true,
            },
            {
                id: 2,
                mobile: "+256701111111",
                username: "smart",
                email: 'info@smart.com',
                firstName: 'info',
                lastName: 'smart',
                station:'Kampala',
                presentAdress: 'Bukoto',
                permanentAdress: 'Wakiso',
                staff: true,
                active: true,
            }
        ],
        fleetTypes: [
            {
                id: 1,
                name: "Universal",
                status: 'active',
            },
            {
                id: 2,
                name: "Premium",
                status: 'active',
            }
        ],
        fleets: [
            {
                id: 1,
                registrationNo: 'UAC022F',
                engineNo: 'UA013-01315490',
                chasisNo: 'AE100-0121047',
                modelNo: 'AE065',
                fleetType: 'Universal',
                layout: '2 - 3',
                seatNos: 69,
                status: 'active',
            },
            {
                id: 2,
                registrationNo: 'UAJ024F',
                engineNo: 'UA089-01330990',
                chasisNo: 'AE300-0193047',
                modelNo: 'PR087',
                fleetType: 'Premium',
                layout: '2 - 2',
                seatNos: 49,
                status: 'active',
            }
        ],
        locations: [
            {
                id: 1,
                name: "Kampala",
                description: 'The booking office in Kampala',
                status: 'active',
            },
            {
                id: 2,
                name: "Moyo",
                description: 'The booking office in Moyo',
                status: 'active',
            },
            {
                id: 3,
                name: "Arua",
                description: 'The booking office in Arua',
                status: 'active',
            }
        ],
        routes: [
            {
                id: 1,
                name: "Kampala - Moyo",
                start: 'Namayiba park',
                end: 'Moyo universal lodge',
                stopages: 'Kigumba, Karuma, Gulu, Adjumani',
                description: 'The route from Kampala to Moyo',
                status: 'active',
            },
            {
                id: 2,
                name: "Kampala - Arua",
                start: 'Namayiba park',
                end: 'Arua Idi Amin Road',
                stopages: 'Kigumba, Karuma, Pakwach, Nebbi',
                description: 'The route from Kampala to Arua',
                status: 'active',
            },
            {
                id: 3,
                name: "Kampala - Lira",
                start: 'Namayiba park',
                end: 'Lira Town',
                stopages: 'Kigumba, Karuma, Kamdin, Lira',
                description: 'The route from Kampala to Lira',
                status: 'active',
            }
        ],
        assignTrips: [
            {
                id: 1,
                registrationNo: 'UAC022F',
                route: "Kampala - Moyo",
                startDate: '07-03-2020',
                endDate: '08-03-2020',
                status: 'active',
            },
            {
                id: 2,
                registrationNo: 'UAJ024F',
                route: "Kampala - Arua",
                startDate: '07-03-2020',
                endDate: '08-03-2020',
                status: 'active',
            },
        ],
        fares: [
            {
                id: 1,
                fleetType: "Universal",
                route: "Kampala - Arua",
                fare: '35,000',
                status: 'active',
            },
            {
                id: 2,
                fleetType: "Premium",
                route: "Kampala - Arua",
                fare: '50,000',
                status: 'active',
            },
            {
                id: 3,
                fleetType: "Universal",
                route: "Kampala - Moyo",
                fare: '40,000',
                status: 'active',
            },
            {
                id: 4,
                fleetType: "Premium",
                route: "Kampala - Moyo",
                fare: '50,000',
                status: 'active',
            },
            {
                id: 5,
                fleetType: "Universal",
                route: "Kampala - Lira",
                fare: '30,000',
                status: 'active',
            },
            {
                id: 6,
                fleetType: "Premium",
                route: "Kampala - Lira",
                fare: '40,000',
                status: 'active',
            }
        ],
    },
    getters: {
        USERS: (state) => {
            return state.users || state.defaultUsers;
        },
        AGENTS: (state) => {
            return state.agents || [];
        },
        FLEET_TYPES: (state) => {
            return state.fleetTypes || [];
        },
        FLEETS: (state) => {
            return state.fleets || [];
        },
        LOCATIONS: (state) => {
            return state.locations || [];
        },
        ROUTES: (state) => {
            return state.routes || [];
        },
        ASSIGN_TRIPS: (state) => {
            return state.assignTrips || [];
        },
        FARES: (state) => {
            return state.fares || [];
        },
    },
    mutations: {
        SET_USERS: (state, payload) => {
            state.users = payload;
        },
        SET_AGENTS: (state, payload) => {
            state.agents = payload;
        },
        SET_FLEET_TYPES: (state, payload) => {
            state.fleetTypes = payload;
        },
        SET_FLEETS: (state, payload) => {
            state.fleets = payload;
        },
        SET_LOCATIONS: (state, payload) => {
            state.locations = payload;
        },
        SET_ROUTES: (state, payload) => {
            state.routes = payload;
        },
        SET_ASSIGN_TRIPS: (state, payload) => {
            state.assignTrips = payload;
        },
        SET_FARES: (state, payload) => {
            state.fares = payload;
        },
    },
    actions: {
        GET_USERS: async ({commit}) => {

            await Api().get('/users')
            .then((response) => {
                console.log('Getting users');
                console.log(response.data);
                commit('SET_USERS', response.data);
            })
            .catch(error=>{
                console.log(error.message + " I'm here error")
            })
        },
        SAVE_USER: async ({dispatch}, payload) => {
            try {
                let response;
                if(payload.id){
                    response = await Api().put('/users',payload);
                }else{
                    response = await Api().post('/users',payload);
                }
                dispatch("GET_USERS");
                return Promise.resolve(response.data);
            } catch (error) {
                return Promise.reject(error.response.data);
            }
        },
    },
})