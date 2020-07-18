import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { ThemePortalProvider } from './theme';


const AppProvider: React.FC = ({ children }) => (
  <ThemePortalProvider>
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  </ThemePortalProvider>
);

export default AppProvider;
