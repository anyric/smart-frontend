import Vue from 'vue';
import Vuex from 'vuex';

import Router from '../router'
import Api from '@/services/api'

Vue.use(Vuex);

export default {
    state: {
        assignedTrips: null,
    },
    getters: {
        ASSIGNED_TRIPS: (state) => {
            return state.assignedTrips || [];
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

        DELETE_ASSIGNED_TRIP: async ({dispatch}, trip_assigned) => {
            console.log(trip_assigned)
            if(trip_assigned.id){
                await Api().delete('/fleet-assignments/' + trip_assigned.id + '/')
                .then(() => {
                    dispatch("GET_FARES");
                    Router.push({name: 'trip-assigned'});
                    console.log('deleted assigned Trip ' + trip_assigned.id)
                })
                .catch(error=>{
                    console.log(error.message + " delete error")
                })
            }
        },
    },
}