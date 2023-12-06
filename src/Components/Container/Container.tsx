import clsx from 'clsx';
import React from 'react';
import styles from './Container.module.css';

// Define the props using a TypeScript interface or type
interface ContainerProps {
  children: React.ReactNode;
  size?: 'default' | 'small';
  className?: string;
  fullWidth?: boolean; // Add this new boolean property to the props
}

// Apply the interface to the function component
export default function Container({
  children,
  size = 'default',
  className = '',
  fullWidth = false, // Set a default value for the new fullWidth prop
}: ContainerProps) {
  // Use clsx to conditionally apply the fullWidth class
  const containerClassName = clsx(
    styles.container,
    styles[size],
    { [styles.fullWidth]: fullWidth },
    className
  );

  return <div className={containerClassName}>{children}</div>;
}

