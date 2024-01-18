import { Fragment } from "react"
import Image from "next/image"

import { AiOutlineShopping } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = ({
  product,
  selectProduct,
  isCart = false,
  localCart,
  setLocalCart
}) => {


  const removeFromCart = (productToRemove) => {
    // Filtra el array para excluir el producto que se va a eliminar
    const updatedCart = localCart.filter(product => product.id !== productToRemove.id);

    // Actualiza el estado y el localStorage con el nuevo array
    setLocalCart(updatedCart);
    localStorage.setItem('localCart', JSON.stringify(updatedCart));

    toast.error('Producto borrado del carrito correctamente', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };


  return (
    <Fragment>
      <div
        onClick={() => !isCart ? selectProduct(product) : null}
        className={`bg-[#F4F4F4] rounded-lg aspect-w-10 aspect-h-11 ${!isCart && 'cursor-pointer'}`}>
        <div className="h-[113px] rounded-t-lg bg-blue-100 w-full relative overflow-hidden">
          {
            isCart ? <div className="absolute z-50 text-red-500 cursor-pointer top-1 right-1" onClick={removeFromCart}>
              <AiFillCloseCircle className="text-2xl" />
            </div> : null
          }
          <Image
            src={product?.img}
            layout="fill"
            object-fit="cover"
            alt="banner promocional"
          />
        </div>
        <div className="relative p-2">
          <p className="text-sm font-normal">{product?.nombre}</p>
          <p className="text-base font-semibold">${product?.precio}</p>

          <div className="absolute bottom-2 right-2 h-6 w-6 bg-[#DCA927] text-white flex justify-center items-center rounded-lg">
            <AiOutlineShopping />
          </div>
        </div>
      </div>

      <ToastContainer />
    </Fragment>
  )
}

export default ProductCard
