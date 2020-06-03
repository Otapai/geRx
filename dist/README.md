# geRx - Global Event Reactive Extensions

geRx is the data and state storage of your application, built on top of RxJs. The main advantage is ease of use.

geRx provides features for implementing onPush and onPull strategies, tracking request status, calling the application service method from anywhere.

---

**Description of the methods:**

- `addEntity(name: string, methods: GeRxMethods, options?: GeRxOptions)` -
  creating geRx entity
- `deleteEntity(name: string)` -
  delete geRx entity
- `cleanEntity(name: string)` - clearing `.data` and `.data$` data in a geRx entity
- `getData$(entityName: string)` - getting data using _onPush_ strategy
- `getData(entityName: string)` - getting data using _onPull_ strategy
- `loading$` - request status at the moment of use _onPush_ strategy
- `loading` - request status at the moment of use _onPull_ strategy

**Methods for sending data and changing state of an entity:**

- `show(entityName: string, params?: any)`
- `add(entityName: string, params?: any)`
- `edit(entityName: string, params?: any)`
- `delete(entityName: string, params?: any)`

**Types of parameters used**

- `GeRxMethods: { show?: Observable<any>; add?: Observable<any>; edit?: Observable<any>; delete?: Observable<any>; }`
- `GeRxOptions: { override: boolean; }`
    - `override` - recreate an entity when it is reinitialized
