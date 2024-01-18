import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
const Header = dynamic(import("@/components/Header"));
const PromotionalBanner = dynamic(import("@/components/PromotionalBanner"));
const CategoryCarousel = dynamic(import("@/components/CategoryCarousel"));
const SectionCarousel = dynamic(import("@/components/SectionCarousel"));

const inter = Inter({ subsets: ["latin"] });

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home({
  promotionsCategories,
  banner,
  dynamicCategories,
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);

    import("@claro/sdkclaro").then(async (sdkclaro) => {
      await sdkclaro.getInstance(
        "Cuponera",
        () => {
          console.log("onLaunch");
        },
        () => {
          console.log("onShow");
        },
        () => {
          console.log("onHide");
        },
        () => {
          console.log("onError");
        },
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
            router.replace("/buy");
          }
        },
        {}
      );
    });
  }, []);

  const groupByCategory = (categorias) => {
    return categorias.reduce((resultado, categoria) => {
      const nombreCategoria = categoria.marca.categoria.nombre;

      const categoriaExistente = resultado.find(
        (item) => item.nombre === nombreCategoria
      );

      if (!categoriaExistente) {
        resultado.push({
          nombre: nombreCategoria,
          objetos: [categoria],
        });
      } else {
        categoriaExistente.objetos.push(categoria);
      }

      return resultado;
    }, []);
  };

  const groupedCategories = groupByCategory(promotionsCategories);

  console.log("dynamicCategories", dynamicCategories);
  console.log("promotionsCategories", promotionsCategories);
  if (!mounted) return <></>;
  return (
    (typeof window !== "undefined" &&
    window !== undefined &&
    mounted) && (
      <main className={`${inter.className}`}>
        <div className="w-full max-w-[500px] h-screen">
          <div className="flex flex-col gap-6">
            <Header title="Home" />

            <div className="px-5">
              <PromotionalBanner banner={banner} />
            </div>

            <div className="pl-5">
              <CategoryCarousel categories={dynamicCategories} />
            </div>

            <div className="pl-5">
              <SectionCarousel groupedCategories={groupedCategories} />
            </div>
          </div>
        </div>
      </main>
    )
  );
}


// You need to use this defined function to send a request to the API because it comes from another domain, okay, let me see.
export async function getServerSideProps(context) {
  const { query } = context;
  const state = query.state;

  // These are also endpoints
  const urls = [
    `https://api-dev.cuponerapp.com/v2/estados/${state}/promociones`,
    `https://api-dev.cuponerapp.com/v2/estados/${state}/banners`,
    `https://api-dev.cuponerapp.com/v2/estados/${state}/dinamicas`,
  ];

  // This is the required header for authorization
  const headers = {
    Authorization:
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjU4NzU2NTIwMmMyMjc0N2M5M2QzZGEyOWU3NzFhYjc5ODkxZmU1Y2M2ZDQwNzllMjQ5NjMwNGEyZDdmYTVjMjFkMmI4M2QxYmE4ODUyYTEwIn0.eyJhdWQiOiIxIiwianRpIjoiNTg3NTY1MjAyYzIyNzQ3YzkzZDNkYTI5ZTc3MWFiNzk4OTFmZTVjYzZkNDA3OWUyNDk2MzA0YTJkN2ZhNWMyMWQyYjgzZDFiYTg4NTJhMTAiLCJpYXQiOjE3MDU1MjA0NjQsIm5iZiI6MTcwNTUyMDQ2NCwiZXhwIjoxNzM3MTQyODY0LCJzdWIiOiI0Nzg1MzQiLCJzY29wZXMiOltdfQ.kBgH5pjtXL038BwBbo0QJB753l9r0sDD59rvV1JdA_Z520s6zm63HLonSOl6RMS0wVv9ORp5ZAQneVKyfw3hBpqhl7TAHfamhFVNjVIToIsdUVtR06AFYGP2pxTiANtW_G8zGHQqOy-RZbMQfEfzT0d0LsPNQMxl5R43OgATbUBl0EWrrC1x6LgFB5ut54Ekz55UZMfkICcxNi6RPL_zRWSTQlbGR3BO3vRIW15tSmOlT9QFEgXwkTkIYaCNaeJ2gb2rwthcVgdtgQO4AThjH_yZt99eT7awYBrmc20-mjbZ7XFbv4rYaNkj7BUysaqyC27FjrXaJ-Q3MSBhGxxl9eB3QGDMNtiRqZAmfYT1FIzaB9m1_-MgFvV_uNEyQyoYIyhXgdViF-Qy9b-2XZcFlx0T7VkhgBslkWfRW4qZQdji9Q-aaDThnZWDXM2isYJdGSEA3hHIxnWU6OSxnM_vHmmfX_b-kYwvxdzcVqzV3ZJzPQDDBbS7nQ_c-1_fvkXwvQw4xK3cMXD9VduK4bihBbttQ_hD4KarWGX0MVUTD7mxPKaOH54FMvmCEL_zj86Dg2OliL4n85fDfyuOCEfqVMhfVArsl2WChUhxgWRURQhB5W4U_WuzrdX8_Z5Jmv2Hqm8shg6pQMLpqg_M5XFcluPhzLZoeMNUX16YGeV2IAs",
      // "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImJjMGE4NGE5NDc2ODM4ZmZiZjFiMmQxMzVhZmMwOGM2YWZkNzdlNDZhYjE0ODdiMDY2NzJmNWYyY2E3NTQ4MDA1NDJmNzljYTBlN2JkNzI3In0.eyJhdWQiOiIxIiwianRpIjoiYmMwYTg0YTk0NzY4MzhmZmJmMWIyZDEzNWFmYzA4YzZhZmQ3N2U0NmFiMTQ4N2IwNjY3MmY1ZjJjYTc1NDgwMDU0MmY3OWNhMGU3YmQ3MjciLCJpYXQiOjE3MDM4ODgwMTUsIm5iZiI6MTcwMzg4ODAxNSwiZXhwIjoxNzM1NTEwNDE0LCJzdWIiOiI2MjA5MTYiLCJzY29wZXMiOltdfQ.0400xfzee-3naSMZIcOeljmQR_7wQfWZct9EiBjUTbLrL_ENpqqEqqcqBNOmLNu-9YNOe0fbHxMCs-HLu7-aiGxCPSXE4qOIVL11fXIIVNFIpVv1qOV3MF-BKBo0IUd5S6g0nTt_pZ3bBc9-PUzEHTHFfi3uzO9DZQQn_uiTxyLocRnkSaVv-7HoKI61yh8mTB2eyao0NTUSeqhstbroINcl5CPJ78WPvfW46HMUC7jKC71iX6yh8H4tvmtAn-MrIE2MaSdt0HVRDh_-zdpU3JkvqFWq4nADaspLRsif4bopxhnQEEgRWJGFF6I3GHSa0UkSkwSWcCcJyqlVOqoHwzRT-SqyhWrnIHyvm0sEOwwOArOxV6aYI9IIoji2pDO-WDp0hZz_MOXn7QqhJFDlmnlWY7NdDp4B9GlPgyrsHeNZrr1SS2JQEXAm82eVEzrghP3n879JwsUoJTYEmjLVteens1m0_CzYR__qVDSGeStJAzm30J40Ahg3Zf8P0HxP5qmqc1JG7U0t68CWuPNZZNiuPnX2uhtVkRPg7WZFeRXVd87a-gde58mEwM3HaHAvuQJSmTEH3cp5yUYsMmgXzdybrGZWGgSVu4NziDR5U7Nsjlce53CNPAw9M2iyqf98ktNjIB1dcqtIYLfrqpMYx9CEVVoOrRwZb14DdDWz5ZE",
  };

  // Here you send a request with axios, here they used a map for the urls but you could use only a variable
  const requests = urls.map((url) => axios.get(url, { headers }));

  try {
    // Here is how they processed the responses, you could also log
    const responses = await Promise.all(requests);

    const promotionsCategories = responses[0].data;
    const banner = responses[1].data;
    const dynamicCategories = responses[2].data;

    return {
      props: {
        // Here is the variables that you use in the view
        promotionsCategories,
        banner,
        dynamicCategories,
      },
    };
  } catch (error) {
    console.error("Error", error.message);

    return {
      props: {},
    };
  }
}
