import logo from './logo.svg';
import './App.css';
import Usuario from "./components/Usuario" 
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Rentas } from './components/Rentas';
import { Ventas } from './components/Ventas';
import { Libros } from './components/Libros';
import { Documentales } from './components/Documentales';
import { Cursos } from './components/Cursos';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar/>
      <Switch>
        <Router path="/Mis_Usuarios">
          <Usuario/>
        </Router>
        <Router path="/Mis_Rentas">
          <Rentas/>
        </Router>
        <Router path="/Mis_Ventas">
          <Ventas/>
        </Router>
        <Router path="/Mis_Libros">
          <Libros/>
        </Router>
        <Router path="/Mis_Documentales">
          <Documentales/>
        </Router>
        <Router path="/Mis_Cursos">
          <Cursos/>
        </Router>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
