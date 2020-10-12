import { Subject } from "rxjs";
import { GeRxMethodOptions, GeRxMethods, GeRxOptions } from "./index.interface";
export declare class GeRx {
    private store;
    addEntity(name: string, methods: GeRxMethods, thisContext: any, options?: GeRxOptions): void;
    private callPromise;
    private loadingFinish;
    deleteEntity(name: string): void;
    cleanEntity(name: string): void;
    getData$(entityName: string): Subject<any>;
    getData(entityName: string): any;
    getAllData(): {};
    loading$(entityName: string): Subject<boolean>;
    loading(entityName: string): boolean;
    show(entityName: string, params?: any, options?: GeRxMethodOptions): void;
    add(entityName: string, params?: any, options?: GeRxMethodOptions): void;
    edit(entityName: string, params?: any, options?: GeRxMethodOptions): void;
    delete(entityName: string, params?: any, options?: GeRxMethodOptions): void;
    exception(entityName: string, params?: any, options?: GeRxMethodOptions): void;
}
