export default {
    films: {
        get: 'films',
        item (id) { return "films/" + id },
    },
    actors: {
        get: 'actors',
        item (id) { return "actors/" + id },
    },
}