import Vue from 'vue';
import Vuex from 'vuex';

import Router from '../router'
import Api from '@/services/api'

Vue.use(Vuex);

export default {
    state: {
        fleets: null,
        defaultFleets: [
            {
                id: 1,
                registration_no: 'UAC022F',
                engine_no: 'UA013-01315490',
                chasis_no: 'AE100-0121047',
                model_no: 'AE065',
                fleet_type: 'Universal',
                layout: '2 - 3',
                seat_nos: 69,
                status: 'true',
            },
            {
                id: 2,
                registration_no: 'UAJ024F',
                engine_no: 'UA089-01330990',
                chasis_no: 'AE300-0193047',
                model_no: 'PR087',
                fleet_type: 'Premium',
                layout: '2 - 2',
                seat_nos: 49,
                status: 'true',
            }
        ],
    },
    getters: {
        FLEETS: (state) => {
            return state.fleets || state.defaultFleets;
        },
    },
    mutations: {
        SET_FLEETS: (state, fleets) => {
            state.fleets = fleets;
        },
    },
    actions: {
        GET_FLEETS: async ({commit}) => {
            await Api().get('/fleets/')
            .then((response) => {
                let data = response.data.results;
                if(data.length > 0){
                    commit('SET_FLEETS', data);
                }
            })
            .catch(error=>{
                console.log(error.message + " get error");
            })
        },
        SAVE_FLEET: async ({dispatch}, fleet) => {
            if(fleet.pk){
                await Api().patch('/fleets/' + fleet.pk + '/', fleet.data)
                .then(() => {
                    dispatch("GET_FLEETS");
                    Router.push({name: 'fleet-register'});
                })
                .catch(error=>{
                    console.log(error.message + " edit error")
                })
            }else{
                await Api().post('/fleets/', fleet)
                .then(() => {
                    dispatch("GET_FLEETS");
                    Router.push({name: 'fleet-register'});
                })
                .catch(error=>{
                    console.log(error.message + " post error")
                })
            }
        },
    },
}