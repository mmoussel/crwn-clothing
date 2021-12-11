import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import Header from "./components/header/header.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import HomePage from "./pages/hompage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/signIn-and-signup/signin-and-signup.component";

import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";

import { GlobalStyles } from "./global.styles";
import { useEffect } from "react";

const App =({ currentUser ,checkUserSession})=> {

  useEffect(()=>{
    checkUserSession()
    // eslint-disable-next-line
  },[])

    return (
      <div>
        <GlobalStyles />
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            path="/signin"
            render={() =>
              currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
            }
          />
        </Switch>
      </div>
    );
  }


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch =>({
  checkUserSession:()=>dispatch(checkUserSession())
}) 


export default connect(mapStateToProps ,mapDispatchToProps)(App);
