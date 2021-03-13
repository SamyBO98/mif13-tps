class GeoResources {

    constructor(id, url, position, role, ttl, trophys){
        this.id = id;
        this.url = url;
        this.position = position;
        this.role = role;
        this.ttl = ttl;
        this.trophys = trophys;
    }

    getId() {
        return this.id;
    }

    updatePosition(tab2) {
        this.position = tab2;
    }

    updateImageLocation(url) {
        this.url = url;
    }

}
module.exports.class = GeoResources