import { forwardRef, useEffect, useState } from 'react'
import { Button } from './button'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useDebounce } from '@/hooks/use-debounce'
import { Skeleton } from './skeleton'
import { cn } from '@/lib/utils'
import type { PopoverContentProps } from '@radix-ui/react-popover'

export interface ComboBoxItem {
  value: string
  label: string
}

export interface ComboBoxProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onChange'> {
  items: ComboBoxItem[]
  value?: string
  onChange?: (value: string) => void
  onSearch?: (query: string) => void
  isLoading?: boolean
  // open?: boolean
  // setOpen?: (open: boolean) => void
  placeholder?: string
  selectedItem?: ComboBoxItem
  emptyMessage?: string
  commandInputPlaceholder?: string
  contentClassName?: string
  delay?: number
  className?: string
  disabled?: boolean
  align?: PopoverContentProps['align']
  shouldFilter?: boolean
}

export const ComboBox = forwardRef<HTMLButtonElement, ComboBoxProps>(
  (
    {
      items,
      placeholder,
      value,
      selectedItem,
      onChange,
      onSearch,
      className,
      emptyMessage,
      commandInputPlaceholder,
      contentClassName,
      delay = 0,
      disabled = false,
      isLoading = false,
      align = 'center',
      shouldFilter = true,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(selectedItem)
    const [searchQuery, setSearchQuery] = useState('')
    const debouncedSearchQuery = useDebounce(searchQuery, delay)

    const label =
      selected && value === selected.value
        ? selected.label
        : value
          ? items.find((item) => item.value === value)?.label
          : placeholder

    const handleSelect = (value: string) => {
      setSelected(items.find((item) => item.value === value))
      if (onChange) {
        onChange(value)
      }
      setOpen(false)
    }

    useEffect(() => {
      if (onSearch) {
        onSearch(debouncedSearchQuery)
      }
    }, [debouncedSearchQuery, onSearch])

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              'border-input w-[200px] justify-between flex shrink',
              className,
            )}
            {...props}
          >
            <span
              className={cn(
                'line-clamp-1 flex items-center gap-2',
                !selected && !value && 'text-muted-foreground',
              )}
            >
              {label ?? 'Select...'}
            </span>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn('w-[200px] p-0', contentClassName)}
          align={align}
        >
          <Command shouldFilter={shouldFilter}>
            <CommandInput
              placeholder={commandInputPlaceholder ?? 'Search...'}
              className="h-9"
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              {isLoading ? (
                <CommandGroup>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <CommandItem key={i}>
                      <Skeleton className="w-32 h-4 rounded-full" />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : items.length === 0 ? (
                <CommandEmpty>{emptyMessage ?? 'No results.'}</CommandEmpty>
              ) : (
                <CommandGroup>
                  {items.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={handleSelect}
                    >
                      {item.label}
                      <Check
                        className={cn(
                          'ml-auto h-4 w-4',
                          value === item.value ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  },
)
