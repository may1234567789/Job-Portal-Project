import React from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi","Banglore","Chennai","Pune","Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer","Backend Developer","FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["<3 Lakh","3-7 Lakh" ,"7-10 Lakh",">10 Lakh"]
  }
]

const Filter = () => {
  return (
    <div>
      {filterData.map((data, filterIndex) => (
        <div key={data.filterType} className="mb-6">
          <h4 className="mb-3 font-semibold">{data.filterType}</h4>
          <RadioGroup className="w-fit">
            {data.array.map((item, itemIndex) => {
              const id = `${data.filterType}-${filterIndex}-${itemIndex}`
              return (
                <div key={id} className="flex items-center gap-3">
                  <RadioGroupItem value={item} id={id} />
                  <Label htmlFor={id}>{item}</Label>
                </div>
              )
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  )
}

export default Filter;
