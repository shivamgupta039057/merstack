import React, { useState } from "react";
import { IoStar } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import "./style.css";
import { postAPIAuth } from "../../../apiservices/ApiServies";
import useAuth from "../../../hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ADD_CARTS, API_RATING_DATA } from "../../../utils/APIConstant";
import useMyProvider from "../../../hooks/useMyProvider";

function Cards({ data }) {
  const { token } = useAuth();
  const { usercredentials } = useMyProvider();

  const queryClient = useQueryClient();
  const { mutate: submitRating, isLoading: isSubmitting } = useMutation({
    mutationFn: (newRating) => postAPIAuth(API_RATING_DATA, newRating, token),
    onSuccess: () => {
      console.log("Rating submitted successfully");
      queryClient.invalidateQueries({
        queryKey: ["Product-get"],
        exact: true,
      });
    },
    onError: (error) => {
      console.error("Error submitting rating:", error);
    },
  });

  const { mutate: addCarts, isLoading: isAddSubmitting } = useMutation({
    mutationFn: (newRating) => postAPIAuth(API_ADD_CARTS, newRating, token),
    onSuccess: () => {
      console.log("Rating submitted successfully");
      queryClient.invalidateQueries({
        queryKey: ["Product-get"],
        exact: true,
      });
    },
    onError: (error) => {
      console.error("Error submitting rating:", error);
    },
  });

  const handleRatingData = (ratingNumber, productId) => {
    submitRating({
      rating: ratingNumber,
      product: productId,
    });
  };

  return (
    <div className="products header">
      <div className="header-top-area">
        <span>{`${data?.discountPriceOff}% off`}</span>
        <div className="product-img">
          <img src={data?.image} alt="" />
        </div>
      </div>
      <div className="product-main-bottom-data">
        <div className="product-bottom-section">
          <div className="product-heading">
            <h3>{data?.heading}</h3>
          </div>
          <div className="product-paragraph">
            <p>{data?.description}</p>
          </div>
          <div className="product-rating">
            {[1, 2, 3, 4, 5].map((num) => (
              <span key={num} onClick={() => handleRatingData(num, data._id)}>
                <IoStar />
              </span>
            ))}
          </div>
          <div className="product-pricting">
            <div className="product-actual-price">
              <p>${data?.actualPrice}</p>
            </div>
            <div className="product-discounted-price">
              <del>${data?.discountedPrice}</del>
            </div>
          </div>
        </div>
        <div className="adding-to-cards">
          <div className="card-quantity-counts">
            {data.quantity_rating > 0 && (
              <>
                <div
                  className="decrease-icon"
                  onClick={() => {
                    const newCount = data.quantity_rating - 1;
                      addCarts({
                        userId: usercredentials?._id,
                        ProductId: data._id,
                        Quantity: newCount,
                      });
                  }}
                >
                  <FiMinus />
                </div>
                <div className="decrease-text">{data.quantity_rating}</div>
              </>
            )}
            <div
              className="increase-icon"
              onClick={() => {
                const newCount = data.quantity_rating + 1;
                addCarts({
                  userId: usercredentials?._id,
                  ProductId: data._id,
                  Quantity: newCount,
                });
              }}
            >
              <IoMdAdd />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
