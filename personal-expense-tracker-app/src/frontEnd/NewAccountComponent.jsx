import { useState } from 'react';
import './designCss/NewAccModal.css';

export default function NewAccountModal({ isOpen, onClose ,onSave}) {
  

  const [name, setName] = useState('');
  const [group, setGroup] = useState('Cash');
  const [balance, setBalance] = useState('');
  
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === '') {
      alert('Name is required');
      return;
    }

    const newAccount = {
      name,
      group,
      balance,
    };

    onSave(newAccount);

    setName('');
    setGroup('Cash');
    setBalance('');
    onClose();
  };

  return (
    <div className="nmodal" id="newAccountModal">
      <div className="nmodal-content" >
        <span className="nclose" onClick={onClose}>
          &times;
        </span>
        <h2>New Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="nform-group">
            <label>Name *</label>
            <input
              type="text"
              placeholder="Account name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="nform-group">
            <label>Group</label>
            <select value={group} onChange={(e) => setGroup(e.target.value)}>
              <option>Cash</option>
              <option>Asset</option>
              <option value={'BankAccount'}>Bank Account</option>
              <option>Deposit</option>
              <option>Credit</option>
            </select>
          </div>
          <div className="nform-group">
            <label>Balance</label>
            <input
              type="text"
              placeholder="USD"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
            />
          </div>
          <button type="submit" className="nsave-btn">
            Save Account
          </button>
        </form>
      </div>
    </div>
  );
}
