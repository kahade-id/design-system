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

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: AlertVariant;
  title?: ReactNode;
  children: ReactNode;
}

const variantConfig: Record<
  AlertVariant,
  { icon: PhosphorIcon; classes: string; iconCls: string }
> = {
  info: { icon: Info, classes: 'border-line bg-surface-2 text-fg-2', iconCls: 'text-fg' },
  success: { icon: CheckCircle, classes: 'border-green-200 bg-positive-soft text-green-950', iconCls: 'text-positive' },
  warning: { icon: Warning, classes: 'border-amber-200 bg-caution-soft text-amber-950', iconCls: 'text-caution' },
  danger: { icon: WarningCircle, classes: 'border-red-200 bg-critical-soft text-red-950', iconCls: 'text-critical' },
};

/**
 * Pemberitahuan dalam halaman: ikon + judul + isi, hairline tipis.
 */
export function Alert({ variant = 'info', title, className = '', children, ...rest }: AlertProps) {
  const { icon, classes, iconCls } = variantConfig[variant];
  // danger/warning = alert penting; info/success = status sopan.
  const role = variant === 'danger' || variant === 'warning' ? 'alert' : 'status';
  return (
    <div
      role={role}
      className={`not-prose flex items-start gap-3 rounded-control border px-4 py-3.5 sm:px-5 sm:py-4 ${classes} ${className}`}
      {...rest}
    >
      <Icon icon={icon} size={20} className={`mt-px shrink-0 ${iconCls}`} />
      <div className="min-w-0 text-small">
        {title && <p className="font-semibold text-fg">{title}</p>}
        <div className={title ? 'mt-1' : ''}>{children}</div>
      </div>
    </div>
  );
}
