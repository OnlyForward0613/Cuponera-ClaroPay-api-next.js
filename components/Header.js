import { useState, useEffect } from "react";
import Image from "next/image";

const Header = ({ title, showCart = true }) => {
  const [localCart, setLocalCart] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('localCart');
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  // Suscribe a cambios en el localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      if (typeof window !== 'undefined') {
        const storedCart = localStorage.getItem('localCart');
        setLocalCart(storedCart ? JSON.parse(storedCart) : []);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', handleStorageChange);
      }
    };
  }, []);

  const navigateToCart = () => {
    window.location.href = '/carrito';
  };

  return (
    <div className="w-full flex justify-between h-[90px] p-3 items-end bg-[#DCA927]">
      <div />
      <p className="font-medium text-lg text-[#23272A]">{title}</p>

      {showCart && localCart.length > 0 ? (
        <div className="relative w-5 h-5 rounded-full cursor-pointer" onClick={navigateToCart}>
          <div className="absolute top-[-12px] right-[-8px] bg-[#2D2D2D] h-4 w-4 flex justify-center items-center rounded-full">
            <p className="text-xs font-medium text-white">
              {localCart && localCart.length > 9 ? '9+' : localCart.length}
            </p>
          </div>
          <Image src="/icons/bag2.png" alt="Bag Icon" width={16} height={16} layout="responsive" />
        </div>
      ) : <div />}
    </div>
  );
};

export default Header;
