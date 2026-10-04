import {
  forwardRef,
  useId,
  useRef,
  useState,
  type DragEvent,
  type InputHTMLAttributes,
} from 'react';
import { UploadSimple } from '@phosphor-icons/react';
import { Icon } from '../icons/Icon';

export interface FileUploadProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'type' | 'value' | 'children'
  > {
  label?: string;
  hint?: string;
  error?: string;
  /** Dipanggil dengan daftar file yang dipilih / di-drop. */
  onFiles?: (files: FileList) => void;
}

/**
 * Dropzone upload file Kahade.
 */
export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      id: idProp,
      label,
      hint,
      error,
      required,
      accept,
      multiple,
      disabled,
      onFiles,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragOver, setDragOver] = useState(false);

    const handleFiles = (files: FileList | null) => {
      if (files && files.length > 0) onFiles?.(files);
    };

    const onDrop = (e: DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      setDragOver(false);
      if (!disabled) handleFiles(e.dataTransfer.files);
    };

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <span className="mb-1.5 block text-sm font-semibold text-black">
            {label}
            {required && <span className="text-red-600"> *</span>}
          </span>
        )}
        <label
          htmlFor={id}
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled) setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={[
            'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-10 text-center',
            'transition-colors duration-150',
            error
              ? 'border-red-400 bg-red-50/50'
              : dragOver
                ? 'border-black bg-neutral-50'
                : 'border-neutral-300 bg-white hover:border-neutral-400 hover:bg-neutral-50/50',
            disabled ? 'cursor-not-allowed opacity-60' : '',
          ].join(' ')}
        >
          <Icon
            icon={UploadSimple}
            size={28}
            className={error ? 'text-red-500' : 'text-neutral-400'}
          />
          <span className="text-sm font-semibold text-black">
            Seret file ke sini atau <span className="underline">klik untuk pilih</span>
          </span>
          {hint && !error && (
            <span className="text-xs text-neutral-500">{hint}</span>
          )}
          {error && (
            <span className="text-xs text-red-600" role="alert">
              {error}
            </span>
          )}
        </label>
        <input
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          className="sr-only"
          onChange={(e) => handleFiles(e.target.files)}
          {...rest}
        />
      </div>
    );
  },
);
FileUpload.displayName = 'FileUpload';
