import { ToastMessage } from '@react-md/alert';
import { TextIconSpacing } from '@react-md/icon';
import { ErrorSVGIcon } from '@react-md/material-icons';

import styles from './alerts.module.scss';

export const ErrorToastMessage = (message: string): ToastMessage => {
  const ErrorBody = (
    <TextIconSpacing
      icon={<ErrorSVGIcon color="#ffffff" />}
      className={styles.errorMessage}
    >
      {message}
    </TextIconSpacing>
  );

  return {
    messagePriority: 'immediate',
    className: styles.errorMessage,
    children: ErrorBody
  };
};
