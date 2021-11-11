import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { createActivity, searchById } from "../redux/actions";
import styles from "./Styles/CreateActivity.module.css";
import { sortCountries, getCountries } from "../redux/actions/index";

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
    setCountriesForDelete([])
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
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <Link to="/home/">Home</Link>
        <hr />
        <Link to={`/home/${params.idPais}`}>Detail Country</Link>
        <hr />
        <form
          name="f1"
          onSubmit={(e) => handleSubmit(e)}
          onChange={(e) => handleChangeCheckbox(e)}
        >
          <input
            type="texto"
            placeholder="Name"
            name="Nombre"
            onChange={(e) => handleChange(e)}
          ></input>
          <hr />
          <select
            id="difficulty"
            name="Dificultad"
            onChange={(e) => handleChange(e)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <hr />
          <input
            type="texto"
            placeholder="Duration"
            name="Duracion"
            onChange={(e) => handleChange(e)}
          ></input>
          <hr />
          <select onChange={(e) => handleChange(e)} name="Temporada">
            <option value="Verano">Summer</option>
            <option value="Otoño">Autumn</option>
            <option value="Invierno">Winter</option>
            <option value="Primavera">Spring</option>
          </select>
          <hr />
          <div className={styles.containerListCheckBox}>
            <div className={styles.listCheckBox}>
              <input
                list="list"
                placeholder="Country"
                ref={inputCountries}
                onChange={(e) => {
                  handleSelect(e);
                }}
              />
              <datalist id="list" className={styles.datalist}>
                {listCountries.map((e) => {
                  return <option key={e.ID}>{e.Nombre}</option>;
                })}
              </datalist>
            </div>
            <button
              className={styles.btn}
              onClick={(e) => handleAddCountries(e, inputCountries)}
            >
              Add Country
            </button>

            <div className={styles.countriesSelectedContainer}>
              <h3>Countries Added</h3>
              <div className={styles.listCountries}>
                {data.idPais.map((ID) => {
                  let countryName = listCountries.find((e) => e.ID === ID);
                  return (
                    <div key={countryName.ID}>
                      <label>
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
                name="btn_Delete"
                type="button"
                disabled={flagBtnDelete}
                onClick={(e) => handleDeleteCountries(e)}
              >
                Delete selected
              </button>
            </div>
          </div>
          <hr />
          <button type="submit">Create</button>
          <button type="reset" onClick={(e) => handleReset()}>
            Reset
          </button>
        </form>
      </div>
    );
  }
}
