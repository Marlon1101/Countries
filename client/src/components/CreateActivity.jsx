import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { createActivity, searchById } from "../redux/actions";
import styles from "./Styles/CreateActivity.module.css";
import { sortCountries, getCountries } from "../redux/actions/index";
import Loader from "./Loader";
export default function CreateActivity() {
  const params = useParams();
  const listCountries = useSelector((state) => state.countries);
  const [countriesForDelete, setCountriesForDelete] = useState([]);
  const inputCountries = useRef("");
  const dispatch = useDispatch();
  const [flagBtnDelete, setFlagBtnDelete] = useState(true);

  useEffect(() => {
    if (!listCountries.length) {
      dispatch(getCountries("countries"));
      dispatch(searchById(params.idPais));
    }
  }, [listCountries, dispatch, params.idPais]);

  useEffect(() => {
    dispatch(sortCountries("Ascendent", "Nombre"));
    setCountriesForDelete([]);
  }, [dispatch, listCountries]);

  let idForCountriesSelected = "";
  const [data, setData] = useState({
    Nombre: "",
    Dificultad: "",
    Duracion: "",
    Temporada: "",
    idPais: [params.idPais],
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }
  function handleSelect(e) {
    const { value /*checked*/ } = e.target;
    /* if (checked) {
      countriesSelected.push(value);
      console.log(countriesSelected);
      console.log(checked);
    } else {
      const filtered = countriesSelected.filter((element) => element !== value);
      countriesSelected = filtered;
    } */
    let id = listCountries.find((element) => element.Nombre === value);
    if (id) idForCountriesSelected = id.ID;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setData({
      Nombre: "",
      Dificultad: "",
      Duracion: "",
      Temporada: "",
      idPais: [params.idPais],
    });
    data.Nombre === ""
      ? alert("Enter the values")
      : dispatch(createActivity(data));

    e.target.reset();
  }

  function handleAddCountries(e, input) {
    e.preventDefault();
    /* setCountriesSelected([...countriesSelected, idForCountriesSelected]) */
    if (
      !data.idPais.includes(idForCountriesSelected) &&
      idForCountriesSelected !== ""
    ) {
      setData({ ...data, idPais: [...data.idPais, idForCountriesSelected] });
      input.current.value = "";
    } else if (!input.current.value) {
      alert("Select a country");
    } else {
      alert("Sorry, this country already exist, choose other.");
      input.current.value = "";
    }
    /* setData({
      idPais: countriesSelected,
    });
    alert("Countries Added " + countriesSelected);
    countriesSelected = [];
    console.log(e); */
  }

  function handleReset(e) {
    setData({
      Nombre: "",
      Dificultad: "",
      Duracion: "",
      Temporada: "",
      idPais: [],
    });
  }

  function handleDeleteCountries(e) {
    let copyIdPais = data.idPais;
    countriesForDelete.forEach((el) => {
      let filtered = copyIdPais.filter((ele) => ele !== el);
      setCountriesForDelete(filtered);
      copyIdPais = filtered;
    });
    setData({ ...data, idPais: copyIdPais });
    deseleccionarTodo(e);
  }

  function deseleccionarTodo(e) {
    for (let i = 0; i < document.f1.elements.length; i++)
      if (document.f1.elements[i].type === "checkbox")
        document.f1.elements[i].checked = false;
  }

  function handleSelectCheckBox(e) {
    const { value, checked } = e.target;
    if (checked) {
      setCountriesForDelete([...countriesForDelete, value]);
    } else {
      let filter = countriesForDelete.filter((element) => element !== value);
      setCountriesForDelete(filter);
    }
  }

  function handleChangeCheckbox(e) {
    for (let i = 0; i < document.f1.elements.length; i++)
      if (
        document.f1.elements[i].type === "checkbox" &&
        document.f1.elements[i].checked === true
      ) {
        setFlagBtnDelete(false);
      }
  }

  if (!listCountries.length) {
    return <Loader />;
  } else {
    return (
      <div>
        <div className={styles.bar}>
          <div className={styles.linkHome}>
            <Link to="/home/">Home</Link>
          </div>
          <div className={styles.linkDetail}>
            <Link to={`/home/${params.idPais}`}>Detail Country</Link>
          </div>
        </div>
        <div className={styles.containerForm}>
          <form
            className={styles.form}
            name="f1"
            onSubmit={(e) => handleSubmit(e)}
            onChange={(e) => handleChangeCheckbox(e)}
          >
            <div className={styles.containerFirstData}>
              <div className={styles.containerName}>
                <p className={styles.name}>NAME</p>
                <input
                  type="texto"
                  autoComplete="off"
                  placeholder="Name"
                  name="Nombre"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className={styles.containerDifficulty}>
                <p className={styles.difficulty}>DIFFICULTY</p>
                <select
                  autoComplete="off"
                  id="difficulty"
                  name="Dificultad"
                  onChange={(e) => handleChange(e)}
                >
                  <option value="1">Very Easy</option>
                  <option value="2">Easy</option>
                  <option value="3">Medium</option>
                  <option value="4">Hard</option>
                  <option value="5">Very Hard</option>
                </select>
              </div>
              <div className={styles.containerDuration}>
                <p className={styles.duration}>DURATION</p>
                <input
                  autoComplete="off"
                  type="texto"
                  placeholder="Duration"
                  name="Duracion"
                  onChange={(e) => handleChange(e)}
                ></input>
              </div>
              <div className={styles.containerSeason}>
                <p className={styles.season}>SEASON</p>
                <select onChange={(e) => handleChange(e)} name="Temporada">
                  <option value="Verano">Summer</option>
                  <option value="Otoño">Autumn</option>
                  <option value="Invierno">Winter</option>
                  <option value="Primavera">Spring</option>
                </select>
              </div>
            </div>
            <div className={styles.containerAddCountries}>
              <div>
                <p className={styles.addCountries}>ADD COUNTRIES</p>
                <input
                  list="list"
                  placeholder="Country"
                  ref={inputCountries}
                  onChange={(e) => {
                    handleSelect(e);
                  }}
                />
                <datalist id="list" className={styles.dataList}>
                  {listCountries.map((e) => {
                    return <option key={e.ID}>{e.Nombre}</option>;
                  })}
                </datalist>
              </div>
              <button
                className={styles.btn}
                onClick={(e) => handleAddCountries(e, inputCountries)}
              >
                Add
              </button>

              <div className={styles.countriesSelectedContainer}>
                <p className={styles.countriesAdded}>Countries Added</p>
                <div className={styles.listCountries}>
                  {data.idPais.map((ID) => {
                    let countryName = listCountries.find((e) => e.ID === ID);
                    return (
                      <div key={countryName.ID}>
                        <label className={styles.checkbox}>
                          <input
                            value={countryName.ID}
                            type="checkbox"
                            onClick={(e) => handleSelectCheckBox(e)}
                          />
                          {countryName.Nombre}
                        </label>
                        <br />
                      </div>
                    );
                  })}
                </div>
                <button
                  id={styles.delete}
                  name="btn_Delete"
                  type="button"
                  disabled={flagBtnDelete}
                  onClick={(e) => handleDeleteCountries(e)}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className={styles.containerBtns}>
              <button className={styles.btn} type="submit">
                Create
              </button>
              <button
                className={styles.btn}
                type="reset"
                onClick={(e) => handleReset()}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
