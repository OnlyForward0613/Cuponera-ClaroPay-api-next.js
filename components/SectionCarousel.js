import { Fragment, useState } from "react"

import Image from "next/image"
import ListProducts from "@/views/ListProducts"

const SectionCarousel = ({ groupedCategories }) => {

  const [selectedBrand, setSelectedBrand] = useState({})
  const [currentCategory, setCurrentCategory] = useState('')
  const [showListProducts, setShowListProducts] = useState(false)

  const selectBrand = (brand, item) => {
    setCurrentCategory(item.nombre)
    setSelectedBrand(brand)
    setShowListProducts(true)
  }

  return (
    <Fragment>
      <div className="flex flex-col gap-6">
        {
          groupedCategories.map((item, i) => (
            <div key={i++}>
              <p className="pb-4 text-base font-regular">{item.nombre}</p>

              <div className="w-full max-w-[100%] overflow-hidden pb-1">
                <div className="flex w-full gap-5 overflow-x-auto">
                  {
                    item?.objetos.map((object, i) => (
                      <div key={i++} className="flex flex-col gap-1 text-center w-fit">
                        <div
                          style={{ backgroundColor: object.marca.color }}
                          className="rounded-lg w-24 h-24 max-h-24 max-w-[96px] overflow-hidden relative cursor-pointer"
                          onClick={() => selectBrand(object, item)}
                        >
                          <Image
                            src={object.marca.img}
                            layout="fill"
                            object-fit="cover"
                            alt="banner promocional"
                          />
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          ))
        }
      </div>

      {
        showListProducts
          ? <div className='fixed inset-0'>
            <div className="w-full h-full min-h-screen bg-[#FFFCF5]">
              <ListProducts
                currentCategory={currentCategory}
                setCurrentCategory={setCurrentCategory}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                setShowListProducts={setShowListProducts}
              />
            </div>
          </div>
          : null
      }
    </Fragment>
  )
}

export default SectionCarousel
