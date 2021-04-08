class User {

    constructor(login, image, position, ttl){
        this.login = login;
        this.image = image;
        this.position = position;
        this.ttl = ttl;
        this.role = "player";
        this.trophys = [];
    }

    setImage(image){
        this.image = image;
    }

    setPosition(position){
        this.position = position;
    }

    setTtl(ttl){
        this.ttl = ttl;
    }

    setlogin(login){
        this.login = login;
    }

    addTrophy(trophy){
        this.trophys.concat(trophy);
    }

    getImage(){
        return this.image;
    }

    getPosition(){
        return this.position;
    }

    getTtl(){
        return this.ttl;
    }

    getlogin(){
        return this.login;
    }

    getTrophys(){
        return this.trophys;
    }

} module.exports.class = User