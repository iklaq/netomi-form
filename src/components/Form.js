import React from "react";
import "../styles/form.css";
import { useState, useEffect } from "react";

const Form = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState();
  const [statesData,setStatesData] = useState([]);
  const [selectedState, setSelectedState] = useState(null);

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
        console.log(arr);
        setCountriesData(arr);
      } catch (error) {
        console.error(error);
      }
    };

    asyncFn();
  }, []);

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
          console.log(arr);
          setSelectedState(null);
          setStatesData(arr)
        } catch (error) {
          console.error(error);
        }
      };
      asyncFn();
    } 
    else{
        setStatesData([]);
    }
  }, [selectedCountry]);

  return (
    <div className="header">
      <p>Can you rovide your personal details?</p>
      <form>
        <div className="inputs">
          <label for="">Name</label>
          <input type="text" />
        </div>

        <div className="inputs">
          <label for="">Date of birth</label>
          <input type="date" />
        </div>

        <div className="inputs">
          <label for="">Contact Number</label>
          <input type="number" />
        </div>

        <div className="inputs">
          <label for="">Country</label>
          <select
            name="country"
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
           onChange={(e)=>setSelectedState(e.target.value)}
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
          <input type="email" />
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default Form;
