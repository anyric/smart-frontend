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
                status: true,
            },
            {
                id: 2,
                name: "Kampala - Arua",
                start_point: 'Namayiba park',
                end_point: 'Arua Idi Amin Road',
                stopage_points: 'Kigumba, Karuma, Pakwach, Nebbi',
                description: 'The route from Kampala to Arua',
                status: true,
            },
            {
                id: 3,
                name: "Kampala - Lira",
                start_point: 'Namayiba park',
                end_point: 'Lira Town',
                stopage_points: 'Kigumba, Karuma, Kamdin, Lira',
                description: 'The route from Kampala to Lira',
                status: true,
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
            await Api().get('/routes/')
            .then((response) => {
                let data = response.data.results;
                if(data.length > 0){
                    data[0].start_point = parseInt(data[0].start_point);
                    data[0].end_point = parseInt(data[0].end_point);
                    data[0].stopage_points = data[0].stopage_points.split(',').map(el => {
                        return parseInt(el);
                    })
                    commit('SET_ROUTES', data);
                }
            })
            .catch(error=>{
                console.log(error.message + " get error");
            })
        },
        SAVE_ROUTE: async ({dispatch}, route) => {
            if(route.pk){
                await Api().patch('/routes/' + route.pk + '/', route.data)
                .then(() => {
                    dispatch("GET_ROUTES");
                    Router.push({name: 'trip-routes'});
                })
                .catch(error=>{
                    console.log(error.message + " edit error")
                })
            }else{
                await Api().post('/routes/', route)
                .then(() => {
                    dispatch("GET_ROUTES");
                    Router.push({name: 'trip-routes'});
                })
                .catch(error=>{
                    console.log(error.message + " post error")
                })
            }
        },
    },
}