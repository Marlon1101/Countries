import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const FILTER_ASCENDENT_DESCENDENT = "FILTER_ASCENDENT_DESCENDENT";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const SEARCH_COUNTRY = "SEARCH_COUNTRY";
export const SEARCH_BY_ID = "SEARCH_BY_ID";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";

export function getCountries(field) {
  return async (dispatch) => {
    const json = await axios.get("/api/countries");

    return dispatch({
      type: GET_COUNTRIES,
      payload: json.data,
      field,
    });
  };
}

export function filterCountriesByContinent(payload) {
  return (dispatch) => {
    return dispatch({
      type: FILTER_BY_CONTINENT,
      payload,
    });
  };
}

export function filterCountriesByActivity(payload) {
  return (dispatch) => {
    return dispatch({
      type: FILTER_BY_ACTIVITY,
      payload,
    });
  };
}

export function sortCountries(payload, by) {
  return (dispatch) => {
    return dispatch({
      type: FILTER_ASCENDENT_DESCENDENT,
      payload,
      by,
    });
  };
}

export function searchCountry(payload) {
  return async (dispatch) => {
    try {
      const json = await axios.get(
        `/api/countries?name=${payload}`
      );
      return dispatch({
        type: SEARCH_COUNTRY,
        payload: json.data,
        dataLength: payload.length,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function searchById(payload) {
  return async (dispatch) => {
    const json = await axios.get(
      `/api/countries/${payload}`
    );
    return dispatch({
      type: SEARCH_BY_ID,
      payload: json.data,
    });
  };
}

export function createActivity(payload) {
  return async (dispatch) => {
    const res = await axios.post("/api/activity", payload);
    return dispatch({
      type: CREATE_ACTIVITY,
      payload: res.data,
    });
  };
}
