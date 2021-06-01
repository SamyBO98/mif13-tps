class Meteorite {

    constructor(id, position, composition, ttl){
        this.id = id;
        this.composition = composition;
        this.position = position;
        this.ttl = ttl;
        this.capturedBy = null;
        this.role = "impact";
    }

    getId(){
        return this.id;
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

    isCaptured(){
        return this.capturedBy != null;
    }

    setCapturedBy(login){
        this.capturedBy = login;
    }

} module.exports.class = Meteorite