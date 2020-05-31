import { Subject } from "rxjs";
import { GeRxMethods, GeRxOptions, Store } from "./geRx.interface";

export class GeRx {
  private store: any = {};

  public addEntity(
    name: string,
    methods: GeRxMethods,
    options?: GeRxOptions
  ): void {
    if (!this.store[name] || (options && options.override)) {
      const geEntity: Store = {};
      this.store[name] = geEntity;

      this.store[name].loading = false;
      this.store[name].loading$ = new Subject<boolean>();
      this.store[name].data = null;
      this.store[name].data$ = new Subject<any>();

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
          const subscriber = methods[methodName](params).subscribe(
            (data) => {
              this.store[name].data = data;
              this.store[name].data$.next(data);
            },
            (error) => {},
            () => {
              this.store[name].loading = false;
              this.store[name].loading$.next(false);
              subscriber.unsubscribe();
            }
          );
        };
      }
    }
  }

  public deleteEntity(name): void {
    if (this.store[name]) {
      delete this.store[name];
    } else {
      console.error({ deleteEntity: `Entity "${name}" does not exist` });
    }
  }

  public cleanEntity(name): void {
    if (this.store[name]) {
      return this.store[name].clean;
    } else {
      console.error({ deleteEntity: `Entity "${name}" does not exist` });
    }
  }

  public getData$(entityName): Subject<any> {
    return this.store[entityName].data$;
  }

  public getData(entityName): any {
    return this.store[entityName].data;
  }

  // Is this for sure?
  public getAllData(): {} {
    const allData = {};
    // tslint:disable-next-line:forin
    for (const entity in this.store) {
      allData[entity] = this.store[entity].data;
    }
    return allData;
  }

  public loading$(entityName): Subject<boolean> {
    return this.store[entityName].loading$;
  }

  public loading(entityName): boolean {
    return this.store[entityName].loading;
  }

  public show(entityName: string, params?: any): void {
    this.store[entityName].show(params);
  }

  public add(entityName: string, params?: any): void {
    this.store[entityName].add(params);
  }

  public edit(entityName: string, params?: any): void {
    this.store[entityName].edit(params);
  }

  public delete(entityName: string, params?: any): void {
    this.store[entityName].delete(params);
  }
}
