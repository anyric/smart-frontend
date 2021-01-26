import Vue from 'vue';
import Vuex from 'vuex';

import Router from '../router'
import Api from '@/services/api'

Vue.use(Vuex);

export default {
    state: {
        collections: null,
    },
    getters: {
        COLLECTIONS: (state) => {
            return state.collections || []
        },
    },
    mutations: {
        SET_COLLECTIONS: (state, collection) => {
            state.collections = collection;
        },
    },
    actions: {
        GET_COLLECTIONS: async ({commit}) => {
            await Api().get('/collections/')
            .then((response) => {
                let data = response.data.results;
                if(data.length > 0){
                    commit('SET_COLLECTIONS', response.data.results);
                }
            })
            .catch(error=>{
                console.log(error.message + " get error");
            })
        },

        SAVE_COLLECTION: async ({dispatch}, collection) => {
            if(collection.pk){
                await Api().patch('/collections/' + collection.pk + '/', collection.data)
                .then(() => {
                    dispatch("GET_COLLECTIONS");
                    Router.push({name: 'collections'});
                })
                .catch(error=>{
                    console.log(error.message + " edit error")
                })
            }else{
                await Api().post('/collections/', collection)
                .then(() => {
                    dispatch("GET_COLLECTIONS");
                    Router.push({name: 'collections'});
                })
                .catch(error=>{
                    console.log(error.message + " post error")
                })
            }
        },

        DELETE_COLLECTION: async ({dispatch}, collection) => {
            if(collection.id){
                await Api().delete('/collections/' + collection.id + '/')
                .then(() => {
                    dispatch("GET_COLLECTIONS");
                    Router.push({name: 'collections'});
                    console.log('deleted collection ' + collection.id)
                })
                .catch(error=>{
                    console.log(error.message + " delete error")
                })
            }
        },
    },
}
