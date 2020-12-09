import Vue from 'vue';
import Vuex from 'vuex';
import VueCookie from 'vue-cookie';

import Api from '@/services/api'

Vue.use(Vuex);

export default {
    state: {
        trip_schedule: {},
        trip: {}
    },
    getters: {
        TRIP_SCHEDULE: (state) => {
            return state.trip_schedule
        },
        TRIP: (state) => {
            return state.trip
        }
    },
    mutations: {
        SET_TRIP_SCHEDULE: (state, trip_schedule) => {
            state.trip_schedule = trip_schedule;
        },
        SET_TRIP: (state, payload) => {
            state.trip = payload;
            VueCookie.set('trip', JSON.stringify(payload), 1);
        },
    },
    actions: {
        GET_TRIP_SCHEDULE: async ({commit}) => {
            await Api().get('/trip-schedule/')
            .then((response) => {
                let data = response.data.results;
                if(data.length > 0){
                    commit('SET_TRIP_SCHEDULE', data);
                }
            })
            .catch(error=>{
                console.log(error.message + " get error");
            })
        },
        STORE_TRIP: ({commit}, trip) => {
            commit('SET_TRIP', trip);
        },
    },
}