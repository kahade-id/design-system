import type { CSSProperties, ReactNode } from 'react';
import type { Icon as PhosphorIcon, IconWeight } from '@phosphor-icons/react';

export interface IconProps {
  /** Komponen ikon Phosphor, mis. `ArrowRight` */
  icon: PhosphorIcon;
  size?: number;
  weight?: IconWeight;
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
}

/**
 * Wrapper ikon Phosphor.
 *
 * Ikon Phosphor TIDAK menerima className secara langsung — selalu pakai
 * wrapper ini, bukan className di ikon langsung.
 */
export function Icon({
  icon: PhosphorComponent,
  size = 20,
  weight = 'regular',
  className,
  style,
  'aria-label': ariaLabel,
}: IconProps): ReactNode {
  return (
    <i
      className={className}
      style={{ display: 'inline-flex', flexShrink: 0, ...style }}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      <PhosphorComponent size={size} weight={weight} />
    </i>
  );
}
