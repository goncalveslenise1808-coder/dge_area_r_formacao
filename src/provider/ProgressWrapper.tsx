'use client';

import { ProgressProvider } from '@bprogress/next/app';

const ProgressBarProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider
      height="4px"
      color="#1e73c3"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};

export default ProgressBarProviders;