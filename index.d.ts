declare module "geRx.interface" {
    import { Subject } from "rxjs";
    export interface Store {
        show?: void;
        add?: void;
        edit?: void;
        delete?: void;
        clean?: void;
        data?: any;
        data$?: Subject<any>;
        loading?: boolean;
        loading$?: Subject<boolean>;
    }
    export interface GeRxMethods {
        show?: void;
        add?: void;
        edit?: void;
        delete?: void;
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
        deleteEntity(name: any): void;
        cleanEntity(name: any): void;
        getData$(entityName: any): Subject<any>;
        getData(entityName: any): any;
        getAllData(): {};
        loading$(entityName: any): Subject<boolean>;
        loading(entityName: any): boolean;
        show(entityName: string, params?: any): void;
        add(entityName: string, params?: any): void;
        edit(entityName: string, params?: any): void;
        delete(entityName: string, params?: any): void;
    }
}
