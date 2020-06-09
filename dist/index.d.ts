declare module "geRx.interface" {
    import { Observable, Subject } from "rxjs";
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
    export interface GeRxMethods {
        show?: Observable<any>;
        showSuccess?: () => void;
        showError?: () => void;
        add?: Observable<any>;
        addSuccess?: () => void;
        addError?: () => void;
        edit?: Observable<any>;
        editSuccess?: () => void;
        editError?: () => void;
        delete?: Observable<any>;
        deleteSuccess?: () => void;
        deleteError?: () => void;
        exception?: Observable<any>;
        exceptionSuccess?: () => void;
        exceptionError?: () => void;
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
        addEntity(name: string, methods: GeRxMethods, options?: GeRxOptions): void;
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
