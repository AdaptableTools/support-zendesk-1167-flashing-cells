import React from 'react';
import useFetch from 'react-fetch-hook';

type AppVersion = { version: string };

export const Footer: React.FC = () => {
  const { data } = useFetch<AppVersion>('/version.json', { cache: 'no-store' });
  const version = data?.version;
  return (
    <cib-footer class="footer-xs" background-color="gray">
      <div slot="info">RPS BONDS{version ? `: ${version}` : ''}</div>
    </cib-footer>
  );
};
