# geRx - Global Event Reactive Extensions

geRx is the data and state storage of your application, built on top of RxJs. The main advantage is ease of use.

geRx provides features for implementing onPush and onPull strategies, tracking request status, calling the application service method from anywhere.

---

##### Example

- `app.module.ts`
```angular2
import { GeRx } from 'geRx';

@NgModule({
  [...]
  providers: [GeRx],
  [...]
})
export class AppModule {}
```


- `app.service.ts`
```angular2
export class AppService {
  hello(): Observable<any>  {
    return of({message: 'Test geRx'}).pipe(delay(3000));
  }

  edit(text: string): Observable<any> {
    return of({message: text}).pipe(delay(3000));
  }
}
```

- `app.component.ts`
```angular2
@Component({
  selector: 'test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponent implements OnInit, AfterViewInit {

  public entityName = 'hello';
  constructor(public geRx: GeRx, private appService: AppService) {}

  ngOnInit(): void {
    const geRxMethods: GeRxMethods = {
      show: this.appService.hello.bind(this.appService),
      edit: this.appService.edit.bind(this.appService)
    };
    this.geRx.addEntity(this.entityName, geRxMethods);
  }

  ngAfterViewInit(): void {
    this.geRx.show(this.entityName);
  }

  onEdit(text): void {
    this.geRx.edit(this.entityName, text);
  }

  onClear(): void {
    this.geRx.cleanEntity(this.entityName);
  }
}
```

- `app.component.html`
```angular2html
<p>Data$: {{ geRx.getData$(entityName) | async | json }}</p>
<p>Loading$: {{ geRx?.loading$(entityName) | async | json }}</p>
<p>
  <input type="text" #test />
  <button (click)="onEdit(test.value)">Edit</button>
  <button (click)="onClear()">Clear</button>
</p>
```


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

##### Methods for sending data and changing state of an entity

- `show(entityName: string, params?: any)`
- `add(entityName: string, params?: any)`
- `edit(entityName: string, params?: any)`
- `delete(entityName: string, params?: any)`

##### Types of parameters used

- `GeRxMethods: { show?: Observable<any>; add?: Observable<any>; edit?: Observable<any>; delete?: Observable<any>; }`
- `GeRxOptions: { override: boolean; }`
  - `override` - recreate an entity when it is reinitialized
