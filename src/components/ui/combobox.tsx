import { forwardRef, useEffect, useId, useState } from 'react'
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

export interface ComboBoxItem {
  value: string
  label: string
}

export interface ComboBoxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: ComboBoxItem[]
  // value?: string
  onChange?: (value: string) => void
  onSearch?: (query: string) => void
  isLoading?: boolean
  // open?: boolean
  // setOpen?: (open: boolean) => void
  placeholder?: string
  selectedItem?: ComboBoxItem
  emptyMessage?: string
  commandInputPlaceholder?: string
  delay?: number
  className?: string
}

export const ComboBox = forwardRef<HTMLButtonElement, ComboBoxProps>(
  (
    {
      items,
      placeholder,
      // value,
      selectedItem,
      onChange,
      onSearch,
      isLoading = false,
      className,
      emptyMessage,
      commandInputPlaceholder,
      delay = 0,
    },
    ref,
  ) => {
    const id = useId()
    const [open, setOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const debouncedSearchQuery = useDebounce(searchQuery, delay)

    const selectedLabel = selectedItem?.label || placeholder
    const handleSelect = (value: string) => {
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
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              'border-input w-[200px] justify-between text-muted-foreground flex shrink',
              className,
            )}
          >
            <span className="line-clamp-1 flex items-center gap-2">
              {selectedLabel ?? 'Select...'}
            </span>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
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
                          // value === item.value ? 'opacity-100' : 'opacity-0',
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
