// Polyfill and environment defense:
// In some sandboxed browser/iframe environments, `window.fetch` is configured as a getter-only property.
// If any polyfill (such as formdata-polyfill) attempts to assign `window.fetch = ...`,
// or if external libraries attempt assignment to fetch on window/globalThis, it throws:
// "TypeError: Cannot set property fetch of #<Window> which has only a getter"
//
// By defining an interceptor on window and globalThis that safely delegates to the native fetch getter
// or stores the override in a closure rather than failing on assignment, we eliminate this error.

(function fixFetchProperty() {
  if (typeof window !== 'undefined') {
    try {
      const nativeFetch = window.fetch ? window.fetch.bind(window) : undefined;
      let activeFetch = nativeFetch;

      const desc = Object.getOwnPropertyDescriptor(window, 'fetch') ||
                   Object.getOwnPropertyDescriptor(Object.getPrototypeOf(window), 'fetch');

      if (!desc || desc.configurable || !desc.set) {
        Object.defineProperty(window, 'fetch', {
          get() {
            return activeFetch || (desc && desc.get ? desc.get.call(window) : undefined);
          },
          set(newFetch) {
            activeFetch = newFetch;
          },
          configurable: true,
          enumerable: true,
        });
      }
    } catch {
      // Safe fallback if property is strictly sealed
    }

    if (typeof globalThis !== 'undefined' && globalThis !== window) {
      try {
        let globalFetch = (globalThis as any).fetch;
        Object.defineProperty(globalThis, 'fetch', {
          get() {
            return globalFetch;
          },
          set(newFetch) {
            globalFetch = newFetch;
          },
          configurable: true,
          enumerable: true,
        });
      } catch {
        // Safe fallback
      }
    }
  }
})();
