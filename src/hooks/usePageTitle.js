import { useEffect } from 'react';

/**
 * Hook to set document title and meta description dynamically per page
 * @param {string} title - Page title to be displayed in browser tab and search engines
 * @param {string} [description] - Meta description for SEO
 */
export function usePageTitle(title, description) {
  useEffect(() => {
    const previousTitle = document.title;
    const baseTitle = 'Madeira Ride Tours';
    document.title = title ? `${title} | ${baseTitle}` : `${baseTitle} — Transfers & Passeios Privados na Madeira`;

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }

    return () => {
      document.title = previousTitle;
    };
  }, [title, description]);
}

export default usePageTitle;

