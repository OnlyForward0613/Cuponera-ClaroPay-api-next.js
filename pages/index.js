// pages/Home.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import * as sdkclaro from "@claro/sdkclaro";

import Head from "next/head";
import axios from "axios";
import Button from "@/components/Button";

const IndexPage = ({ states }) => {
  const [stateName, setStateName] = useState("");
  const router = useRouter();
  const handlePromotion = async (state) => {
    console.log("ok");
    setSelectedState(state.id);
    localStorage.setItem("stateId", state.id);
    await router.push({
      pathname: "/home",
      query: { state: selectedState },
    });
  };
  const getProfile = async () => {
    import("@claro/sdkclaro").then(async (sdkclaro) => {
      await sdkclaro.getInstance("Cuponera").getTopic(
        "getProfile",
        "",
        (result) => {
          console.log("getTopicResult: ", result);
          setStateName(result.state);
          states.map((state) => {
            state.url === result.state.toLowerCase()
              ? handlePromotion(state)
              : "";
          });
        },
        (error) => {
          console.log("getTopicResult: ", error);
        }
      );
    });
  };
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      getProfile();
    }
  }, [mounted]);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedState, setSelectedState] = useState(1);

  const handleSelectChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleShowPromotions = () => {
    setIsLoading(true);
    router.push({
      pathname: "/home",
      query: { state: selectedState },
    });
  };

  return (
    typeof window !== "undefined" &&
    window !== undefined &&
    mounted && (
      <div className="container flex flex-col items-center justify-center h-screen p-4 mx-auto">
        <Head>
          <title>Home</title>
        </Head>
        <h1 className="mb-4 text-2xl font-bold">Selecciona un estado:</h1>
        <select
          onChange={handleSelectChange}
          className="w-full p-2 mb-2 border border-gray-300 rounded-md"
        >
          {states.map((state) =>
            state.url === stateName.toLowerCase() ? (
              <option key={state.id} value={state.id}>
                {state.url}
              </option>
            ) : (
              ""
            )
          )}
        </select>

        <div className="w-full mt-5">
          <Button
            text={"Ver Promociones"}
            type={"button"}
            onClick={handleShowPromotions}
          />
        </div>

        {isLoading && (
          <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full gap-3 bg-gray-800 bg-opacity-50">
            <div className="w-5 h-5 border-t-4 border-white border-solid rounded-full animate-spin"></div>
            <span className="ml-2 text-lg font-semibold text-white">
              Cargando promociones...
            </span>
          </div>
        )}
      </div>
    )
  );
};

export async function getServerSideProps(context) {
  const { query } = context;
  const state = query.state;

  const urls = [`https://api.cuponerapp.com/v2/estados`];

  const headers = {
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImJjMGE4NGE5NDc2ODM4ZmZiZjFiMmQxMzVhZmMwOGM2YWZkNzdlNDZhYjE0ODdiMDY2NzJmNWYyY2E3NTQ4MDA1NDJmNzljYTBlN2JkNzI3In0.eyJhdWQiOiIxIiwianRpIjoiYmMwYTg0YTk0NzY4MzhmZmJmMWIyZDEzNWFmYzA4YzZhZmQ3N2U0NmFiMTQ4N2IwNjY3MmY1ZjJjYTc1NDgwMDU0MmY3OWNhMGU3YmQ3MjciLCJpYXQiOjE3MDM4ODgwMTUsIm5iZiI6MTcwMzg4ODAxNSwiZXhwIjoxNzM1NTEwNDE0LCJzdWIiOiI2MjA5MTYiLCJzY29wZXMiOltdfQ.0400xfzee-3naSMZIcOeljmQR_7wQfWZct9EiBjUTbLrL_ENpqqEqqcqBNOmLNu-9YNOe0fbHxMCs-HLu7-aiGxCPSXE4qOIVL11fXIIVNFIpVv1qOV3MF-BKBo0IUd5S6g0nTt_pZ3bBc9-PUzEHTHFfi3uzO9DZQQn_uiTxyLocRnkSaVv-7HoKI61yh8mTB2eyao0NTUSeqhstbroINcl5CPJ78WPvfW46HMUC7jKC71iX6yh8H4tvmtAn-MrIE2MaSdt0HVRDh_-zdpU3JkvqFWq4nADaspLRsif4bopxhnQEEgRWJGFF6I3GHSa0UkSkwSWcCcJyqlVOqoHwzRT-SqyhWrnIHyvm0sEOwwOArOxV6aYI9IIoji2pDO-WDp0hZz_MOXn7QqhJFDlmnlWY7NdDp4B9GlPgyrsHeNZrr1SS2JQEXAm82eVEzrghP3n879JwsUoJTYEmjLVteens1m0_CzYR__qVDSGeStJAzm30J40Ahg3Zf8P0HxP5qmqc1JG7U0t68CWuPNZZNiuPnX2uhtVkRPg7WZFeRXVd87a-gde58mEwM3HaHAvuQJSmTEH3cp5yUYsMmgXzdybrGZWGgSVu4NziDR5U7Nsjlce53CNPAw9M2iyqf98ktNjIB1dcqtIYLfrqpMYx9CEVVoOrRwZb14DdDWz5ZE",
  };

  const requests = urls.map((url) => axios.get(url, { headers }));

  try {
    const responses = await Promise.all(requests);

    const states = responses[0].data;
    console.log("states: ", states);

    return {
      props: {
        states,
      },
    };
  } catch (error) {
    console.error("Error", error.message);

    return {
      props: {},
    };
  }
}

export default IndexPage;
