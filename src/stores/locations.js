import Vue from 'vue';
import Vuex from 'vuex';

import Router from '../router'
import Api from '@/service/api'

Vue.use(Vuex);

export default {
    state: {
        locations: null,
        defaultLocations: [
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
    },
    getters: {
        LOCATIONS: (state) => {
            return state.locations || state.defaultLocations;
        },
    },
    mutations: {
        SET_LOCATIONS: (state, location) => {
            state.locations = location;
        },
    },
    actions: {
        GET_LOCATIONS: async ({commit}) => {
            await Api().get('/locations/')
            .then((response) => {
                let data = response.data.results;
                if(data.length > 0){
                    commit('SET_LOCATIONS', response.data.results);
                }
            })
            .catch(error=>{
                console.log(error.message + " get error");
            })
        },
        SAVE_LOCATION: async ({dispatch}, location) => {
            if(location.pk){
                await Api().put('/locations/', location)
                .then((response) => {
                    dispatch("GET_LOCATIONS", response.data);
                    Router.push({name: 'locations'});
                })
                .catch(error=>{
                    console.log(error.message + " edit error")
                })
            }else{
                await Api().post('/locations/', location)
                .then((response) => {
                    dispatch("GET_LOCATIONS", response.data);
                    Router.push({name: 'locations'});
                })
                .catch(error=>{
                    console.log(error.message + " post error")
                })
            }
        },
    },
}