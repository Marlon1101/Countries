import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  searchById,
  getCountries,
  sortCountries,
} from "../redux/actions/index";
import styles from "./Styles/Detail.module.css";
import Loader from "./Loader";

export default function Detail() {
  const dispatch = useDispatch();
  const params = useParams();
  const country = useSelector((state) => state.allCountries);
  const countries = useSelector((state) => state.countries);

  useEffect(() => {
    if (country.length !== 1) {
      dispatch(searchById(params.idPais));
      dispatch(getCountries("countries"));
    }
  });

  useEffect(() => {
    if (countries[0]?.ID !== "AFG") {
      dispatch(sortCountries("Ascendent", "Nombre"));
    }
  }, [countries, dispatch]);




  function area(n) {
    let number = n.toLocaleString();
    return number;
  }
  if (!country || country.length !== 1) {
    return <Loader />;
  } else {
    return (
      <div>
        <div className={styles.bar}>
          <div className={styles.linkHome}>
            <Link to="/home">HOME</Link>
          </div>
          <div className={styles.linkActivity}>
            <Link to={`/home/${params.idPais}/createActivity`}>
              Create Activity
            </Link>
          </div>
        </div>
        <div className={styles.containerData}>
          <div className={styles.box1}>
            <h3 className={styles.name}>{country[0].Nombre}</h3>
            <h5 className={styles.continent}>{country[0].Continente}</h5>
            <img className={styles.img} src={country[0].Imagen} alt="img" />
          </div>

          <div className={styles.containerSubData}>
            <div className={styles.box2}>
              <h4 className={styles.textId}>Code</h4>
              <h5 className={styles.id}>{country[0].ID}</h5>
              <h4 className={styles.textCapital}>Capital</h4>
              <h5 className={styles.capital}>{country[0].Capital}</h5>
            </div>
            <div className={styles.box3}>
              <h4 className={styles.textSubRegion}>Subregion</h4>
              <h5 className={styles.subRegion}>{country[0].Subregion}</h5>
              <h4 className={styles.textArea}>Area</h4>
              <h5 className={styles.area}>{area(country[0].Area) + " Km2"}</h5>
            </div>
            <div className={styles.box4}>
              <h4 className={styles.textPopulation}>Population</h4>
              <h5 className={styles.population}>
                {area(country[0].Poblacion)}
              </h5>
            </div>
          </div>

          <div className={styles.box5}>
            <h4 className={styles.activities}>Activities:</h4>
            <div  className={styles.containerDataActivities} >
              {country[0].activities !== undefined ? (
                country[0].activities.map((e) => {
                  return (
                    <div key={country[0].ID}>
                    <div
                      className={styles.subDataActivities}
                      key={country[0].ID}
                    >
                      <h5 className={styles.nameActivity}>Name: {e.Nombre}</h5>
                      <h5 className={styles.difficulty}>
                        Difficulty: {e.Dificultad}
                      </h5>
                      <h5 className={styles.duration}>
                        Duration: {e.Duracion}
                      </h5>
                      <h5 className={styles.season}>Season: {e.Temporada}</h5>
                    </div>
                    </div>
                  );
                })
              ) : (
                <h5>There isn't an activity here</h5>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
