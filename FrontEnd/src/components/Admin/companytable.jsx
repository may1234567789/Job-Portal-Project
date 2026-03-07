import { Edit2, MoreHorizontal } from 'lucide-react'
import React from 'react'
import { Table, TableCaption, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

function ComapniesTable() {
  return (
    <div>
        <Table className='w-6 h-6' >
            <TableCaption>List of companies</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <Avatar>
                            <AvatarImage src=""/>
                        </Avatar>
                    </TableCell>
                    <TableCell>Star Technology</TableCell>
                    <TableCell>10-12-2024</TableCell>
                    <TableCell className="text-right cursor-pointer">
                        <Popover>
                            <PopoverContent className="w-40">
                                <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                                <div>
                                    <Edit2 className="inline mr-2"/>
                                    <span>Edit</span>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
  )
}

export default ComapniesTable