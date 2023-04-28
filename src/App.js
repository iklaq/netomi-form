import { useEffect, useState } from "react";
import Frame from "react-frame-component";
import "./App.css";
import Form from "./components/Form";

function App() {
  //setting up initial values of form fields
  const initialValues = {
    username: "",
    dob: "",
    contact: "",
    country: "",
    state: "",
    email: "",
  };

  const successResult = {
    Success: "All fiels are valid.",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isSubmitButtonClicked, setIsSubmitButtonClicked] = useState(false);

  // setting up values inputed by user
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // validating and showing Result message when user clicks on submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSubmitButtonClicked) {
      setIsSubmitButtonClicked(true);
    }
    setFormErrors(validate(formValues));
  };

  // applying validation on user inputs
  const validate = (values) => {
    const errors = {};
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

    if (values.username.length < 4 || values.username.length > 10) {
      errors.username = { error: "Length should be between 4-10 characters" };
    }
    if (!values.dob) {
      errors.dob = { error: "DOB is required" };
    }
    if (values.contact.length != 10) {
      errors.contact = { error: "mobile number should be of 10 digits" };
    }
    if (!values.country) {
      errors.country = { error: "country is required" };
    }
    if (!values.state) {
      errors.state = { error: "state is required" };
    }
    if (!values.email) {
      errors.email = { error: "Email is required" };
    } else if (!regex.test(values.email)) {
      errors.email = { error: "Email is invalid" };
    }

    return errors;
  };

  useEffect(() => {
    Object.keys(formErrors).length == 0 ? setIsValid(true) : setIsValid(false);
  }, [formErrors]);

  return (
    <div className="parent">
      <Frame>
        <style
          dangerouslySetInnerHTML={{ __html: "body { background: grey }" }}
        />
        <Form
          initialValues={initialValues}
          formValues={formValues}
          setFormValues={setFormValues}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Frame>

      {isSubmitButtonClicked ? (
        <pre>
          Result:
          {JSON.stringify(isValid ? successResult : formErrors, undefined, 2)}
        </pre>
      ) : (
        <pre>Please fill the form</pre>
      )}
    </div>
  );
}

export default App;
