import React from "react";
import { searchCountry } from "../redux/actions/index";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");

  function handleInput(e) {
    e.preventDefault();
    setCountry(e.target.value);
  }

  function handleSearch(e) {
    e.preventDefault();
    country === "" ? alert("Enter a value") : dispatch(searchCountry(country));
    e.target.reset();
    setCountry("");
  }

  return (
    <div>
      <form onSubmit={(e) => handleSearch(e)}>
        <input
          placeholder="Country"
          type="text"
          onChange={(e) => handleInput(e)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
