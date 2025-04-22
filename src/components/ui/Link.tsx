import React from 'react';

interface LinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Link: React.FC<LinkProps> = ({ href, className, children, onClick }) => {
  // This is a simple link component, in a real app you'd use React Router
  return (
    <a 
      href={href} 
      className={className} 
      onClick={(e) => {
        // Prevent actual navigation in this demo
        e.preventDefault();
        if (onClick) onClick();
      }}
    >
      {children}
    </a>
  );
};