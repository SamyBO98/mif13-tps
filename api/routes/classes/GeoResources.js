class GeoResources {

    constructor(id, url, position, ttl, trophys){
        this.id = id;
        this.url = url;
        this.position = position;
        if (ttl !== null){
            this.role = "player";
            this.ttl = ttl;
            this.trophys = trophys;
        } else {
            this.role = "impact";
        }
    }

    getId() {
        return this.id;
    }

    updateImageLocation(url) {
        this.url = url;
    }

    updatePosition(tab2) {
        this.position = tab2;
    }

}
module.exports.class = GeoResources