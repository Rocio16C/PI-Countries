import './App.css';
import { Route, useLocation } from 'react-router-dom';
import Landing from './Pages/Landing/Landing.jsx';
import Home from './Pages/Home/Home.jsx';
import CountryDetail from './Pages/CountryDetail/CountryDetail.jsx';
import CreateActivity from './Pages/CreateActivity/CreateActivity.jsx';
import NavBar from './Components/NavBar/NavBar.jsx';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      
      {location.pathname !== '/' && <Route render={(unObjeto) => <NavBar unObjeto={unObjeto}/>}/>}

      <Route exact path='/' component={Landing} />
      <Route path='/countries' component={Home} />
      <Route path='/country/:id' component={CountryDetail} />
      <Route path='/activity/create' component={CreateActivity} />
    </div>
  );
}

export default App;
