import React, { useState } from 'react';
import './designCss/AccountCss.css';
import NewAccountModal from './NewAccountComponent';

// ✅ Initial Account Data
const initialAccList = {
  
};

// ✅ Utility to update account list
const updateMyAccList = (prevList, newAccount) => {
  const groupKey = newAccount.group;
  const isNegative = groupKey === 'Credit';

  const formattedBalance = `${isNegative ? '-' : ''}${parseFloat(newAccount.balance).toFixed(2)} USD`;

  const existingGroup = prevList[groupKey] || {
    label: groupKey,
    amount: '0 USD',
    type: isNegative ? 'negative' : 'positive',
    subItems: [],
  };

  const updatedSubItems = [...existingGroup.subItems, {
    name: newAccount.name,
    balances: formattedBalance,
  }];

  const totalAmount = updatedSubItems.reduce((sum, item) => {
    const clean = parseFloat(item.balances.replace(/[^\d.-]/g, '')) || 0;
    console.log('clean value '+clean);
    return sum + clean;
  }, 0);

  const updatedGroup = {
    ...existingGroup,
    subItems: updatedSubItems,
    amount: `${isNegative ? '-' : ''}${Math.abs(totalAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })} USD`,
  };

  return {
    ...prevList,
    [groupKey]: updatedGroup,
  };
};

export default function AccountComponent() {
  const [openSection, setOpenSection] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [accList, setAccList] = useState(initialAccList);

  const handleSaveAccount = (newAccount) => {
    setAccList(prev => updateMyAccList(prev, newAccount));
  };

  const openNewAccountModal = () => setModalOpen(true);
  const closeNewAccountModal = () => setModalOpen(false);

  const toggleDetails = (id) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <div className="main-content">
        <div className="header">
          <h1 className="welcome-text">Welcome !</h1>
          <p className="subtitle">Track your Accounts details</p>
        </div>

        <div className="Account-Section">
          <div className="Account-Header">
            <button className='new-btn' onClick={openNewAccountModal}>
              <span className="icon">+</span>
              <span className="text">New</span>
            </button>
          </div>

          <div className="Account-List">
            {Object.entries(accList).map(([key, data]) => (
              <React.Fragment key={key}>
                <div className="account-row" onClick={() => toggleDetails(key)}>
                  <span className="account-name">{data.label}</span>
                  <span className={`account-amount ${data.type}`}>{data.amount}</span>
                </div>

                {openSection === key && (
                  <div className="sub-items">
                    {data.subItems.map((item, idx) => (
                      <div className="sub-row" key={idx}>
                        <span className="wallet-name blue-link">{item.name}</span>
                        <div className="wallet-balances">
                          <div className="amount">{item.balances}</div>
                        </div>
                        <button className="edit-btn">✏️</button>
                      </div>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <NewAccountModal isOpen={isModalOpen} onClose={closeNewAccountModal} onSave={handleSaveAccount} />
    </>
  );
}
