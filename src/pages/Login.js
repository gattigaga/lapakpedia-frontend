import React, { Component } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import axios from "axios";
import { connect } from "react-redux";
import Spinner from "react-spinkit";

import { setUserSession, setAccessToken } from "store/actionCreators";
import InputBox from "components/InputBox";
import Button from "components/Button";

const Container = styled.div`
  flex: 1;
`;

const FormContainer = styled.div`
  width: 480px;
  box-sizing: border-box;
  padding: 32px;
  border: 1px solid #ccc;
  margin: auto;
  margin-top: 5%;
`;

const Title = styled.p`
  font-size: 32px;
  font-family: Roboto;
  font-weight: bold;
  color: black;
  margin-top: 0px;
  margin-bottom: 32px;
`;

const StyledButton = styled(Button)`
  font-size: 12px;
  padding: 12px 0px;
  margin-top: 32px;
`;

const Loading = styled(Spinner)`
  margin: 15% auto;
  width: 64px !important;
  height: 64px !important;
`;

class Login extends Component {
  constructor(props) {
    super(props);

    this.validate = this.validate.bind(this);
    this.submit = this.submit.bind(this);
  }

  /**
   * Validate form
   *
   * @param {object} values - User form
   * @param {string} values.email - User email
   * @param {string} values.password - User password
   * @returns
   * @memberof Login
   */
  validate(values) {
    const { email, password } = values;
    const errors = {};

    if (!email) {
      errors.email = "Email is required";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    return errors;
  }

  /**
   * Submit form
   *
   * @param {object} values - User form
   * @param {string} values.email - User email
   * @param {string} values.password - User password
   * @param {object} actions - Formik actions
   * @param {function} actions.setSubmitting - Set if formik is submitting
   * @returns
   * @memberof Login
   */
  async submit(values, actions) {
    const { saveSession, saveToken, history } = this.props;
    const { setSubmitting } = actions;

    setSubmitting(true);

    try {
      const responseLogin = await axios.post("/login", values);
      const { token } = responseLogin.data;

      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      const responseMe = await axios.get("/me");
      const me = responseMe.data;

      saveSession(me);
      saveToken(token);
      setSubmitting(false);
      history.push("/");
    } catch (error) {
      setSubmitting(false);
      console.error(error);

      if (error) {
        const { status } = error.response;

        switch (status) {
          case 401:
            alert("Sorry, You are not registered !");
            break;

          default:
            alert("Sorry, Unknown error !");
            break;
        }
      }
    }
  }

  render() {
    return (
      <Container>
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          validate={this.validate}
          onSubmit={this.submit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <div>
              {!isSubmitting ? (
                <FormContainer>
                  <Title>Login</Title>
                  <form onSubmit={handleSubmit}>
                    <InputBox
                      placeholder="Email"
                      value={values.email}
                      name="email"
                      helperText={!!errors.email && errors.email}
                      isError={!!errors.email}
                      onChange={handleChange}
                    />
                    <InputBox
                      placeholder="Password"
                      type="password"
                      value={values.password}
                      name="password"
                      helperText={!!errors.password && errors.password}
                      isError={!!errors.password}
                      onChange={handleChange}
                    />
                    <StyledButton caption="Login" type="submit" isFullWidth />
                  </form>
                </FormContainer>
              ) : (
                <Loading name="folding-cube" />
              )}
            </div>
          )}
        </Formik>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  saveSession: user => dispatch(setUserSession(user)),
  saveToken: token => dispatch(setAccessToken(token))
});

export default connect(null, mapDispatchToProps)(Login);
