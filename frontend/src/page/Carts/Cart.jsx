import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getAPIAuth } from '../../apiservices/ApiServies';
import { TOKEN_NAME } from '../../constant';
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const token = localStorage.getItem(TOKEN_NAME)
  const {data: Carts, isLoading, isError} = useQuery({
    queryKey : ["carts-key"],
    queryFn : () => getAPIAuth("product/getCart" , token),
    staleTime: 5 * 60 * 1000,

  });

  console.log("CartsCartsCartsCarts" , Carts);
  
  return (
    <div className="section-padding-data text-white-custom">
    <section className="h-100 h-custom" style={{ backgroundColor: '#0d131c' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card text-white-custom">
              <div className="card-body p-4">
                <div className="row">
                  <div className="col-lg-7">
                    <h5 className="mb-3">
                      <a href="#!" className="text-white-custom">
                        <i className="fas fa-long-arrow-alt-left me-2"></i>Continue shopping
                      </a>
                    </h5>
                    <hr className="text-white-custom" />
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p className="mb-1">Shopping cart</p>
                        <p className="mb-0">You have {Carts?.data?.data.length} items in your cart</p>
                      </div>
                      <div>
                        <p className="mb-0">
                          <span className="text-red">Sort by:</span>{' '}
                          <a href="#!" className="text-white-custom">
                            price <i className="fas fa-angle-down mt-1"></i>
                          </a>
                        </p>
                      </div>
                    </div>

                    {/* Cart Items */}
                    {Carts?.data?.data.map((item, index) => (
                      <div className="card mb-3 text-white-custom" key={index}>
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                              <div>
                                <img
                                  src={item.images}
                                  className="img-fluid rounded-3"
                                  alt="Shopping item"
                                  style={{ width: '65px' }}
                                />
                              </div>
                              <div className="ms-3">
                                <h5>{item.heading}</h5>
                                <p className="small mb-0">{item.description}</p>
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                              <div style={{ width: '50px' }}>
                                <h5 className="fw-normal mb-0">{item.Quantity}</h5>
                              </div>
                              <div style={{ width: '80px' }}>
                                <h5 className="mb-0">{item.actualPrice}</h5>
                              </div>
                              <a href="#!" style={{ color: '#cecece' }}>
                              <MdDelete />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Card Details */}
                  <div className="col-lg-5">
                    <div className="card bg-primary text-white rounded-3">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <h5 className="mb-0">Card details</h5>
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                            className="img-fluid rounded-3"
                            style={{ width: '45px' }}
                            alt="Avatar"
                          />
                        </div>

                        <p className="small mb-2">Card type</p>
                        <div>
                          {['cc-mastercard', 'cc-visa', 'cc-amex', 'cc-paypal'].map((type) => (
                            <a href="#!" key={type} className="text-white-custom">
                              <i className={`fab fa-${type} fa-2x me-2`}></i>
                            </a>
                          ))}
                        </div>

                        <form className="mt-4">
                          <div className="form-outline form-white mb-4">
                            <input
                              type="text"
                              id="typeName"
                              className="form-control form-control-lg"
                              placeholder="Cardholder's Name"
                            />
                            <label className="form-label" htmlFor="typeName">
                              Cardholder's Name
                            </label>
                          </div>

                          <div className="form-outline form-white mb-4">
                            <input
                              type="text"
                              id="typeText"
                              className="form-control form-control-lg"
                              placeholder="1234 5678 9012 3457"
                              minLength="19"
                              maxLength="19"
                            />
                            <label className="form-label" htmlFor="typeText">
                              Card Number
                            </label>
                          </div>

                          <div className="row mb-4">
                            <div className="col-md-6">
                              <div className="form-outline form-white">
                                <input
                                  type="text"
                                  id="typeExp"
                                  className="form-control form-control-lg"
                                  placeholder="MM/YYYY"
                                  minLength="7"
                                  maxLength="7"
                                />
                                <label className="form-label" htmlFor="typeExp">
                                  Expiration
                                </label>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-outline form-white">
                                <input
                                  type="password"
                                  id="typeText"
                                  className="form-control form-control-lg"
                                  placeholder="&#9679;&#9679;&#9679;"
                                  minLength="3"
                                  maxLength="3"
                                />
                                <label className="form-label" htmlFor="typeText">
                                  CVV
                                </label>
                              </div>
                            </div>
                          </div>
                        </form>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Subtotal</p>
                          <p className="mb-2">${Carts?.data?.totalSum}.00</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Shipping</p>
                          <p className="mb-2">$20.00</p>
                        </div>

                        <div className="d-flex justify-content-between mb-4">
                          <p className="mb-2">Total (Incl. taxes)</p>
                          <p className="mb-2">${Carts?.data?.totalSum + 20}.00</p>
                        </div>

                        <button type="button" className="login-btn btn-block btn-lg">
                          <div className="d-flex justify-content-between">
                            <span>$4818.00</span>
                            <span>
                              Checkout <i className="fas fa-long-arrow-alt-right ms-2"></i>
                            </span>
                          </div>
                        </button>
                        {/* <button class="login-btn" type="submit">Login</button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  );
};

export default Cart;
