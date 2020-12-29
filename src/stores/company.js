import Vue from 'vue';
import Vuex from 'vuex';

import Router from '../router'
import Api from '@/services/api'

Vue.use(Vuex);

export default {
    state: {
        company: null
    },
    getters: {
        COMPANY: (state) => {
            return state.company || [];
        }
    },
    mutations: {
        SET_COMPANY: (state, company) => {
            state.company = company;
        }
    },
    actions: {
        GET_COMPANY: async ({commit}) => {
            await Api().get('/company/')
            .then((response) => {
                let data = response.data.results;
                if(data.length > 0){
                    commit('SET_COMPANY', data);
                }
            })
            .catch(error=>{
                console.log(error.message + " get error");
            })
        },
        SAVE_COMPANY: async ({dispatch}, company) => {
            if(company.pk){
                await Api().patch('/company/' + company.pk + '/', company.data)
                .then(() => {
                    dispatch("GET_COMPANY");
                    Router.push({name: 'company'});
                })
                .catch(error=>{
                    console.log(error.message + " edit error")
                })
            }else{
                await Api().post('/company/', company)
                .then(() => {
                    dispatch("GET_COMPANY");
                    Router.push({name: 'company'});
                })
                .catch(error=>{
                    console.log(error.message + " post error")
                })
            }
        },

        DELETE_COMPANY: async ({dispatch}, company) => {
            if(company.id){
                await Api().delete('/company/' + company.id + '/')
                .then(() => {
                    dispatch("GET_COMPANY");
                    Router.push({name: 'company'});
                    console.log('deleted company ' + company.id)
                })
                .catch(error=>{
                    console.log(error.message + " delete error")
                })
            }
        },
    },
}