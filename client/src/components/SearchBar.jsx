import React from "react";
import { searchCountry } from "../redux/actions/index";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Styles/SearchBar.module.css";

export default function SearchBar() {
  const [flag, setFlag] = useState(true);
  const [flag2, setFlag2] = useState(true);
  const [countryFound, setCountryFound] = useState("");
  const dispatch = useDispatch();
  const [, setCountry] = useState("");
  const actualCountries = useSelector((state) => state.countries);

  function handleInput(e) {
    e.preventDefault();
    const { value } = e.target;
    setCountry(value);

    if (actualCountries.length === 1 && flag && flag2) {
      setCountryFound(value.slice(0, value.length - 1));
      setFlag(false);
    }
    if (!value.length) {
      setFlag(true);
      setFlag2(true);
      dispatch(searchCountry("x"));
    }
    if (!flag && value === countryFound) {
      setCountryFound("");
      setFlag(true);
      setFlag2(false);
    }

    if (flag && value.length > 0) {
      dispatch(searchCountry(value));
    }
  }

  return (
    <div className={styles.background}>
     <div className={styles.container1}>
     <h1>COUNTRIES</h1>
     <img className={styles.map} src="https://cdn.pixabay.com/photo/2012/04/11/15/48/continents-28616_960_720.png" alt="img"/>
     </div>
      <label><input
        className={styles.searchBox}
        placeholder="🔍 Search country"
        type="text"
        onChange={(e) => handleInput(e)}
      /></label>
      
    </div>
  );
}
