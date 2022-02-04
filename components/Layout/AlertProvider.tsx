import { useEffect } from 'react';
import { ToastMessage, useAddMessage } from '@react-md/alert';
import { useRouter } from 'next/router';
import { alertService, AlertSubject, AlertType } from 'utils/alerts';
import {
  ErrorToastMessage,
  InfoToastMessage,
  SuccessToastMessage,
  WarnToastMessage
} from 'components';

export const AlertProvider = ({ id, children }) => {
  const addMessage = useAddMessage();
  const router = useRouter();
  const getAlertBody = (type: string, message: string): ToastMessage => {
    switch (type) {
      case AlertType.Error:
        return ErrorToastMessage(message);
      case AlertType.Success:
        return SuccessToastMessage(message);
      case AlertType.Warning:
        return WarnToastMessage(message);
      default:
        return InfoToastMessage(message);
    }
  };

  useEffect(() => {
    const subscription = alertService
      .onAlert(id)
      .subscribe((alert: AlertSubject) => {
        if (alert.message) {
          addMessage(getAlertBody(alert.type!, alert.message));
        }
      });
    const clearAlerts = () => alertService.clear(id);
    router.events.on('routeChangeStart', clearAlerts);
    return () => {
      subscription.unsubscribe();
      router.events.off('routeChangeStart', clearAlerts);
    };
  }, []);

  return <>{children}</>;
};
