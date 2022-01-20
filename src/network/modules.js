import base from "@/network/base";
import routes from "@/network/routes";

export default {

    async loadFilms(params) {
        return await base.execute('get', routes.films.get, params);
    },

    async createFilm(params) {
        return await base.execute('post', routes.films.get, params);
    },

    async updateFilm(filmId, params) {
        return await base.execute('put', routes.films.item(filmId), params);
    },

    async deleteFilm(filmId) {
        return await base.execute('delete', routes.films.item(filmId));
    },

    async loadActors(params) {
        return await base.execute('get', routes.actors.get, params);
    },

    async createActor(params) {
        return await base.execute('post', routes.actors.get, params);
    },

    async updateActor(actorId, params) {
        return await base.execute('put', routes.actors.item(actorId), params);
    },

    async deleteActor(actorId) {
        return await base.execute('delete', routes.actors.item(actorId));
    },

}
