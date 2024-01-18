import Image from "next/image";
import BuyImage from "@/public/assets/pana.png";
import axios from "axios";

const BuyPage = ({
  nombre,
  folio
}) => {
  return (
    <div className="bg-[#DCA927]">

      <div className="bg-[#DCA927]">
        <div className="pt-36 pb-16 flex justify-center">
          <Image
            src={BuyImage}
            alt="Buy confirm Image"
          />
        </div>
      </div>
      <div className="bg-white rounded-t-3xl">
        <p className="py-10 text-3xl text-center">Orden procesada con<br /> éxito</p>
        <p className="text-gray-400 text-center">{nombre}</p>
        <p className="text-gray-400 text-center">{folio}</p>
        <div className="flex justify-center pt-12 px-6">
          <button className="bg-[#DCA927] w-full rounded-xl h-16"><p className="text-white text-xl font-semibold">Inicio</p></button>
        </div>
      </div>
    </div>
  )
}
export default BuyPage;

export async function getServerSideProps(context) {
  const {productId, quantity, stateId} = context.query;
  const url = `https://api-dev.cuponerapp.com/compra`;

  const headers = {
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjU4NzU2NTIwMmMyMjc0N2M5M2QzZGEyOWU3NzFhYjc5ODkxZmU1Y2M2ZDQwNzllMjQ5NjMwNGEyZDdmYTVjMjFkMmI4M2QxYmE4ODUyYTEwIn0.eyJhdWQiOiIxIiwianRpIjoiNTg3NTY1MjAyYzIyNzQ3YzkzZDNkYTI5ZTc3MWFiNzk4OTFmZTVjYzZkNDA3OWUyNDk2MzA0YTJkN2ZhNWMyMWQyYjgzZDFiYTg4NTJhMTAiLCJpYXQiOjE3MDU1MjA0NjQsIm5iZiI6MTcwNTUyMDQ2NCwiZXhwIjoxNzM3MTQyODY0LCJzdWIiOiI0Nzg1MzQiLCJzY29wZXMiOltdfQ.kBgH5pjtXL038BwBbo0QJB753l9r0sDD59rvV1JdA_Z520s6zm63HLonSOl6RMS0wVv9ORp5ZAQneVKyfw3hBpqhl7TAHfamhFVNjVIToIsdUVtR06AFYGP2pxTiANtW_G8zGHQqOy-RZbMQfEfzT0d0LsPNQMxl5R43OgATbUBl0EWrrC1x6LgFB5ut54Ekz55UZMfkICcxNi6RPL_zRWSTQlbGR3BO3vRIW15tSmOlT9QFEgXwkTkIYaCNaeJ2gb2rwthcVgdtgQO4AThjH_yZt99eT7awYBrmc20-mjbZ7XFbv4rYaNkj7BUysaqyC27FjrXaJ-Q3MSBhGxxl9eB3QGDMNtiRqZAmfYT1FIzaB9m1_-MgFvV_uNEyQyoYIyhXgdViF-Qy9b-2XZcFlx0T7VkhgBslkWfRW4qZQdji9Q-aaDThnZWDXM2isYJdGSEA3hHIxnWU6OSxnM_vHmmfX_b-kYwvxdzcVqzV3ZJzPQDDBbS7nQ_c-1_fvkXwvQw4xK3cMXD9VduK4bihBbttQ_hD4KarWGX0MVUTD7mxPKaOH54FMvmCEL_zj86Dg2OliL4n85fDfyuOCEfqVMhfVArsl2WChUhxgWRURQhB5W4U_WuzrdX8_Z5Jmv2Hqm8shg6pQMLpqg_M5XFcluPhzLZoeMNUX16YGeV2IAs",
  };

  const data = {
    product_id: productId,
    quantity: quantity,
    state_id: stateId
  }
  console.log('context: ', data);
  const requests = axios.post(url, data, { headers });
  
  try {
    const responses = await requests;
    console.log('finalResponses: ', responses.data);
    const nombre = responses.data.productos[0].nombre;
    const folio = responses.data.productos[0].folios[0].folio;
    return {
      props: {
        nombre,
        folio
      }
    }

  } catch (error) {
    console.error("Error", error.message);

    return {
      props: {}
    };
  }
}