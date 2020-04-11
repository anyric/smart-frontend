import Vue from 'vue';
import Vuex from 'vuex';

import Router from '../router'
import Api from '@/service/api'

Vue.use(Vuex);

export default {
    state: {
        assignedTrips: null,
        defaultAssignedTrips: [
            {
                id: 1,
                fleet_registration_no: 'UAC022F',
                route_name: "Kampala - Moyo",
                trip_start_date: '07-03-2020',
                trip_end_date: '08-03-2020',
                status: 'active',
            },
            {
                id: 2,
                fleet_registration_no: 'UAJ024F',
                route_name: "Kampala - Arua",
                trip_start_date: '07-03-2020',
                trip_end_date: '08-03-2020',
                status: 'active',
            },
        ],
    },
    getters: {
        ASSIGNED_TRIPS: (state) => {
            return state.assignedTrips || state.defaultAssignedTrips;
        },
    },
    mutations: {
        SET_ASSIGNED_TRIPS: (state, trips_assigned) => {
            state.assignedTrips = trips_assigned;
        },
    },
    actions: {
        GET_ASSIGNED_TRIPS: async ({commit}) => {
            await Api().get('/fleet-assignments/')
            .then((response) => {
                let data = response.data.results;
                if (data.length > 0){
                    commit('SET_ASSIGNED_TRIPS', data);
                }
            })
            .catch(error=>{
                console.log(error.message + " get error");
            })
        },
        SAVE_ASSIGNED_TRIPS: async ({dispatch}, trips_assigned) => {
            if(trips_assigned.pk){
                await Api().patch('/fleet-assignments/', trips_assigned)
                .then((response) => {
                    dispatch("GET_ASSIGNED_TRIPS", response.data);
                    Router.push({name: 'trip-assigned'});
                })
                .catch(error=>{
                    console.log(error.message + " edit error")
                })
            }else{
                await Api().post('/fleet-assignments/', trips_assigned)
                .then((response) => {
                    dispatch("GET_ASSIGNED_TRIPS", response.data);
                    Router.push({name: 'trip-assigned'});
                })
                .catch(error=>{
                    console.log(error.message + " post error")
                })
            }
        },
    },
}