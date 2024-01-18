
import { GoArrowLeft } from "react-icons/go"

import Header from '@/components/Header'
import GridProductCard from "@/components/GridProductCard"

const ListProducts = ({
  currentCategory,
  setCurrentCategory,
  selectedBrand,
  setSelectedBrand,
  setShowListProducts
}) => {

  const iconStyle = {
    width: '24px',
    height: '24px',

  };

  const returnHome = () => {
    setCurrentCategory('')
    setSelectedBrand({})
    setShowListProducts(false)
  }

  return (
    <div className='flex flex-col w-full h-full gap-3'>
      <Header title={currentCategory} />
      <div className="px-5 cursor-pointer" style={{ marginTop: '12px', width: '32px' }} onClick={returnHome}>
        <GoArrowLeft style={iconStyle} />
      </div>
      <div>
        <GridProductCard selectedBrand={selectedBrand} />
      </div>

    </div>
  )
}

export default ListProducts
