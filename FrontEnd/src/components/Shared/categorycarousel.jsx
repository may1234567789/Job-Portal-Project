import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel"
import { Button } from '../ui/button'
import './css/carousel.css'

const category = ["Frontend Developers", "Backend Developer", "Data Science", "Graphic Designer", "Cloud Computing", "Cyber Security", "Managment"]

const CategoryCarousel = () => {
  return (
    <div>
      <div className='carousel-body'> 
        <Carousel>
          <CarouselContent>
            {
              category.map((cat, index) => {
                return (
                  <CarouselItem className="basis-1/4" key={index}>
                    <Button>{cat}</Button>
                  </CarouselItem>
                )
              })
            }
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

    </div>
  )
}

export default CategoryCarousel