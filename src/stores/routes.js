import Vue from 'vue';
import Vuex from 'vuex';

import Router from '../router'
import Api from '@/service/api'

Vue.use(Vuex);

export default {
    state: {
        routes: null,
        defaultRoutes: [
            {
                id: 1,
                name: "Kampala - Moyo",
                start_point: 'Namayiba park',
                end_point: 'Moyo universal lodge',
                stopage_points: 'Kigumba, Karuma, Gulu, Adjumani',
                description: 'The route from Kampala to Moyo',
                status: 'active',
            },
            {
                id: 2,
                name: "Kampala - Arua",
                start_point: 'Namayiba park',
                end_point: 'Arua Idi Amin Road',
                stopage_points: 'Kigumba, Karuma, Pakwach, Nebbi',
                description: 'The route from Kampala to Arua',
                status: 'active',
            },
            {
                id: 3,
                name: "Kampala - Lira",
                start_point: 'Namayiba park',
                end_point: 'Lira Town',
                stopage_points: 'Kigumba, Karuma, Kamdin, Lira',
                description: 'The route from Kampala to Lira',
                status: 'active',
            }
        ],
    },
    getters: {
        ROUTES: (state) => {
            return state.routes || state.defaultRoutes;
        },
    },
    mutations: {
        SET_ROUTES: (state, route) => {
            state.routes = route;
        },
    },
    actions: {
        GET_ROUTES: async ({commit}) => {
            await Api().get('/routes')
            .then((response) => {
                let data = response.data.results;
                if(data.length >0){
                    commit('SET_ROUTES', response.data.results);
                }
            })
            .catch(error=>{
                console.log(error.message + " get error");
            })
        },
        SAVE_ROUTE: async ({dispatch}, route) => {
            if(route.pk){
                await Api().put('/routes', route)
                .then((response) => {
                    dispatch("GET_ROUTES", response.data);
                    Router.push({name: 'routes'});
                })
                .catch(error=>{
                    console.log(error.message + " edit error")
                })
            }else{
                await Api().post('/routes', route)
                .then((response) => {
                    dispatch("GET_ROUTES", response.data);
                    Router.push({name: 'routes'});
                })
                .catch(error=>{
                    console.log(error.message + " post error")
                })
            }
        },
    },
}