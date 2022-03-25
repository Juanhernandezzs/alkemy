import './App.css';
import { Route, Switch } from "react-router-dom";
import Home from './components/Home/Home.js';
import AddTransaction from './components/AddTransaction/AddTransaction';
import AllTransactions from './components/AllTransactions/AllTransactions';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <nav className='flex items-center justify-between flex-wrap bg-gray-800 p-3 w-full sticky top-0'>
        <Link to='/'>
          <h1 className='font-mono text-white'>Alkemy challenge</h1>
        </Link>
      </nav>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/add' component={AddTransaction} />
        <Route exact path='/all' component={AllTransactions} />
      </Switch>
    </div>
  );
}

export default App;
