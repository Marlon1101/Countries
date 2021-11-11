import { Link } from "react-router-dom";
import Cards from "./Cards";
import styles from "./Styles/CountriesList.module.css"
export default function CountriesList(props) {
  if(!props.stateUpdate){
    return <p>Loading...</p>
  }
  else{
  return (
    <div className={styles.containerCards}>
      {props.cCountries?.map((e) => {
        return (
          <div key={e.ID}>
            <Link to={"/home/" + e.ID}>
              <Cards img={e.Imagen} name={e.Nombre} continent={e.Continente} />
            </Link>
          </div>
        );
      })}
    </div>
  );}
}
