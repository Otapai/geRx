declare module "geRx.interface" {
    import { Observable, Subject } from "rxjs";
    export interface Store {
        show?: () => void;
        add?: () => void;
        edit?: () => void;
        delete?: () => void;
        clean?: () => void;
        data?: any;
        data$?: Subject<any>;
        loading?: boolean;
        loading$?: Subject<boolean>;
    }
    export interface GeRxMethods {
        show?: Observable<any>;
        add?: Observable<any>;
        edit?: Observable<any>;
        delete?: Observable<any>;
    }
    export interface GeRxOptions {
        override: boolean;
    }
}
declare module "geRx" {
    import { Subject } from "rxjs";
    import { GeRxMethods, GeRxOptions } from "geRx.interface";
    export class GeRx {
        private store;
        addEntity(name: string, methods: GeRxMethods, options?: GeRxOptions): void;
        deleteEntity(name: string): void;
        cleanEntity(name: string): void;
        getData$(entityName: string): Subject<any>;
        getData(entityName: string): any;
        getAllData(): {};
        loading$(entityName: string): Subject<boolean>;
        loading(entityName: string): boolean;
        show(entityName: string, params?: any): void;
        add(entityName: string, params?: any): void;
        edit(entityName: string, params?: any): void;
        delete(entityName: string, params?: any): void;
    }
}
