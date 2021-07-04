import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: window.localStorage.getItem('token'),
    userInfo: {}
  },
  mutations: {
    TOKEN: (state, value) => {
      state.token = value;
      window.localStorage.setItem('token', value);
    },
    USER: (state, value) => {
      state.userInfo = value;
    }
  },
  actions: {
    getUserInfo (ctx) {
      axios ({
        method: 'GET',
        url: 'http://localhost:8000/api/get_me/',
        headers: {
          'Authorization':'Token '+ ctx.state.token
        }
      }).then ( (response) => {
        ctx.commit ('USER', response.data)
      })
    },
    login (ctx,auth) {
      return new Promise ((resolve,reject) => {
      axios({
        method: 'post',
        url: 'http://localhost:8000/api-token-auth/',
        data: {
        username: auth.login,
        password: auth.password
        }
        })
        .then( (response) => {
        ctx.commit('TOKEN',response.data.token)
        resolve(response)
        console.log('resolve')
        console.log(response)
        })
        .catch(function (error) {
        reject(error.response.data.errors)
        console.log('CATCH')
        });
        })
    },
    logout (ctx) {
      ctx.commit('TOKEN', null),
      ctx.commit('USER', {} )
    }
  },
  modules: {
  },
  getters: {
    token: state => {
      return state.token;
    },
    userInfo: state => {
      return state.userInfo
    }
    
  }
})
