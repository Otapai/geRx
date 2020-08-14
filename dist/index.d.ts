declare module "geRx.interface" {
    import { Observable, Subject } from "rxjs";
    interface GeRxSubMethods {
        main: (params?: any, options?: GeRxMethodOptions) => Observable<any>;
        success?: (params?: any, options?: GeRxMethodOptions) => Observable<any>;
        error?: (params?: any, options?: GeRxMethodOptions) => Observable<any>;
    }
    export interface GeRxMethods {
        show?: GeRxSubMethods;
        add?: GeRxSubMethods;
        edit?: GeRxSubMethods;
        delete?: GeRxSubMethods;
        exception?: GeRxSubMethods;
    }
    export interface Store {
        show?: () => void;
        add?: () => void;
        edit?: () => void;
        delete?: () => void;
        exception?: () => void;
        clean?: () => void;
        data?: any;
        data$?: Subject<any>;
        loading?: boolean;
        loading$?: Subject<boolean>;
    }
    export interface GeRxOptions {
        override?: boolean;
    }
    export interface GeRxMethodOptions {
        switchKey?: string;
    }
}
declare module "geRx" {
    import { Subject } from "rxjs";
    import { GeRxMethodOptions, GeRxMethods, GeRxOptions } from "geRx.interface";
    export class GeRx {
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
}
