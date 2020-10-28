import Vue from 'vue';
import Vuex from 'vuex';

import Router from '../router'
import Api from '@/services/api'

Vue.use(Vuex);

export default {
    state: {
        fares: null,
    },
    getters: {
        FARES: (state) => {
            return state.fares || [];
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