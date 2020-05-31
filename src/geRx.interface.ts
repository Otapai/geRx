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
