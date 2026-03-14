'use client'

import * as React from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { Dialog } from 'radix-ui'
import { cn } from '@/lib/utils/shadcn'

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn('flex h-full w-full flex-col bg-background text-foreground', className)}
    {...props}
  />
))

Command.displayName = CommandPrimitive.displayName

const CommandDialog = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Dialog> & {
    description?: string
    title?: string
  }
>(({ children, className, contentClassName, description, overlayClassName, title, ...props }, ref) => (
  <CommandPrimitive.Dialog
    ref={ref}
    className={cn('bg-background text-foreground', className)}
    overlayClassName={cn('fixed inset-0 bg-background/72', overlayClassName)}
    contentClassName={cn(
      'fixed top-1/2 left-1/2 z-50 max-h-[calc(100vh-1rem)] w-[calc(100vw-1rem)] max-w-[42rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-border bg-background sm:max-h-[calc(100vh-2rem)] sm:w-[min(92vw,42rem)] sm:rounded-2xl',
      contentClassName,
    )}
    {...props}
  >
    <Dialog.Title className="sr-only">{title ?? 'Command Menu'}</Dialog.Title>
    <Dialog.Description className="sr-only">
      {description ?? 'Use the search input to find and open an item.'}
    </Dialog.Description>
    {children}
  </CommandPrimitive.Dialog>
))

CommandDialog.displayName = 'CommandDialog'

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Input
    ref={ref}
    className={cn(
      'flex h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
))

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn('overflow-x-hidden overflow-y-auto', className)}
    {...props}
  />
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className={cn('px-4 py-8 text-center text-muted-foreground text-sm', className)}
    {...props}
  />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'overflow-hidden p-2 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.18em]',
      className,
    )}
    {...props}
  />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn('-mx-2 my-2 h-px bg-border', className)}
    {...props}
  />
))

CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-start gap-3 rounded-lg px-3 py-3 outline-none transition-colors data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-accent',
      className,
    )}
    {...props}
  />
))

CommandItem.displayName = CommandPrimitive.Item.displayName

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
}
