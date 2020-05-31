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
