import Vue from 'vue';
import Vuex from 'vuex';

import Router from '../router'
import Api from '@/services/api'

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
                departure_time: "08:30:00",
                status: 'true',
            },
            {
                id: 2,
                fleet_registration_no: 'UAJ024F',
                route_name: "Kampala - Arua",
                trip_start_date: '07-03-2020',
                trip_end_date: '08-03-2020',
                departure_time: "08:30:00",
                status: 'true',
            },
        ],
    },
    getters: {
        ASSIGNED_TRIPS: (state) => {
            return state.defaultAssignedTrips;
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
        SAVE_ASSIGNED_TRIP: async ({dispatch}, trip_assigned) => {
            if(trip_assigned.pk){
                await Api().patch('/fleet-assignments/' + trip_assigned.pk + '/', trip_assigned.data)
                .then(() => {
                    dispatch("GET_ASSIGNED_TRIPS");
                    Router.push({name: 'trip-assigned'});
                })
                .catch(error=>{
                    console.log(error.message + " edit error")
                })
            }else{
                await Api().post('/fleet-assignments/', trip_assigned)
                .then(() => {
                    dispatch("GET_ASSIGNED_TRIPS");
                    Router.push({name: 'trip-assigned'});
                })
                .catch(error=>{
                    console.log(error.message + " post error")
                })
            }
        },
    },
}