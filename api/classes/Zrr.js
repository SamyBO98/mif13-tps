class Zrr {

    static map = new Array();

    static add(corner1, corner2) {
        this.map.push({ corner1: corner1, corner2: corner2 });
    }

    static getAll() {
        return this.map;
    }

    static getSize() {
        return this.map.length;
    }

} module.exports.class = Zrr