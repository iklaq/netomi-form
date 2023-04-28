import React, { useEffect, useState } from "react";
import "../styles/form.css";

const Form = ({
  initialValues,
  formValues,
  setFormValues,
  handleChange,
  handleSubmit,
}) => {
  const [countriesData, setCountriesData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [statesData, setStatesData] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  // fetching API for listing all the countries
  useEffect(() => {
    const asyncFn = async () => {
      const url = "https://city-and-state-search-api.p.rapidapi.com/countries";
      const options = {
        method: "GET",
        headers: {
          "content-type": "application/octet-stream",
          "X-RapidAPI-Key":
            "41adefae10mshcfc84b75a81725bp162718jsne27e167b34c2",
          "X-RapidAPI-Host": "city-and-state-search-api.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();

        const arr = result.map((el) => el.name);
        setCountriesData(arr);
      } catch (error) {
        console.error(error);
      }
    };

    asyncFn();
  }, []);

  // fetching API for listing all the states according to the selected country
  useEffect(() => {
    if (selectedCountry) {
      const asyncFn = async () => {
        const url = `https://city-and-state-search-api.p.rapidapi.com/states?country_name=${selectedCountry}`;
        const options = {
          method: "GET",
          headers: {
            "content-type": "application/octet-stream",
            "X-RapidAPI-Key":
              "41adefae10mshcfc84b75a81725bp162718jsne27e167b34c2",
            "X-RapidAPI-Host": "city-and-state-search-api.p.rapidapi.com",
          },
        };

        try {
          const response = await fetch(url, options);
          const result = await response.json();
          const arr = result.map((el) => el.name);
         
          setSelectedState("");
          setStatesData(arr);
          setFormValues({ ...formValues, country: selectedCountry });
        } catch (error) {
          console.error(error);
        }
      };
      asyncFn();
    } else {
      setFormValues({ ...formValues, country: "", state: "" });
      setStatesData([]);
    }
  }, [selectedCountry]);

  // setting up state values when user selects an state
  useEffect(() => {
    setFormValues({ ...formValues, state: selectedState });
  }, [selectedState]);

  return (
    <div className="header">
      <p>Can you provide your personal details?</p>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <label for="">Name</label>
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleChange}
          />
        </div>

        <div className="inputs">
          <label for="">Date of birth</label>
          <input
            type="date"
            name="dob"
            value={formValues.dob}
            onChange={handleChange}
          />
        </div>

        <div className="inputs">
          <label for="">Contact Number</label>
          <input
            type="text"
            name="contact"
            value={formValues.contact}
            onChange={handleChange}
          />
        </div>

        <div className="inputs">
          <label for="">Country</label>
          <select
            name="country"
            value={formValues.country}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <optgroup label="Select a country">
              <option></option>

              {countriesData.map((currentElement) => (
                <option value={currentElement}>{currentElement}</option>
              ))}
            </optgroup>
          </select>
        </div>

        <div className="inputs">
          <label for="">State</label>
          <select
            name="state"
            value={formValues.state}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <optgroup label="Select a state">
              <option></option>

              {statesData.map((currentElement) => (
                <option value={currentElement}>{currentElement}</option>
              ))}
            </optgroup>
          </select>
        </div>

        <div className="inputs">
          <label for="">Email</label>
          <input
            type="text"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default Form;
