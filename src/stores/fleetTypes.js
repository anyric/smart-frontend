import Vue from 'vue';
import Vuex from 'vuex';

import Router from '../router'
import Api from '@/service/api'

Vue.use(Vuex);

export default {
    state: {
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
    },
    getters: {
        FLEET_TYPES: (state) => {
            return state.fleetTypes || [];
        },
    },
    mutations: {
        SET_FLEET_TYPES: (state, fleetTypes) => {
            state.fleetTypes = fleetTypes;
        },
    },
    actions: {
        GET_FLEET_TYPES: async ({commit}) => {
            await Api().get('/fleet-types')
            .then((response) => {
                commit('SET_FLEET_TYPES', response.data.results);
            })
            .catch(error=>{
                console.log(error.message + " get error");
            })
        },
        SAVE_FLEET_TYPES: async ({dispatch}, fleetTypes) => {
            if(fleetTypes.pk){
                await Api().put('/fleet-types', fleetTypes)
                .then((response) => {
                    dispatch("GET_FLEET_TYPES", response.data);
                    Router.push({name: 'fleet-types'});
                })
                .catch(error=>{
                    console.log(error.message + " edit error")
                })
            }else{
                await Api().post('/fleet-types', fleetTypes)
                .then((response) => {
                    dispatch("GET_FLEET_TYPES", response.data);
                    Router.push({name: 'fleet-types'});
                })
                .catch(error=>{
                    console.log(error.message + " post error")
                })
            }
        },
    },
}