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
