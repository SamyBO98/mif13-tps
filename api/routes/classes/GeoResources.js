class GeoResources {

    constructor(){
        this.map = {};
        this.size = 0;
    }

    add(resource){
        this.map[this.size] = resource;
        this.size++;
    }

    getAll(){
        return this.map;
    }

} module.exports.class = GeoResources