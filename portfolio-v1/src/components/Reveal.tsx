import type {ElementType, ReactNode} from 'react';
import {useReveal} from '~/lib/useReveal';

interface Props {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger in ms. Kept small — motion tier is subtle by design. */
  delay?: number;
  id?: string;
}

export function Reveal({children, as: Tag = 'div', className = '', delay = 0, id}: Props) {
  const ref = useReveal<HTMLElement>();
  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal ${className}`}
      style={delay ? {transitionDelay: `${delay}ms`} : undefined}
    >
      {children}
    </Tag>
  );
}
