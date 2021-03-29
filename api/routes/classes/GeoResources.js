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

    static getSize(){
        return this.size;
    }

} module.exports.class = GeoResources