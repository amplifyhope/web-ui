import { ToastMessage } from '@react-md/alert';
import { TextIconSpacing } from '@react-md/icon';
import { InfoSVGIcon } from '@react-md/material-icons';

import styles from './alerts.module.scss';

export const InfoToastMessage = (message: string): ToastMessage => {
  const InfoBody = (
    <TextIconSpacing icon={<InfoSVGIcon />} className={styles.infoMessage}>
      {message}
    </TextIconSpacing>
  );

  return {
    messagePriority: 'immediate',
    className: styles.infoMessage,
    children: InfoBody
  };
};
