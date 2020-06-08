define("geRx.interface", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("geRx", ["require", "exports", "rxjs"], function (require, exports, rxjs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GeRx = void 0;
    var GeRx = (function () {
        function GeRx() {
            this.store = {};
        }
        GeRx.prototype.addEntity = function (name, methods, options) {
            var _this = this;
            if (!this.store[name] || (options && options.override)) {
                this.store[name] = {};
                this.store[name].loading = false;
                this.store[name].loading$ = new rxjs_1.Subject();
                this.store[name].data = null;
                this.store[name].data$ = new rxjs_1.Subject();
                this.store[name].clean = function () {
                    _this.store[name].data = null;
                    _this.store[name].data$.next(null);
                };
                var _loop_1 = function (methodName) {
                    this_1.store[name][methodName] = function (params, options) {
                        setTimeout(function () {
                            _this.store[name].loading = true;
                            _this.store[name].loading$.next(true);
                        }, 0);
                        var subscriber = methods[methodName](params).subscribe(function (data) {
                            _this.store[name].data = data;
                            _this.store[name].data$.next(data);
                        }, function (error) {
                            _this.loadingFinish();
                            console.error("geRx error: " + error);
                        }, function () {
                            _this.loadingFinish();
                            subscriber.unsubscribe();
                        });
                    };
                };
                var this_1 = this;
                for (var methodName in methods) {
                    _loop_1(methodName);
                }
            }
        };
        GeRx.prototype.loadingFinish = function () {
            var _this = this;
            setTimeout(function () {
                _this.store[name].loading = false;
                _this.store[name].loading$.next(false);
            }, 100);
        };
        GeRx.prototype.deleteEntity = function (name) {
            if (this.store[name]) {
                delete this.store[name];
            }
            else {
                console.error({ deleteEntity: "Entity \"" + name + "\" does not exist" });
            }
        };
        GeRx.prototype.cleanEntity = function (name) {
            if (this.store[name]) {
                this.store[name].clean();
            }
            else {
                console.error({ deleteEntity: "Entity \"" + name + "\" does not exist" });
            }
        };
        GeRx.prototype.getData$ = function (entityName) {
            return this.store[entityName].data$;
        };
        GeRx.prototype.getData = function (entityName) {
            return this.store[entityName].data;
        };
        GeRx.prototype.getAllData = function () {
            var allData = {};
            for (var entity in this.store) {
                allData[entity] = this.store[entity].data;
            }
            return allData;
        };
        GeRx.prototype.loading$ = function (entityName) {
            return this.store[entityName].loading$;
        };
        GeRx.prototype.loading = function (entityName) {
            return this.store[entityName].loading;
        };
        GeRx.prototype.show = function (entityName, params) {
            this.store[entityName].show(params);
        };
        GeRx.prototype.add = function (entityName, params) {
            this.store[entityName].add(params);
        };
        GeRx.prototype.edit = function (entityName, params) {
            this.store[entityName].edit(params);
        };
        GeRx.prototype.delete = function (entityName, params) {
            this.store[entityName].delete(params);
        };
        return GeRx;
    }());
    exports.GeRx = GeRx;
});
//# sourceMappingURL=index.js.map