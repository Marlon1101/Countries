import {
  GET_COUNTRIES,
  FILTER_BY_CONTINENT,
  FILTER_BY_ACTIVITY,
  FILTER_ASCENDENT_DESCENDENT,
  SEARCH_COUNTRY,
  SEARCH_BY_ID,
  CREATE_ACTIVITY,
} from "../actions/index";

export const initialState = {
  countries: [],
  allCountries: [],
  filters: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      switch (action.field) {
        case "all":
          return {
            ...state,
            countries: action.payload,
            allCountries: action.payload,
          };
        case "countries":
          return {
            ...state,
            countries: action.payload,
          };

        case "allCountries":
          return {
            ...state,
            allCountries: action.payload,
          };
        case "recharge":
          return {
            ...state,
            countries: state.allCountries,
          };

        default:
          return "Invalid Value";
      }

    case FILTER_BY_CONTINENT:
      const allCountries = state.allCountries;
      const countriesFiltered =
        action.payload === "All"
          ? allCountries
          : allCountries.filter((e) => e.Continente === action.payload);
      if (action.payload === "All") {
        return {
          ...state,
          countries: countriesFiltered,
          filters: [],
        };
      }
      return {
        ...state,
        countries: countriesFiltered,
        filters: countriesFiltered,
      };

    case FILTER_BY_ACTIVITY:
      if (action.payload === "All") {
        if (state.filters.length) {
          return {
            ...state,
            countries: state.filters,
          };
        } else {
          return {
            ...state,
            countries: state.allCountries,
          };
        }
      } else {
        let ActivityCountries = [];
        state.filters.length
          ? (ActivityCountries = state.filters)
          : (ActivityCountries = state.allCountries);
        let countriesFilteredByActivity = [];
        ActivityCountries.filter((element) => {
          return element.activities.forEach((e) => {
            if (
              e.Temporada === action.payload &&
              !countriesFilteredByActivity.includes(element)
            ) {
              countriesFilteredByActivity.push(element);
            }
          });
        });
        if (countriesFilteredByActivity.length) {
          return {
            ...state,
            countries: countriesFilteredByActivity,
            allCountries: state.allCountries,
          };
        } else {
          alert("Sorry, there aren't countries with activities in this season");
          return {
            ...state,
          };
        }
      }

    case FILTER_ASCENDENT_DESCENDENT:
      let countriesAsc;
      if (action.payload === "Ascendent" && action.by === "Poblacion") {
        countriesAsc = state.countries.sort(function (a, b) {
          return a.Poblacion - b.Poblacion;
        });
      } else if (action.payload === "Descendent" && action.by === "Poblacion") {
        countriesAsc = state.countries.sort(function (a, b) {
          return b.Poblacion - a.Poblacion;
        });
      }

      if (action.payload === "Ascendent" && action.by === "Nombre") {
        countriesAsc = state.countries.sort(function (a, b) {
          if (a.Nombre > b.Nombre) return 1;
          if (b.Nombre > a.Nombre) return -1;
          return 0;
        });
      } else if (action.payload === "Descendent" && action.by === "Nombre") {
        countriesAsc = state.countries.sort(function (a, b) {
          if (a.Nombre > b.Nombre) return -1;
          if (b.Nombre > a.Nombre) return 1;
          return 0;
        });
      }
      return {
        ...state,
        countries: countriesAsc,
      };

    case SEARCH_COUNTRY: 
    if (action.dataLength === 1 || !action.payload.length) {
        return {
          ...state,
          countries: state.allCountries,
        };
      } else {
        return {
          ...state,
          countries: action.payload,
        };
      }
    case SEARCH_BY_ID:
      return {
        ...state,
        allCountries: action.payload,
      };
    case CREATE_ACTIVITY:
      return {
        ...state,
        alert: alert(action.payload),
      };
    default:
      return state;
  }
};

export default rootReducer;
