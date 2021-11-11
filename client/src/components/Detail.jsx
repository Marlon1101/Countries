import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchById, getCountries, sortCountries } from "../redux/actions/index";
import styles from "./Styles/Detail.module.css";

export default function Detail() {
  const dispatch = useDispatch();
  const params = useParams();
  const country = useSelector((state) => state.allCountries);
  const countries = useSelector((state) => state.countries)

  useEffect(() => {
    if (country.length !== 1) {
      dispatch(searchById(params.idPais));
      dispatch(getCountries("countries"));
    }
  });

  useEffect(() => {
    if(countries[0]?.ID !== "AFG"){
      dispatch(sortCountries("Ascendent", "Nombre"))
    }
  },[countries, dispatch])

  function area(n) {
    let number = n.toLocaleString();
    return number;
  }
  if (!country || country.length !== 1) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="container">
        <Link to="/home" className="link">
          HOME
        </Link>
        <hr />
        <Link to={`/home/${params.idPais}/createActivity`}>
          Create Activity
        </Link>
        <h3>{country[0].Nombre}</h3>
        <h5>{country[0].Continente}</h5>
        <img src={country[0].Imagen} alt="img" />
        <h4>ID</h4>
        <h5>{country[0].ID}</h5>
        <h4>Capital</h4>
        <h5>{country[0].Capital}</h5>
        <h4>Subregion</h4>
        <h5>{country[0].Subregion}</h5>
        <h4>Area</h4>
        <h5>{area(country[0].Area) + " Km2"}</h5>
        <h4>Population</h4>
        <h5>{area(country[0].Poblacion)}</h5>
        <h4>Activities</h4>
        <div>
          {country[0].activities !== undefined ? (
            country[0].activities.map((e) => {
              return (
                <div key={country[0].ID}>
                  <h5>Name: {e.Nombre}</h5>
                  <h5>Difficulty: {e.Dificultad}</h5>
                  <h5>Duration: {e.Duracion}</h5>
                  <h5>Season: {e.Temporada}</h5>
                </div>
              );
            })
          ) : (
            <h5>There isn't an activity here</h5>
          )}
        </div>
      </div>
    );
  }
}
