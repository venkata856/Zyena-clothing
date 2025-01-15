import { useState } from "react";
import {
  signInWithGooglePopup,
  signInAuthUserWithUserWithEmailAndPassword,
} from "../../util/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

const defaultFormFileds = {
  email: "",
  password: "",
};
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFileds);

  const { email, password } = formFields;

  const resetForm = () => {
    setFormFields(defaultFormFileds);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const onHandleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = signInAuthUserWithUserWithEmailAndPassword(
        email,
        password,
      );

      setCurrentUser(user);
      resetForm();
    } catch (error) {
      switch (error.conde) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={(event) => onHandleSubmit(event)}>
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
        <div className="buttons-container">
          <Button type="submit">Sing IN</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={() => signInWithGoogle()}
          >
            GOOGLE Sing IN
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
