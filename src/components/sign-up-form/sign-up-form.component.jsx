import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../util/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";

const defaultFormFileds = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFileds);

  const { displayName, email, password, confirmPassword } = formFields;

  const resetForm = () => {
    setFormFields(defaultFormFileds);
  };

  const onHandleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password,
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetForm();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={(event) => onHandleSubmit(event)}>
        <FormInput
          label={"Display Name"}
          type="text"
          required
          name="displayName"
          value={displayName}
          onChange={(e) => handleChange(e)}
        />
        <FormInput
          label={"Email"}
          type="email"
          required
          name="email"
          value={email}
          onChange={(e) => handleChange(e)}
        />
        <FormInput
          label={"Password"}
          type="password"
          required
          name="password"
          value={password}
          onChange={(e) => handleChange(e)}
        />
        <FormInput
          label={"Confirm Password"}
          type="password"
          required
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => handleChange(e)}
        />
        <Button type="submit">Sing Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
