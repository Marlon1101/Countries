import React from "react";
import {
  getCountries,
  filterCountriesByContinent,
  filterCountriesByActivity,
  sortCountries,
} from "../redux/actions/index";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Styles/Home.module.css";
import Paged from "./Paged";
import SearchBar from "./SearchBar";
import CountriesList from "./CountriesList";

export default function Home() {
  const dispatch = useDispatch();
  let countries = useSelector((state) => state.countries);
  const [update, setUpdate] = useState(false);
  const [, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(9);
  const iLastCountry = currentPage * countriesPerPage;
  const iFirstCountry = iLastCountry - countriesPerPage;
  const cCountries = countries.slice(iFirstCountry, iLastCountry);
  const paged = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCountries("all")).then(() => {
      dispatch(sortCountries("Ascendent", "Nombre"));
      setUpdate(true);
    });
  }, [dispatch]);

  function handleSort(e) {
    e.preventDefault();
    const checkbox = document.f1.order;
    let type;
    for (let i = 0; i < document.f1.order.length; i++) {
      if (checkbox[i].checked === true) type = checkbox[i].value;
    }
    dispatch(sortCountries(e.target.value, type));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value} Por ${type}`);
  }

  function handleFilterContinent(e) {
    const valueSeason = document.f1.elements[4].value;
    console.log(document.f1.elements);
    dispatch(filterCountriesByContinent(e.target.value));
    setCurrentPage(1);
    if (valueSeason !== "All") {
      dispatch(filterCountriesByActivity(valueSeason));
    }
  }

  function handleFilterByActivity(e) {
    e.preventDefault();
    dispatch(filterCountriesByActivity(e.target.value));
    setCurrentPage(1);
  }

  function handleRechargeCountries(e) {
    dispatch(getCountries("recharge"));
  }

  function handleSelectTypeOrder(e) {
    dispatch(sortCountries(document.f1.elements[0].value, e.target.value));
    setOrder(`Ordenado ${document.f1.elements[0].value} Por ${e.target.value}`);
  }
  if (!countries.length) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <SearchBar />
        {countries.length === 1 ? (
          <button type="button" onClick={(e) => handleRechargeCountries(e)}>
            Recharge countries
          </button>
        ) : (
          <></>
        )}
        <h1>COUNTRIES</h1>

        <div>
          <form name="f1">
            <h4>Order</h4>
            <select onChange={(e) => handleSort(e)}>
              <option value="Ascendent"> Ascendente </option>
              <option value="Descendent"> Descendente </option>
            </select>

            <h4>Order by</h4>
            <label>
              <input
                type="radio"
                name="order"
                value="Poblacion"
                onClick={(e) => handleSelectTypeOrder(e)}
              />
              Poblation
            </label>
            <label>
              <input
                type="radio"
                name="order"
                value="Nombre"
                onClick={(e) => handleSelectTypeOrder(e)}
                defaultChecked={true}
              />
              Name
            </label>

            <h4>Filter by continent</h4>
            <select onChange={(e) => handleFilterContinent(e)}>
              <option value="All">All</option>
              <option value="Africa">Africa</option>
              <option value="Antarctica">Antarctica</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="North America">North America</option>
              <option value="Oceania">Oceania</option>
              <option value="South America">South America</option>
            </select>
            <h4>Filter by Season of activities</h4>

            <select onChange={(e) => handleFilterByActivity(e)}>
              <option value="All">All</option>
              <option value="Verano">Summer</option>
              <option value="Otoño">Autumn</option>
              <option value="Invierno">Winter</option>
              <option value="Primavera">Spring</option>
            </select>
          </form>
          <Paged
            countriesPerPage={countriesPerPage}
            allCountries={countries.length}
            paged={paged}
          />

          <div>
            <CountriesList cCountries={cCountries} stateUpdate={update} />
          </div>
        </div>
      </div>
    );
  }
}
