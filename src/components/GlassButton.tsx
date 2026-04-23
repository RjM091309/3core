import React from 'react';
import { Link } from 'react-router-dom';

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
  to?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}

const GlassButton: React.FC<GlassButtonProps> = ({ 
  children, 
  onClick, 
  className = '', 
  to, 
  href,
  type = 'button'
}) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    button.style.setProperty('--x', x + '%');
    button.style.setProperty('--y', y + '%');
  };

  const commonClasses = `glass-button inline-flex items-center justify-center gap-2 ${className}`;

  if (to) {
    return (
      <Link to={to} className={commonClasses} onMouseMove={handleMouseMove} onClick={onClick}>
        <span className="shimmer"></span>
        <span>{children}</span>
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={commonClasses} onMouseMove={handleMouseMove} onClick={onClick}>
        <span className="shimmer"></span>
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button type={type} className={commonClasses} onMouseMove={handleMouseMove} onClick={onClick}>
      <span className="shimmer"></span>
      <span>{children}</span>
    </button>
  );
};

export default GlassButton;
