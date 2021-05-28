import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import { ADD_INTERVAL, SET_NULL, UPDATE_INTERVAL } from './action-type'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /**
     * allIntervals: {
     *  key: '',
     *  timeInterval: '',
     *  func: func,
     *  vm: this
     * }
     */
    allIntervals: [],
  },
  mutations: {
    [ADD_INTERVAL](state, obj) {
      const isEmpty = _.isEmpty(
        state.allIntervals.find((v) => v.key === obj.key)
      )
      if (isEmpty) {
        state.allIntervals.push(obj)
      } else {
        state.allIntervals = state.allIntervals.map((v) => {
          if (v.key === obj.key) {
            v.timeInterval = obj.timeInterval
          }
          return v
        })
      }
    },

    [UPDATE_INTERVAL](state, obj) {
      state.allIntervals = state.allIntervals.map((v) => {
        if (v.key === obj.key) {
          v.timeInterval = obj.timeInterval
        }
        return v
      })
    },

    [SET_NULL](state) {
      state.allIntervals = state.allIntervals.map((v) => {
        return {
          ...v,
          timeInterval: null,
        }
      })
    },
  },
  actions: {
    addTimeInterVal({ commit }, obj) {
      commit(ADD_INTERVAL, obj)
    },

    updateTimeInterVal({ commit }, obj) {
      commit(UPDATE_INTERVAL, obj)
    },

    setNull({ commit }) {
      commit(SET_NULL)
    },
  },
  modules: {},
})
