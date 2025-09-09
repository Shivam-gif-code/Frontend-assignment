import React, { useState } from 'react'

export type InputFieldProps = {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder?: string
  helperText?: string
  errorMessage?: string
  disabled?: boolean
  invalid?: boolean
  variant?: 'filled' | 'outlined' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  type?: string
  showClear?: boolean
  showPasswordToggle?: boolean
}

const sizeClasses = {
  sm: 'text-sm py-1 px-2',
  md: 'text-base py-2 px-3',
  lg: 'text-lg py-3 px-4',
}

export default function InputField({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  showClear = true,
  showPasswordToggle = true,
}: InputFieldProps) {
  const [internal, setInternal] = useState(value ?? '')
  const [showPwd, setShowPwd] = useState(false)
  const isPassword = type === 'password'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternal(e.target.value)
    onChange?.(e)
  }

  const base = "w-full rounded-md transition-shadow outline-none"
  const variantClass = variant === 'filled'
    ? 'bg-gray-100 border border-transparent'
    : variant === 'ghost'
    ? 'bg-transparent border border-transparent'
    : 'bg-white border border-gray-300'

  return (
    <div className="w-full">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <div className={`relative ${disabled ? 'opacity-60 cursor-not-allowed' : 'focus:ring-2'}`}>
        <input
          aria-invalid={invalid || undefined}
          aria-disabled={disabled || undefined}
          className={`${base} ${variantClass} ${sizeClasses[size]} ${invalid ? 'ring-2 ring-red-400' : ''}`}
          placeholder={placeholder}
          value={internal}
          onChange={handleChange}
          disabled={disabled}
          type={isPassword && showPwd ? 'text' : type}
        />
        {showClear && !disabled && internal && (
          <button
            aria-label="Clear input"
            onClick={() => { setInternal(''); onChange?.({ target: { value: '' } } as any) }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm"
            type="button"
          >✖</button>
        )}
        {isPassword && showPasswordToggle && (
          <button
            aria-label="Toggle password visibility"
            onClick={() => setShowPwd(s => !s)}
            className="absolute right-8 top-1/2 -translate-y-1/2 text-sm"
            type="button"
          >{showPwd ? 'Hide' : 'Show'}</button>
        )}
      </div>
      {helperText && !invalid && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
      {invalid && errorMessage && <p className="mt-1 text-sm text-red-600">{errorMessage}</p>}
    </div>
  )
}