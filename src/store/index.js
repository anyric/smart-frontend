import Vue from 'vue';
import Vuex from 'vuex';

import Router from '../router'
import Api from '@/service/api'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        users: null,
        currentUser: null,
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
        GET_LOGGED_IN_USER: (state) => {
            return state.currentUser;
        },
        IS_LOGGED_IN: (state) => {
            return state.currentUser && state.currentUser.token;
        },
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
        SET_LOGGED_IN_USER: (state, user) => {
            state.currentUser = user;
        },
        SET_LOGGED_OUT_USER: (state) => {
            state.currentUser = {};
            window.localStorage.currentUser = JSON.stringify({});
        },
        SET_IS_LOGIN: (state, payload) => {
            state.isLogin = payload;
        },
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
        SET_CURRENT_USER: ({commit}, payload) => {
            commit('SET_LOGGED_IN_USER', payload);
        },
        LOGIN: async ({commit}, user) => {
            await Api().post('/auth/login/', user)
            .then((response) => {
                let user = response.data;
                console.log(user)
                commit('SET_LOGGED_IN_USER', user);
                localStorage.setItem('currentUser',JSON.stringify(user));
                Router.push({name: 'dashboard'});
                location.reload(true);
            })
            .catch(error=>{
                console.log(error.message + " login error")
            })
        },
        LOGOUT: async ({commit}) => {
            await Api().post('/auth/logout/')
            .then(() => {
                commit('SET_LOGGED_OUT_USER');
                localStorage.removeItem('currentUser');
                location.reload(true);
            })
            .catch(error=>{
                console.log(error.message + " logout error")
            })
        },
        GET_USERS: async ({commit}) => {
            await Api().get('/users')
            .then((response) => {
                commit('SET_USERS', response.data.results);
            })
            .catch(error=>{
                console.log(error.message + " get error");
            })
        },
        SAVE_USER: async ({dispatch}, user) => {
            if(user.pk){
                await Api().put('/users', user)
                .then((response) => {
                    dispatch("GET_USERS", response.data);
                    Router.push({name: 'users'});
                })
                .catch(error=>{
                    console.log(error.message + " edit error")
                })
            }else{
                await Api().post('/users', user)
                .then((response) => {
                    dispatch("GET_USERS", response.data);
                    Router.push({name: 'users'});
                })
                .catch(error=>{
                    console.log(error.message + " post error")
                })
            }
        },
    },
})