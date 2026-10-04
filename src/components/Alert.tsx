import type { HTMLAttributes, ReactNode } from 'react';
import {
  Info,
  CheckCircle,
  Warning,
  WarningCircle,
} from '@phosphor-icons/react/dist/ssr';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { Icon } from '../icons/Icon';

type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
}

const variantConfig: Record<
  AlertVariant,
  { icon: PhosphorIcon; classes: string }
> = {
  info: { icon: Info, classes: 'bg-neutral-100 text-neutral-900' },
  success: { icon: CheckCircle, classes: 'bg-green-50 text-green-900' },
  warning: { icon: Warning, classes: 'bg-amber-50 text-amber-900' },
  danger: { icon: WarningCircle, classes: 'bg-red-50 text-red-900' },
};

/**
 * Alert dengan ikon Phosphor otomatis.
 */
export function Alert({ variant = 'info', title, className = '', children, ...rest }: AlertProps) {
  const { icon, classes } = variantConfig[variant];
  // danger/warning = alert penting; info/success = status sopan.
  const role = variant === 'danger' || variant === 'warning' ? 'alert' : 'status';
  return (
    <div
      role={role}
      className={`animate-fade-in flex items-start gap-3 rounded-2xl p-4 ${classes} ${className}`}
      {...rest}
    >
      <Icon icon={icon} size={20} className="mt-0.5 shrink-0" />
      <div className="text-sm">
        {title && <p className="font-semibold">{title}</p>}
        <div className={title ? 'mt-0.5' : ''}>{children}</div>
      </div>
    </div>
  );
}
