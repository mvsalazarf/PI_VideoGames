import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import CreateVg from '../src/components/CreateVg/createVg';
import VgDetails from './components/VgDetails/VgDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/videogames' component={CreateVg} />
        <Route exact path= '/videogames/:id' component = {VgDetails} />
        <Route exact path='/home' component={Home} />          
     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
