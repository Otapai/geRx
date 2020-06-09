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
