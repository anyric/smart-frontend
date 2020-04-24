import Vue from 'vue';
import Vuex from 'vuex';

import Router from '../router'
import Api from '@/services/api'

Vue.use(Vuex);

export default {
    state: {
        fares: null,
        defaultFares: [
            {
                id: 1,
                fleet_type: "Universal",
                trip_route: "Kampala - Arua",
                price_per_person: '35,000',
                status: true,
            },
            {
                id: 2,
                fleet_type: "Premium",
                trip_route: "Kampala - Arua",
                price_per_person: '50,000',
                status: true,
            },
            {
                id: 3,
                fleet_type: "Universal",
                trip_route: "Kampala - Moyo",
                price_per_person: '40,000',
                status: true,
            },
            {
                id: 4,
                fleet_type: "Premium",
                trip_route: "Kampala - Moyo",
                price_per_person: '50,000',
                status: true,
            },
            {
                id: 5,
                fleet_type: "Universal",
                trip_route: "Kampala - Lira",
                price_per_person: '30,000',
                status: true,
            },
            {
                id: 6,
                fleet_type: "Premium",
                trip_route: "Kampala - Lira",
                price_per_person: '40,000',
                status: true,
            }
        ],
    },
    getters: {
        FARES: (state) => {
            return state.fares || state.defaultFares;
        },
    },
    mutations: {
        SET_FARES: (state, fares) => {
            state.fares = fares;
        },
    },
    actions: {
        GET_FARES: async ({commit}) => {
            await Api().get('/trip-prices/')
            .then((response) => {
                let data = response.data.results;
                if(data.length > 0){
                    commit('SET_FARES', data);
                }
            })
            .catch(error=>{
                console.log(error.message + " get error");
            })
        },
        SAVE_FARE: async ({dispatch}, fare) => {
            if(fare.pk){
                await Api().patch('/trip-prices/' + fare.pk + '/', fare.data)
                .then(() => {
                    dispatch("GET_FARES");
                    Router.push({name: 'trip-fares'});
                })
                .catch(error=>{
                    console.log(error.message + " edit error")
                })
            }else{
                await Api().post('/trip-prices/', fare)
                .then(() => {
                    dispatch("GET_FARES");
                    Router.push({name: 'trip-fares'});
                })
                .catch(error=>{
                    console.log(error.message + " post error")
                })
            }
        },
    },
}