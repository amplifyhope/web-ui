import { ToastMessage } from '@react-md/alert';
import { TextIconSpacing } from '@react-md/icon';
import { DoneSVGIcon } from '@react-md/material-icons';

import styles from './alerts.module.scss';

export const SuccessToastMessage = (message: string): ToastMessage => {
  const SuccessBody = (
    <TextIconSpacing
      icon={<DoneSVGIcon color="#ffffff" />}
      className={styles.successMessage}
    >
      {message}
    </TextIconSpacing>
  );

  return {
    messagePriority: 'immediate',
    className: styles.successMessage,
    children: SuccessBody
  };
};
