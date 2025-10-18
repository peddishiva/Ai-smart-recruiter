'use client';

import { useEffect } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Remove any attributes added by browser extensions
    const html = document.documentElement;
    const body = document.body;
    
    // List of known extension attributes to remove
    const extensionAttributes = [
      'crxemulator',
      'data-crx',
      'data-extension',
      'data-darkreader',
      'data-grammarly',
      'cz-shortcut-listen',
    ];
    
    extensionAttributes.forEach(attr => {
      if (html.hasAttribute(attr)) {
        html.removeAttribute(attr);
      }
      if (body.hasAttribute(attr)) {
        body.removeAttribute(attr);
      }
    });

    // Set up a mutation observer to catch any future changes
    const observer = new MutationObserver(() => {
      extensionAttributes.forEach(attr => {
        if (html.hasAttribute(attr)) {
          html.removeAttribute(attr);
        }
        if (body.hasAttribute(attr)) {
          body.removeAttribute(attr);
        }
      });
    });

    observer.observe(html, {
      attributes: true,
      attributeFilter: extensionAttributes,
    });

    observer.observe(body, {
      attributes: true,
      attributeFilter: extensionAttributes,
    });

    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}
