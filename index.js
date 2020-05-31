define("geRx.interface", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("geRx", ["require", "exports", "rxjs"], function (require, exports, rxjs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GeRx {
        constructor() {
            this.store = {};
        }
        addEntity(name, methods, options) {
            if (!this.store[name] || (options && options.override)) {
                const geEntity = {};
                this.store[name] = geEntity;
                this.store[name].loading = false;
                this.store[name].loading$ = new rxjs_1.Subject();
                this.store[name].data = null;
                this.store[name].data$ = new rxjs_1.Subject();
                this.store[name].clean = () => {
                    this.store[name].data = null;
                    this.store[name].data$.next(null);
                };
                // tslint:disable-next-line:forin
                for (const methodName in methods) {
                    this.store[name][methodName] = (params) => {
                        this.store[name].loading = true;
                        setTimeout(() => {
                            this.store[name].loading$.next(true);
                        }, 0);
                        const subscriber = methods[methodName](params).subscribe((data) => {
                            this.store[name].data = data;
                            this.store[name].data$.next(data);
                        }, (error) => { }, () => {
                            this.store[name].loading = false;
                            this.store[name].loading$.next(false);
                            subscriber.unsubscribe();
                        });
                    };
                }
            }
        }
        deleteEntity(name) {
            if (this.store[name]) {
                delete this.store[name];
            }
            else {
                console.error({ deleteEntity: `Entity "${name}" does not exist` });
            }
        }
        cleanEntity(name) {
            if (this.store[name]) {
                return this.store[name].clean;
            }
            else {
                console.error({ deleteEntity: `Entity "${name}" does not exist` });
            }
        }
        getData$(entityName) {
            return this.store[entityName].data$;
        }
        getData(entityName) {
            return this.store[entityName].data;
        }
        // Is this for sure?
        getAllData() {
            const allData = {};
            // tslint:disable-next-line:forin
            for (const entity in this.store) {
                allData[entity] = this.store[entity].data;
            }
            return allData;
        }
        loading$(entityName) {
            return this.store[entityName].loading$;
        }
        loading(entityName) {
            return this.store[entityName].loading;
        }
        show(entityName, params) {
            this.store[entityName].show(params);
        }
        add(entityName, params) {
            this.store[entityName].add(params);
        }
        edit(entityName, params) {
            this.store[entityName].edit(params);
        }
        delete(entityName, params) {
            this.store[entityName].delete(params);
        }
    }
    exports.GeRx = GeRx;
});
