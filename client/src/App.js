import React from 'react';
import Header from './components/Header'
import Balance from './components/Balance'
import BudgetExpenses from './components/BudgetExpenses'
import TransactionList from './components/TransactionList'
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Balance />
        <BudgetExpenses />
        <TransactionList />
      </div>
    </div>
  );
}

export default App;
