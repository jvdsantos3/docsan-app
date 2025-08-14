import { useState, type ComponentProps } from 'react'
import { Input } from '@/components/ui/input'
import { CircleXIcon, SearchIcon } from 'lucide-react'

interface SearchInputProps extends ComponentProps<'input'> {
  value?: string
  onValueChange?: (value: string) => void
}

export const SearchInput = ({
  placeholder,
  ref,
  value,
  onValueChange,
  ...props
}: SearchInputProps) => {
  const [internalValue, setInternalValue] = useState('')

  const currentValue = value !== undefined ? value : internalValue

  const setValue = (val: string) => {
    if (onValueChange) onValueChange(val)
    if (value === undefined) setInternalValue(val)
  }

  const handleClearInput = () => {
    setValue('')
    if (ref && typeof ref !== 'function' && ref?.current) {
      ref.current.focus()
    }
  }

  return (
    <div className="relative">
      <Input
        ref={ref}
        value={currentValue}
        className="peer ps-9 pe-9"
        placeholder={placeholder || 'Search...'}
        type="text"
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
        <SearchIcon size={16} />
      </div>
      {currentValue && (
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Clear input"
          onClick={handleClearInput}
        >
          <CircleXIcon size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
