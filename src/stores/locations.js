import Vue from 'vue';
import Vuex from 'vuex';

import Router from '../router'
import Api from '@/services/api'

Vue.use(Vuex);

export default {
    state: {
        locations: null,
        defaultLocations: [
            {
                id: 1,
                name: "Kampala",
                description: 'The booking office in Kampala',
                status: true,
            },
            {
                id: 2,
                name: "Moyo",
                description: 'The booking office in Moyo',
                status: true,
            },
            {
                id: 3,
                name: "Arua",
                description: 'The booking office in Arua',
                status: true,
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
                await Api().patch('/locations/' + location.pk + '/', location.data)
                .then(() => {
                    dispatch("GET_LOCATIONS");
                    Router.push({name: 'trip-locations'});
                })
                .catch(error=>{
                    console.log(error.message + " edit error")
                })
            }else{
                await Api().post('/locations/', location)
                .then(() => {
                    dispatch("GET_LOCATIONS");
                    Router.push({name: 'trip-locations'});
                })
                .catch(error=>{
                    console.log(error.message + " post error")
                })
            }
        },
    },
}