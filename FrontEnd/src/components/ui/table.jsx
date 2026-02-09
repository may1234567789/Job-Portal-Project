import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef(function Table(
  { className, ...props },
  ref
) {
  return (
    <div className="w-full overflow-auto">
      <table
        ref={ref}
        className={cn("w-full caption-bottom text-sm", className)}
        {...props} />
    </div>
  )
})
Table.displayName = "Table"

const TableHeader = React.forwardRef(function TableHeader(
  { className, ...props },
  ref
) {
  return (
    <thead
      ref={ref}
      className={cn("[&_tr]:border-b", className)}
      {...props} />
  )
})
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef(function TableBody(
  { className, ...props },
  ref
) {
  return (
    <tbody
      ref={ref}
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props} />
  )
})
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef(function TableFooter(
  { className, ...props },
  ref
) {
  return (
    <tfoot
      ref={ref}
      className={cn(
        "border-t bg-slate-50/60 dark:bg-slate-900/60 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props} />
  )
})
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef(function TableRow(
  { className, ...props },
  ref
) {
  return (
    <tr
      ref={ref}
      className={cn(
        "border-b transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-800/60 data-[state=selected]:bg-slate-100 dark:data-[state=selected]:bg-slate-800",
        className
      )}
      {...props} />
  )
})
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef(function TableHead(
  { className, ...props },
  ref
) {
  return (
    <th
      ref={ref}
      className={cn(
        "h-10 px-2 text-left align-middle font-medium text-slate-600 dark:text-slate-300 [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props} />
  )
})
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef(function TableCell(
  { className, ...props },
  ref
) {
  return (
    <td
      ref={ref}
      className={cn("p-2 align-middle [&:has([role=checkbox])]:pr-0", className)}
      {...props} />
  )
})
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef(function TableCaption(
  { className, ...props },
  ref
) {
  return (
    <caption
      ref={ref}
      className={cn("mt-4 text-sm text-slate-500 dark:text-slate-400", className)}
      {...props} />
  )
})
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
