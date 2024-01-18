import { useState } from "react";
import { useLocalStorage } from "react-use";

import Header from '@/components/Header';
import ProductCard from "@/components/ProductCard";
import Button from "@/components/Button";

const CartPage = () => {
  // Use useLocalStorage hook from react-use to manage localCart
  const [localCart, setLocalCart] = useLocalStorage('localCart', []);

  // console.log('localCart::', localCart);

  return (
    <div className="pb-[120px]">
      <Header title='Carrito de compras' showCart={false} />

      <div className="grid grid-cols-2 gap-3 px-5 mt-3">
        {localCart.map((product, i) => (
          <div key={i} className="w-full">
            <ProductCard
              product={product}
              isCart={true}
              localCart={localCart}
              setLocalCart={setLocalCart}
            />
          </div>
        ))}
      </div>

      <div className="fixed flex flex-col gap-5 left-5 right-5 bottom-8">
        <Button text={'Comprar'} type={'button'}/>
      </div>
    </div>
  );
};

export default CartPage;