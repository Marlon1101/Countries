import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import LandingPage from "./components/LandingPage"
import Home from './components/Home';
import Detail from './components/Detail';
import CreateActivity from './components/CreateActivity';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
<Routes>
  <Route path="/" element = {<LandingPage/>}/>
  <Route path="/home" element = {<Home/>}/>
  <Route path="/home/:idPais" element = {<Detail/>}/>
  <Route path="/home/:idPais/createActivity" element = {<CreateActivity/>}/>
</Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
