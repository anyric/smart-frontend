import Vue from 'vue';
import Vuex from 'vuex';

import Router from '../router'
import Api from '@/services/api'

Vue.use(Vuex);

export default {
    state: {
        branch: null
    },
    getters: {
        BRANCH: (state) => {
            return state.branch || [];
        },
    },
    mutations: {
        SET_BRANCH: (state, branch) => {
            state.branch = branch;
        }
    },
    actions: {
        GET_BRANCH: async ({commit}) => {
            await Api().get('/branch/')
            .then((response) => {
                let data = response.data.results;
                if(data.length > 0){
                    commit('SET_BRANCH', data);
                }
            })
            .catch(error=>{
                console.log(error.message + " get error");
            })
        },

        SAVE_BRANCH: async ({dispatch}, branch) => {
            if(branch.pk){
                await Api().patch('/branch/' + branch.pk + '/', branch.data)
                .then(() => {
                    dispatch("GET_BRANCH");
                    Router.push({name: 'company'});
                })
                .catch(error=>{
                    console.log(error.message + " edit error")
                })
            }else{
                await Api().post('/branch/', branch)
                .then(() => {
                    dispatch("GET_BRANCH");
                    Router.push({name: 'company'});
                })
                .catch(error=>{
                    console.log(error.message + " post error")
                })
            }
        },

        DELETE_BRANCH: async ({dispatch}, branch) => {
            if(branch.id){
                await Api().delete('/branch/' + branch.id + '/')
                .then(() => {
                    dispatch("GET_BRANCH");
                    Router.push({name: 'company'});
                    console.log('deleted branch ' + branch.id)
                })
                .catch(error=>{
                    console.log(error.message + " delete error")
                })
            }
        },
    },
}