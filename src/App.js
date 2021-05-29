import './App.css';
import React,{useEffect} from 'react';
import  Header from'./components/Header';
import Home from './components/Home';
import {BrowserRouter as Router,Switch,Route}
from "react-router-dom";
import Checkout from './components/Checkout';
import Login from './components/Login';
import {auth} from './Firebase';
import {useStateValue} from './StateProvider';
import Payment from './components/Payment';
function App() {

  const [{},dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser =>{
      console.log('User is',authUser);
      if(authUser){
        dispatch({
          type:'SET_USER',
          user:authUser
        })

      }
      else{
        dispatch({
          type:'SET_USER',
          user:null
        })
      }
    })
    
  }, [])
  return (
    <Router>
    <div className="app">
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/checkout">
          <Header />
          <Checkout />
        </Route>
        <Route path="/payment">
          <Header />
          <Payment/>
        </Route>
        <Route path="/">
          <Header />
          <Home />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
