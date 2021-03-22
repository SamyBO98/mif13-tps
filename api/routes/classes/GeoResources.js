class GeoResources {

    static map = {};
    static size = 0;

    static add(resource){
        this.map[this.size] = resource;
        this.size++;
    }

    static getAll(){
        return this.map;
    }

} module.exports.class = GeoResources