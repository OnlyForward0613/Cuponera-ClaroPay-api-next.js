import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import Image from "next/image";
import { GoArrowLeft } from "react-icons/go";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const iconStyle = {
  width: "24px",
  height: "24px",
};

// And then you cna use them in the page, it should load them, got it. but problems are below
const ProductDetail = ({
  product,
  setSelectedProduct,
  setShowProductDetail,
}) => {
  const [localCart, setLocalCart] = useState(() => {
    const storedCart = localStorage.getItem("localCart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const router = useRouter();
  const handleReturn = () => {
    setSelectedProduct({});
    setShowProductDetail(false);
  };

  const handleButton = async (product) => {
    const productState = {
      cardNumber: "1",
      idCom: "0074",
      idGrp: "0002",
      checkDigit: "1",
      amount: product.precio,
      appId: "Recarga",
    };
    console.log("here:", product);
    const stateId = localStorage.getItem("stateId");

    // router.push({
    //   pathname: "/buy",
    //   query: {
    //     productId: product.id,
    //     quantity: 1,
    //     stateId: stateId,
    //   },
    // });
    import("@claro/sdkclaro").then(async (sdkclaro) => {
      let tmp = await sdkclaro.getInstance("Cuponera");
      let tmp2 = Object.keys(tmp.bridge.functionResponse);
      setTimeout(() => {
        tmp2 = Object.keys(tmp.bridge.functionResponse);
        console.log("temp: ", tmp2);
        productState.appId = tmp2[0].slice(0, 36);
        console.log("productState: ", productState);
      }, 500);
  
      await sdkclaro.getInstance("Cuponera").setState(
        productState,
        (result) => {
          console.log("stateResult: ", result);
        },
        (error) => {
          console.log("error: ", error);
        }
      );
  
      await sdkclaro.getInstance("Cuponera").transactionPayment(
        {
          amount: product.precio,
          category: "MA",
          claroUserId: "36d4eff7-5334-4f2d-b8a8-ef88b6d90777",
          concept: "9e045213",
          description: "IMDM24594221",
          feeAmount: 0,
          logo: product.img,
          merchantId: "000000008b880061018bb134f81d0007",
          operationId: productState.appId,
          payProcessor: { id: 1, name: "N2", showCVVV: false },
          refNumber: "",
          reference: "IMDM24594221",
          totalCommission: 0,
        },
        (result) => {
          console.log('transactionPayment: ', result);
          router.push({
            pathname: "/buy",
            query: {
              productId: product.id,
              quantity: 1,
              stateId: stateId,
            },
          });
          sdkclaro
            .getInstance(
              "Cuponera",
              (eventName, eventInformation) => {
                console.log("eventInformation: ", eventInformation, eventName);
                if (eventName === "ONBACK") {
                  window.history.back();
                }
                if (eventName === "otp_response") {
                  dispatch(saveSession(true));
                }
                if (eventName === "responseRecharge") {
                  console.log(eventInformation, "Log responseRecharge");
                  store.dispatch({
                    type: "DATA_RESPONSE_RECHARGE",
                    payload: eventInformation,
                  });
  
                  const stateId = localStorage.getItem("stateId");
  
                  router.push({
                    pathname: "/buy",
                    query: {
                      productId: product.id,
                      quantity: 1,
                      stateId: stateId,
                    },
                  });
                }
              },
              {}
            )
            .switchGoBackButton(false);
        },
        (error) => {
          console.log(error);
        }
      );

    });
  };

  const handleAddCart = () => {
    const updatedCart = [...localCart, product];
    setLocalCart(updatedCart);
    localStorage.setItem("localCart", JSON.stringify(updatedCart));

    toast.success("Producto añadido al carrito correctamente", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div>
      <div
        className="px-5 cursor-pointer"
        style={{ width: "32px" }}
        onClick={handleReturn}
      >
        <GoArrowLeft style={iconStyle} />
      </div>
      <div
        className="relative w-full overflow-hidden bg-blue-300"
        style={{ height: "224px", marginTop: "24px" }}
      >
        <Image
          src={product?.img}
          layout="fill"
          object-fit="fill"
          alt="banner promocional"
        />
      </div>
      <div className="w-full px-5 pt-10">
        <div className="flex items-center justify-between w-full">
          <div>
            <p className="text-base font-bold">
              {decodeURIComponent(escape(product?.nombre))}
            </p>
            {/* <p>(Marca)</p> */}
          </div>
          <div>
            <p className="text-[#DCA927] font-bold text-2xl">
              ${product?.precio}
            </p>
          </div>
        </div>
        <div className="pt-4">
          <p className="text-[#DCA927] font-semibold text-base">Detalles</p>
          <div className="mt-2">
            <p className="text-[#9095A6] ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              viverra maximus nibh, ut consectetur neque maximus ac. Nullam sit
              amet Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Maecenas viverra maximus nibh, ut consectetur neque maximus ac.{" "}
            </p>
          </div>
        </div>

        <div className="absolute flex flex-col gap-5 left-5 right-5 bottom-8">
          <Button
            text={"Comprar"}
            onClick={() => handleButton(product)}
            type={"button"}
          />

          <Button
            text={"Agregar al Carrito"}
            onClick={handleAddCart}
            type={"button"}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;