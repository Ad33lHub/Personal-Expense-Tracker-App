
import { useState } from 'react';
import './App.css';
import Dashboard from './frontEnd/Dashboard';
import Transaction from './frontEnd/Transaction';
import Accounts from './frontEnd/AccountComponent';
import Setting from './frontEnd/SettingComponent';
import Reports from './frontEnd/Reports';

function App() {

  const [showActiveSection, SetActiveSection] = useState('Dashboard');

  return (
    <>
      <div className="container">
        <div className="sidebar">
          <div className="logo">
            <div className="logo-icon">$</div>
            <h2>Money Tracker</h2>
          </div>
          <ul className="nav-menu">
            <li className={showActiveSection === 'Dashboard' ? "nav-item active" : "nav-item"} onClick={() => { SetActiveSection('Dashboard') }}>
              <i>📊</i> Dashboard
            </li>
            <li className={showActiveSection === 'Transaction' ? "nav-item active" : "nav-item"} onClick={() => { SetActiveSection('Transaction') }}>
              <i>💰</i> Transactions
            </li>
            <li className={showActiveSection === 'Accounts' ? "nav-item active" : "nav-item"} onClick={() => { SetActiveSection('Accounts') }}>
              <i>💳</i> Accounts
            </li>
            <li className={showActiveSection === 'Report' ? "nav-item active" : "nav-item"} onClick={() => { SetActiveSection('Report') }}>
              <i>📈</i> Reports
            </li>
            
            <li className={showActiveSection === 'Setting' ? "nav-item active" : "nav-item"} onClick={() => { SetActiveSection('Setting') }}>
              <i>⚙️</i> Settings
            </li>
          </ul>
        </div>
        {showActiveSection === 'Dashboard' && <Dashboard />}
        {showActiveSection === 'Transaction' && <Transaction />}
        {showActiveSection === 'Accounts' && <Accounts />}
        {showActiveSection === 'Setting' && <Setting />}
        {showActiveSection === 'Report' && <Reports/>}
      </div>


    </>
  );
}

export default App;
