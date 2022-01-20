import Vue from 'vue'
import Vuex from 'vuex'
import modules from "@/network/modules";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    async loadFilms({ commit }, params) {
      const response = await modules.loadFilms(params);

      if (response.status === 200) {
        return response.body;
      }
    },

    async createFilm({ commit }, params) {
      const response = await modules.createFilm(params);

      if (response.status === 201) {
        return response.body;
      }
    },

    async updateFilm({ commit }, { filmId, params }) {
      const response = await modules.updateFilm(filmId, params);

      if (response.status === 200) {
        return response.body;
      }
    },

    async deleteFilm({ commit }, filmId) {
      const response = await modules.deleteFilm(filmId);

      if (response.status === 204) {
        return true;
      }
    },

    async loadActors({ commit }, params) {
      const response = await modules.loadActors(params);

      if (response.status === 200) {
        return response.body;
      }
    },

    async createActor({ commit }, params) {
      const response = await modules.createActor(params);

      if (response.status === 201) {
        return response.body;
      }
    },

    async updateActor({ commit }, { actorId, params }) {
      const response = await modules.updateActor(actorId, params);

      if (response.status === 200) {
        return response.body;
      }
    },

    async deleteActor({ commit }, actorId) {
      const response = await modules.deleteActor(actorId);

      if (response.status === 204) {
        return true;
      }
    },
  },
  modules: {
  }
})
