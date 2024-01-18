import Image from "next/image"


const CategoryCarousel = ({ categories }) => {

  return (
    <div>
      <p className="pb-4 text-base font-regular">Categorías</p>

      <div className="w-full max-w-[100%] overflow-hidden pb-1">
        <div className="flex w-full gap-5 overflow-x-auto">
          {
            categories.map((category) => (
              <div key={category.id} className="flex flex-col items-center justify-center gap-1 text-center w-fit">
                <div className="rounded-full bg-[#F6F6F6] w-14 h-14 max-h-14 max-w-[56px] overflow-hidden relative">
                  <Image
                    src={category.img}
                    layout="fill"
                    object-fit="cover"
                    alt="banner promocional"
                  />
                </div>
                <p className="text-sm font-normal">{category.name}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default CategoryCarousel
