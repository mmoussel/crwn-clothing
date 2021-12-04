import React from "react";

import { connect } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../firebase/firebase.utils";
import { googleSignInStart } from "../../redux/user/user.actions";

import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import {
  SignInContainer,
  SignInTitle,
  ButtonsBarContainer,
} from "./sign-in.styles";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("sign-in-success");
      this.setState({
        email: "",
        password: "",
      });
    } catch (e) {
      console.error(e);
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { signInWithGoogle } = this.props;

    return (
      <SignInContainer>
        <SignInTitle>I already have an account</SignInTitle>
        <span>Sign in with your e-mail and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            label="email"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="password"
            required
          />
          <ButtonsBarContainer>
            <CustomButton type="submit"> Sign in </CustomButton>
            <CustomButton
              type="button"
              onClick={signInWithGoogle}
              isGoogleSignIn
            >
              Sign in with Google
            </CustomButton>
          </ButtonsBarContainer>
        </form>
      </SignInContainer>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  signInWithGoogle: () => dispatch(googleSignInStart()),
});

export default connect(null, mapDispatchToProps)(SignIn);
