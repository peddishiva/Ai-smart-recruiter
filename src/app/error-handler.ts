// Global error handler to suppress hydration warnings
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    // Suppress hydration warnings caused by browser extensions
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Hydration') ||
        args[0].includes('hydrated') ||
        args[0].includes('crxemulator') ||
        args[0].includes('server rendered HTML'))
    ) {
      return;
    }
    originalError.apply(console, args);
  };

  // Clean up extension attributes on page load
  const cleanupExtensions = () => {
    const html = document.documentElement;
    const body = document.body;
    
    const extensionAttrs = [
      'crxemulator',
      'data-crx',
      'data-extension',
      'data-darkreader',
      'data-grammarly',
      'cz-shortcut-listen',
      'data-new-gr-c-s-check-loaded',
      'data-gr-ext-installed',
    ];

    extensionAttrs.forEach(attr => {
      if (html?.hasAttribute(attr)) {
        html.removeAttribute(attr);
      }
      if (body?.hasAttribute(attr)) {
        body.removeAttribute(attr);
      }
    });
  };

  // Run cleanup immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cleanupExtensions);
  } else {
    cleanupExtensions();
  }

  // Set up mutation observer
  const observer = new MutationObserver(cleanupExtensions);
  
  if (document.documentElement) {
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [
        'crxemulator',
        'data-crx',
        'data-extension',
        'data-darkreader',
        'data-grammarly',
      ],
    });
  }
}

export {};
