import { Observable, Subject } from "rxjs";
import {
    GeRxMethodOptions,
    GeRxMethods,
    GeRxOptions,
    Store,
} from "./index.interface";
import { delay } from "rxjs/operators";

export class GeRx {
    private store: Store = {};

    public addEntity(
        name: string,
        methods: GeRxMethods,
        thisContext: any,
        options?: GeRxOptions
    ): void {
        if (!this.store[name] || (options && options.override)) {
            // need fix typing
            this.store[name] = {};

            this.store[name].loading = false;
            this.store[name].loading$ = new Subject<boolean>();
            this.store[name].data = null;
            this.store[name].data$ = new Subject<any>();

            this.store[name].clean = () => {
                this.store[name].data = null;
                this.store[name].data$.next(null);
            };

            for (const methodName in methods) {
                this.store[name][methodName] = (
                    params: any,
                    options?: GeRxMethodOptions
                ) => {
                    setTimeout(() => {
                        this.store[name].loading = true;
                        this.store[name].loading$.next(true);
                    }, 0);

                    const mainMethod = (params: any, options: any): Observable<any> => {
                        const method = methods[methodName].main.bind(thisContext);
                        return method(params, options);
                    };

                    const subscriber = mainMethod(params, options)
                        .pipe(delay(1))
                        .subscribe(
                            (data: any): void => {
                                this.store[name].data = data;
                                this.store[name].data$.next(data);

                                if (methods[methodName].success) {
                                    this.callPromise(
                                        methods[methodName].success.bind(thisContext),
                                        data
                                    );
                                }
                                this.loadingFinish(name);
                                subscriber.unsubscribe();
                            },
                            (error: any): void => {
                                console.error(`geRx error:`, error);
                                if (methods[methodName].error) {
                                    this.callPromise(
                                        methods[methodName].error.bind(thisContext),
                                        error
                                    );
                                }
                                this.loadingFinish(name);
                                subscriber.unsubscribe();
                            }
                        );
                };
            }
        }
    }

    private callPromise(promiseMethod: any, data: any) {
        const subMethod = (data: any): Observable<any> => {
            return promiseMethod(data);
        };
        const subSubscriber = subMethod(data)
            .pipe(delay(1))
            .subscribe(
                () => {
                    subSubscriber.unsubscribe();
                },
                () => {
                    subSubscriber.unsubscribe();
                }
            );
    }

    private loadingFinish(name: string) {
        setTimeout(() => {
            this.store[name].loading = false;
            this.store[name].loading$.next(false);
        }, 100);
    }

    public deleteEntity(name: string): void {
        if (this.store[name]) {
            delete this.store[name];
        } else {
            console.error({ deleteEntity: `Entity "${name}" does not exist` });
        }
    }

    public cleanEntity(name: string): void {
        if (this.store[name]) {
            this.store[name].clean();
        } else {
            console.error({ deleteEntity: `Entity "${name}" does not exist` });
        }
    }

    public getData$(entityName: string): Subject<any> {
        return this.store[entityName].data$;
    }

    public getData(entityName: string): any {
        return this.store[entityName].data;
    }

    // Is this for sure?
    public getAllData(): {} {
        const allData = {};
        for (const entity in this.store) {
            allData[entity] = this.store[entity].data;
        }
        return allData;
    }

    public loading$(entityName: string): Subject<boolean> {
        return this.store[entityName].loading$;
    }

    public loading(entityName: string): boolean {
        return this.store[entityName].loading;
    }

    public show(
        entityName: string,
        params?: any,
        options?: GeRxMethodOptions
    ): void {
        this.store[entityName].show(params, options);
    }

    public add(
        entityName: string,
        params?: any,
        options?: GeRxMethodOptions
    ): void {
        this.store[entityName].add(params, options);
    }

    public edit(
        entityName: string,
        params?: any,
        options?: GeRxMethodOptions
    ): void {
        this.store[entityName].edit(params, options);
    }

    public delete(
        entityName: string,
        params?: any,
        options?: GeRxMethodOptions
    ): void {
        this.store[entityName].delete(params, options);
    }

    public exception(
        entityName: string,
        params?: any,
        options?: GeRxMethodOptions
    ): void {
        this.store[entityName].exception(params, options);
    }
}
