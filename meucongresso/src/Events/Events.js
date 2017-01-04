
export const REGION_SELECTED = 'region_selected';

let LISTENERS = {};

export default class Events {
    static trigger(event, element, data) {
        if (LISTENERS[event] === undefined) return;
        if (LISTENERS[event][element] === undefined) return;

        LISTENERS[event][element].forEach(cb => cb(data));
    }

    static listenTo(event, element, callback) {
        if (LISTENERS[event] === undefined) {
            LISTENERS[event] = {};
        }

        if (LISTENERS[event][element] === undefined) {
            LISTENERS[event][element] = [];
        }

        LISTENERS[event][element].push(callback);
    }
}
