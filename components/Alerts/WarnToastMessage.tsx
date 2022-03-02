import { ToastMessage } from '@react-md/alert';
import { TextIconSpacing } from '@react-md/icon';
import { WarningSVGIcon } from '@react-md/material-icons';

import styles from './alerts.module.scss';

export const WarnToastMessage = (message: string): ToastMessage => {
  const WarningBody = (
    <TextIconSpacing icon={<WarningSVGIcon />} className={styles.warnMessage}>
      {message}
    </TextIconSpacing>
  );

  return {
    messagePriority: 'immediate',
    className: styles.warnMessage,
    children: WarningBody
  };
};
