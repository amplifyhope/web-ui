import { Configuration } from '@react-md/layout';
import { AppBar } from '@react-md/app-bar';
import { MessageQueue } from '@react-md/alert';
import { AlertProvider } from 'components';

export const AppLayout = ({ children }) => {
  return (
    <Configuration>
      <AppBar></AppBar>
      <MessageQueue id="global-message-queue" position="top" timeout={2000}>
        <AlertProvider id="global-alerts">{children}</AlertProvider>
      </MessageQueue>
    </Configuration>
  );
};
