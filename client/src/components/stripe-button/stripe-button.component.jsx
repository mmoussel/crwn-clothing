import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51JiKqXD9AyyDI46kxQL82PzxCb33hTHVi5FzemmBHA7NXUy0d5TvOWKhLsbBzBwmLEhI0LMyU32cTYXcARSWdiX900y3enxTlt";

  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((res) => {
        alert("payment successful");
      })
      .catch((err) => {
        console.error(JSON.parse(err));
        alert("payment failed");
      });
  };

  return (
    <StripeCheckout
      stripeKey={publishableKey}
      label="PAY NOW"
      name="CRWN Clothing"
      billingAddress
      shippingAddress
      description={`your total is $${price}`}
      image="https://svgshare.com/i/CUz.svg"
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
    />
  );
};

export default StripeCheckoutButton;
