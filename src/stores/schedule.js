import Vue from 'vue';
import Vuex from 'vuex';

import Api from '@/services/api'

Vue.use(Vuex);

export default {
    state: {
        trip_schedule: null,
    },
    getters: {
        TRIP_SCHEDULE: (state) => {
            return state.trip_schedule
        }
    },
    mutations: {
        SET_TRIP_SCHEDULE: (state, trip_schedule) => {
            state.trip_schedule = trip_schedule;
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
        }
    },
}