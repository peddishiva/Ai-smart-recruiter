'use client';

import { useEffect } from 'react';

const extensionAttributes = [
  'crxemulator',
  'data-crx',
  'data-extension',
  'data-darkreader',
  'data-grammarly',
  'cz-shortcut-listen',
  'data-new-gr-c-s-check-loaded',
  'data-gr-ext-installed',
];

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const cleanupExtensionAttributes = () => {
      const html = document.documentElement;
      const body = document.body;

      extensionAttributes.forEach((attr) => {
        if (html.hasAttribute(attr)) {
          html.removeAttribute(attr);
        }
        if (body.hasAttribute(attr)) {
          body.removeAttribute(attr);
        }
      });
    };

    cleanupExtensionAttributes();

    const observer = new MutationObserver(cleanupExtensionAttributes);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: extensionAttributes,
    });

    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}
