import { Fragment, useState } from "react"

import ProductDetail from "@/views/ProductDetail"
import ProductCard from "./ProductCard"


const GridProductCard = ({ selectedBrand }) => {

  const [selectedProduct, setSelectedProduct] = useState({})
  const [showProductDetail, setShowProductDetail] = useState(false)

  const selectProduct = (product) => {
    setSelectedProduct(product)
    setShowProductDetail(true)
  }

  return (
    <Fragment>
      <div className="grid grid-cols-2 gap-3 px-5 mt-3">
        {
          selectedBrand?.productos.map((product, i) => (
            <div key={i++} className="w-full" >
              <ProductCard product={product} selectProduct={selectProduct} />
            </div>
          ))
        }
      </div>
      {
        showProductDetail
          ? <div className='absolute inset-0'>
            <div className="w-full h-full min-h-screen bg-[#FFFCF5] pt-5">
              <ProductDetail
                product={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                setShowProductDetail={setShowProductDetail}
              />
            </div>
          </div>
          : null
      }
    </Fragment>
  )
}

export default GridProductCard
