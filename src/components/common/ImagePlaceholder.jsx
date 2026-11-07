import './ImagePlaceholder.css';

/**
 * Reusable Image Placeholder Component.
 * Displays a clean, elegant neutral grey canvas with subtle shimmer and a theme icon
 * until the user adds actual photos. If `src` is provided, renders the real image.
 *
 * Props:
 * - src: image URL or null/undefined
 * - alt: image description
 * - aspectRatio: '16/10' | '4/3' | '21/9' | '1/1'
 * - label: optional text badge in corner (e.g. "Photo Slot")
 * - height: optional CSS height string
 */
export default function ImagePlaceholder({
  src = null,
  alt = 'Madeira Tour',
  aspectRatio = '16/10',
  label = null,
  className = '',
  height = null,
}) {
  if (src) {
    return (
      <div
        className={`img-placeholder-wrapper ${className}`}
        style={{ aspectRatio: height ? undefined : aspectRatio, height: height || undefined }}
      >
        <img src={src} alt={alt} className="img-placeholder-real" loading="lazy" />
        {label && <span className="img-placeholder-label">{label}</span>}
      </div>
    );
  }

  return (
    <div
      className={`img-placeholder-wrapper img-placeholder-canvas ${className}`}
      style={{ aspectRatio: height ? undefined : aspectRatio, height: height || undefined }}
      aria-label={alt}
    >
      <div className="img-placeholder-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </div>
      {label && <span className="img-placeholder-label">{label}</span>}
    </div>
  );
}

