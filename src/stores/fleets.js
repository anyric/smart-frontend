import Vue from 'vue';
import Vuex from 'vuex';

import Router from '../router'
import Api from '@/service/api'

Vue.use(Vuex);

export default {
    state: {
        fleets: [
            {
                id: 1,
                registrationNo: 'UAC022F',
                engineNo: 'UA013-01315490',
                chasisNo: 'AE100-0121047',
                modelNo: 'AE065',
                fleetType: 'Universal',
                layout: '2 - 3',
                seatNos: 69,
                status: 'active',
            },
            {
                id: 2,
                registrationNo: 'UAJ024F',
                engineNo: 'UA089-01330990',
                chasisNo: 'AE300-0193047',
                modelNo: 'PR087',
                fleetType: 'Premium',
                layout: '2 - 2',
                seatNos: 49,
                status: 'active',
            }
        ],
    },
    getters: {
        FLEETS: (state) => {
            return state.fleets || [];
        },
    },
    mutations: {
        SET_FLEETS: (state, fleets) => {
            state.fleets = fleets;
        },
    },
    actions: {
        GET_FLEETS: async ({commit}) => {
            await Api().get('/fleets')
            .then((response) => {
                console.log(response.data.results);
                commit('SET_FLEETS', response.data.results);
            })
            .catch(error=>{
                console.log(error.message + " get error");
            })
        },
        SAVE_FLEETS: async ({dispatch}, fleets) => {
            if(fleets.pk){
                await Api().put('/fleets', fleets)
                .then((response) => {
                    dispatch("GET_FLEETS", response.data);
                    Router.push({name: 'fleets'});
                })
                .catch(error=>{
                    console.log(error.message + " edit error")
                })
            }else{
                await Api().post('/fleets', fleets)
                .then((response) => {
                    dispatch("GET_FLEETS", response.data);
                    Router.push({name: 'fleets'});
                })
                .catch(error=>{
                    console.log(error.message + " post error")
                })
            }
        },
    },
}