export default class Util {
    static copy(object) {
        return Object.assign({}, object);
    }

    static erase(object, value) {
        for (var prop in object) {
            object[prop] = value;
        }

        return object;
    }

    static fromArray(array, keyFunc, valueFunc) {
        let obj = {};
        array.forEach(el => { obj[keyFunc(el)] = valueFunc(el); });
        return obj;
    }
}
