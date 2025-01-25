import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { getAPIAuth } from "../../../apiservices/ApiServies";
import { useQuery } from "@tanstack/react-query";
import SpinnerLoading from "../../../utils/SpinnerLoding";
import { API_GET_PRODUCTS } from "../../../utils/APIConstant";


function ProductCards() {
    const { data: Product, isLoading, isError } = useQuery({
        queryKey: ["Product-get"],
        queryFn: () => getAPIAuth(API_GET_PRODUCTS),
        staleTime: 5 * 60 * 1000,
    });
    console.log("Product" , Product);
    
    if(isLoading) return <SpinnerLoading />
    if(isError) return (<div>Error loading Products</div>)


  return (
    <>
     {
        Product?.data?.data.length > 0 ? (
            <>
             <div className="container">
        <div className="section-header">
          <h1>Flash Deals</h1>
        </div>
        <div className="row">
          {Product?.data?.data?.map((item, index) => {
            return (
              <>
                <div className="col-lg-3" key={index}>
                  <Cards data={item} />
                </div>
              </>
            );
          })}
        </div>
      </div>
            </>
        ) : (
            <h1>NO Products Found</h1>
        )
     }
    </>
  );
}

export default ProductCards;
