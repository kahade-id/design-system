import type { ImgHTMLAttributes } from 'react';

type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string;
  /** Nama untuk initials fallback */
  name: string;
  size?: AvatarSize;
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
};

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Avatar lingkaran dengan initials fallback.
 */
export function Avatar({ src, name, size = 'md', className = '', alt, ...rest }: AvatarProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-900 font-semibold text-white select-none ${sizeClasses[size]} ${className}`}
      role="img"
      aria-label={alt ?? name}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt ?? name} className="h-full w-full object-cover" {...rest} />
      ) : (
        initials(name)
      )}
    </span>
  );
}
