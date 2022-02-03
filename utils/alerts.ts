import { Subject } from "rxjs";
import { filter } from "rxjs/operators";

export const alertService = {
  onAlert,
  success,
  error,
  info,
  warn,
  alert,
  clear,
};
export interface AlertSubject {
  id?: string;
  message?: string;
  type?: string;
}

export const AlertType = {
  Success: "Success",
  Error: "Error",
  Info: "Info",
  Warning: "Warning",
};

const alertSubject = new Subject();
const defaultId = "default-alert";

function onAlert(id: string = defaultId) {
  //@ts-ignore
  return alertSubject.asObservable().pipe(filter((x) => x && x.id === id));
}

function success(message, options) {
  alert({ ...options, type: AlertType.Success, message });
}

function error(message, options) {
  alert({ ...options, type: AlertType.Error, message });
}

function info(message, options) {
  alert({ ...options, type: AlertType.Info, message });
}

function warn(message, options) {
  alert({ ...options, type: AlertType.Warning, message });
}

function alert(alert: AlertSubject) {
  alertSubject.next(alert);
}

function clear(id: string = defaultId) {
  alertSubject.next({ id });
}
