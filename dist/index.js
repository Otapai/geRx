"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeRx = void 0;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var GeRx = (function () {
    function GeRx() {
        this.store = {};
    }
    GeRx.prototype.addEntity = function (name, methods, thisContext, options) {
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
                    var mainMethod = function (params, options) {
                        var method = methods[methodName].main.bind(thisContext);
                        return method(params, options);
                    };
                    var subscriber = mainMethod(params, options)
                        .pipe(operators_1.delay(1))
                        .subscribe(function (data) {
                        _this.store[name].data = data;
                        _this.store[name].data$.next(data);
                        if (methods[methodName].success) {
                            _this.callPromise(methods[methodName].success.bind(thisContext), data);
                        }
                        _this.loadingFinish(name);
                        subscriber.unsubscribe();
                    }, function (error) {
                        console.error("geRx error:", error);
                        if (methods[methodName].error) {
                            _this.callPromise(methods[methodName].error.bind(thisContext), error);
                        }
                        _this.loadingFinish(name);
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
    GeRx.prototype.callPromise = function (promiseMethod, data) {
        var subMethod = function (data) {
            return promiseMethod(data);
        };
        var subSubscriber = subMethod(data)
            .pipe(operators_1.delay(1))
            .subscribe(function () {
            subSubscriber.unsubscribe();
        }, function () {
            subSubscriber.unsubscribe();
        });
    };
    GeRx.prototype.loadingFinish = function (name) {
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
    GeRx.prototype.show = function (entityName, params, options) {
        this.store[entityName].show(params, options);
    };
    GeRx.prototype.add = function (entityName, params, options) {
        this.store[entityName].add(params, options);
    };
    GeRx.prototype.edit = function (entityName, params, options) {
        this.store[entityName].edit(params, options);
    };
    GeRx.prototype.delete = function (entityName, params, options) {
        this.store[entityName].delete(params, options);
    };
    GeRx.prototype.exception = function (entityName, params, options) {
        this.store[entityName].exception(params, options);
    };
    return GeRx;
}());
exports.GeRx = GeRx;
//# sourceMappingURL=index.js.map