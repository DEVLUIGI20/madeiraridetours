import { Link } from 'react-router-dom';
import './Button.css';

/**
 * Reusable Button component supporting both actions and navigation.
 * Variants: 'primary' (pill white), 'glass' (frosted pill), 'icon' (circular), 'dark', 'accent'.
 */
export default function Button({
  children,
  to,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  ariaLabel,
  ...props
}) {
  const variantClass = {
    primary: 'btn-primary',
    glass: 'btn-glass',
    icon: 'btn-icon-circle',
    iconSolid: 'btn-icon-circle btn-icon-circle-solid',
    dark: 'btn-dark',
    accent: 'btn-accent',
  }[variant] || 'btn-primary';

  const combinedClasses = `btn ${variantClass} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={combinedClasses} aria-label={ariaLabel} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
}

