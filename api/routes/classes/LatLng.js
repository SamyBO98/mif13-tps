class LatLng {

    constructor(lat, lng) {
        this.lat = lat;
        this.lng = lng;
    }

    getLatLng(){
        return [this.lat, this.lng];
    }

}
module.exports.class = LatLng