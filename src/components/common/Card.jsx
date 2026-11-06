import './Card.css';

/**
 * Reusable Card component for showcasing tours, transfers, or features.
 */
export default function Card({
  title,
  description,
  imageSrc,
  imageAlt,
  footer,
  children,
  className = '',
  ...props
}) {
  return (
    <div className={`card ${className}`.trim()} {...props}>
      {imageSrc && (
        <div className="card-media">
          <img src={imageSrc} alt={imageAlt || title || 'Card image'} />
        </div>
      )}
      <div className="card-body">
        {title && <h3 className="card-title">{title}</h3>}
        {description && <p className="card-description">{description}</p>}
        {children}
        {footer && <div className="card-footer">{footer}</div>}
      </div>
    </div>
  );
}

