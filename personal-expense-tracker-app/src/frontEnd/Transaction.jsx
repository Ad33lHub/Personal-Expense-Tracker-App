import React, { useState } from 'react'
import './designCss/transactionModal.css'
export default function Transaction() {

    const [editingId, setEditingId] = useState(null);
    
    const closeEditModal = () => {
    document.getElementById('editModal').style.display = 'none';
    setEditingId(null);
  };
    return (
        <>
            <div className="main-content">
                <div className="header">
                    <h1 className="welcome-text">Welcome to your Transaction!</h1>
                    <p className="subtitle">Track your transactions</p>
                </div>
                <div className="transactions-section">
                    <div className="transactions-header">
                        <h3 className="section-title">Recent Transactions</h3>
                        <div className="filter-buttons">
                            <button className="filter-btn active" data-filter="all">All</button>
                            <button className="filter-btn" data-filter="income">Income</button>
                            <button className="filter-btn" data-filter="expense">Expense</button>
                        </div>
                    </div>
                    <div className="transactions-list" id="transactionsList">
                    </div>
                </div>
            </div>



            <div id="editModal" className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3>Edit Transaction</h3>
                        <button className="close-btn" onClick={closeEditModal}>&times;</button>
                    </div>
                    <form id="editForm">
                        <div className="type-toggle">
                            <div className="type-option" data-type="income">Income</div>
                            <div className="type-option" data-type="expense">Expense</div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <input type="text" className="form-input" id="editDescription" required />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Amount</label>
                                <input type="number" className="form-input" id="editAmount" step="0.01" required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Category</label>
                                <select className="form-select" id="editCategory" required>
                                    <option value="">Select category</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Date</label>
                            <input type="date" className="form-input" id="editDate" required />
                        </div>

                        <button type="submit" className="btn btn-income">
                            Update Transaction
                        </button>
                    </form>
                </div>
            </div>





        </>
    )
}
