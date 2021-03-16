class Meteorite {

    constructor(position, composition){
        this.composition = composition;
        this.position = position;
        this.role = "impact";
    }

    getPosition(){
        return this.position;
    }

    getComposition(){
        return this.composition;
    }

} module.exports.class = Meteorite