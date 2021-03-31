class Meteorite {

    constructor(position, composition, ttl){
        this.composition = composition;
        this.position = position;
        this.ttl = ttl
        this.role = "impact";
    }

    getPosition(){
        return this.position;
    }

    getComposition(){
        return this.composition;
    }

    getTtl(){
        return this.ttl;
    }

} module.exports.class = Meteorite