import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51JiKqXD9AyyDI46kxQL82PzxCb33hTHVi5FzemmBHA7NXUy0d5TvOWKhLsbBzBwmLEhI0LMyU32cTYXcARSWdiX900y3enxTlt";

  const onToken = (token) => {
    console.log(token);
    alert("payment successful");
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
