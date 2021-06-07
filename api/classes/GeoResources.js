class GeoResources {

    static map = {};
    static size = 0;

    static add(resource) {
        this.map[this.size] = resource;
        this.size++;
    }

    static getAll() {
        return this.map;
    }

    static getSize() {
        return this.size;
    }

    static getImpact(id) {
        for (const id of Object.keys(this.map)) {
            if (this.map[id].role === "impact" && this.map[id].id === id) {
                return this.map[id];
            }
        }
        return null;
    }

    static getPlayers() {
        let players = {};
        let playersSize = 0;
        for (const id of Object.keys(this.map)) {
            if (this.map[id].role === "player") {
                this.players[this.playersSize] = this.map[id];
                this.playersSize++;
            }
        }
        return players;
    }

    static getLocatedPlayers() {
        let players = {};
        let playersSize = 0;
        for (const id of Object.keys(this.map)) {
            if (this.map[id].role === "player" && this.map[id].position != null) {
                this.players[this.playersSize] = this.map[id];
                this.playersSize++;
            }
        }
        return players;
    }

} module.exports.class = GeoResources