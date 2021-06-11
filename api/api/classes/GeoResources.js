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
        for (const aId of Object.keys(this.map)) {
            if (this.map[anId].role === "impact" && this.map[anId].id === parseInt(id)) {
                return this.map[anId];
            }
        }
        return null;
    }

} module.exports.class = GeoResources