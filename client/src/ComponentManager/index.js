import { clear } from "localforage";

function andmap(arr) {
    return arr.reduce((value, acc) => value && acc, true);
}

class ComponentManager {
    components = {}
    
    add = (key, ref) => {
        this.components[key] = ref;
    }

    do = (callback) => {
        callback(this.components);
    }

    when = (keys, callback) => {
        const interval = setInterval(() => {
            const all = keys.map(key => this.components[key]);
            if(andmap(all)) {
                callback(this.components);
                clearInterval(interval);
            }
        }, 200)
    }
}

export default new ComponentManager;