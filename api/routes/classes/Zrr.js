class Zrr {

    static map = {};
    static size = 0;

    static add(corner1, corner2) {
        this.map[this.size] = { corner1: corner1, corner2: corner2 };
        this.size++;
    }

    static getAll() {
        return this.map;
    }

    static getSize() {
        return this.size;
    }

} module.exports.class = Zrr