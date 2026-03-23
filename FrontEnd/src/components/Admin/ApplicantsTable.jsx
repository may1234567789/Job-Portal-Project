import React from 'react'
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from '../ui/table' 
import { Popover } from 'radix-ui'
import axios from 'axios'

const shortlistingStatus = ['Shortlisted', 'Rejected']
const ApplicantsTable = () => {
  const {applicants} = useSelector((state) => state.application)
  const statusHandler = async (status,id) => {
    try{
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},{withCredentials: true})
      if(res.data.success){
        toast.success(res.data.message)
      }
    } catch (error) {
      console.error('Error updating shortlisting status:', error)
    }
  }
  return (
    <div>
      <Table>
        <TableCaption>Applicants for this job</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-left">Email</TableHead>
            <TableHead className="text-left">Phone</TableHead>
            <TableHead className="text-left">Resume</TableHead>
            <TableHead className="text-left">Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            applicants && applicants?.applicants.map((item) => {
              return (
                <tr key={item._id}>
            <TableCell className="text-left">{item?.applicants?.name}</TableCell>
            <TableCell className="text-left">{item?.applicants?.email}</TableCell>
            <TableCell className="text-left">{item?.applicants?.phone}</TableCell>
            <TableCell className="text-left"><a href={item?.applicants?.profile?.resume} target="_blank" rel="noopener noreferrer">Download</a></TableCell>
            <TableCell className="text-left">{item?.applicants?.date}</TableCell>
            <TableCell className="text-right">
              <Popover>
                <PopoverTrigger className="px-4 py-2 bg-blue-500 text-white rounded">Shortlist</PopoverTrigger>
                <PopoverContent>
                  {
                shortlistingStatus.map((status,index) => {
                  return (
                    <div onClick = {() => statusHandler(status, item._id)} key = {index}>
                      <span>{status}</span>
                    </div>
                  )
                })
              }
                </PopoverContent>
              </Popover>
              
            </TableCell>

          </tr>
              )
            })
          }
          
        </TableBody>
      </Table>
    </div>
  )
}

export default ApplicantsTable