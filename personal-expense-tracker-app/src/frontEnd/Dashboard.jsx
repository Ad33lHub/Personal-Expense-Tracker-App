import React, { useEffect, useState } from 'react'
import './designCss/prototypeCss.css'


export default function Dashboard() {
  // Categories
  const categories = {
    income: ['Salary', 'Freelance', 'Business', 'Investment', 'Gift', 'Other'],
    expense: ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Education', 'Other']
  };

  // State management
  const [transactions, setTransactions] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);

  // Initialize component
  useEffect(() => {
    // Set default date to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
      dateInput.valueAsDate = new Date();
    }

    // Initialize categories
    updateCategories('income');
    updateEditCategories('income');

    // Load transactions and update stats
    displayTransactions();
    updateStats();
  }, []);

  // Update transactions and stats when transactions change
  useEffect(() => {
    displayTransactions();
    updateStats();
  }, [transactions, currentFilter]);

  // Update categories
  const updateCategories = (type) => {
    const categorySelect = document.getElementById('category');
    if (categorySelect) {
      categorySelect.innerHTML = '<option value="">Select category</option>';
      categories[type].forEach(cat => {
        categorySelect.innerHTML += `<option value="${cat}">${cat}</option>`;
      });
    }
  };

  const updateEditCategories = (type) => {
    const categorySelect = document.getElementById('editCategory');
    if (categorySelect) {
      categorySelect.innerHTML = '<option value="">Select category</option>';
      categories[type].forEach(cat => {
        categorySelect.innerHTML += `<option value="${cat}">${cat}</option>`;
      });
    }
  };

  // Handle transaction submission
  const handleTransactionSubmit = (e) => {
    e.preventDefault();

    const type = document.querySelector('.type-option.active').dataset.type;
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;

    const transaction = {
      id: Date.now(),
      type,
      description,
      amount,
      category,
      date,
      timestamp: new Date().toISOString()
    };

    setTransactions(prev => [transaction, ...prev]);

    // Reset form
    document.getElementById('transactionForm').reset();
    document.getElementById('date').valueAsDate = new Date();
    document.querySelector('.type-option[data-type="income"]').classList.add('active');
    document.querySelector('.type-option[data-type="expense"]').classList.remove('active');
    updateCategories('income');
  };

  // Handle edit submission
  const handleEditSubmit = (e) => {
    e.preventDefault();

    const type = document.querySelector('#editModal .type-option.active').dataset.type;
    const description = document.getElementById('editDescription').value;
    const amount = parseFloat(document.getElementById('editAmount').value);
    const category = document.getElementById('editCategory').value;
    const date = document.getElementById('editDate').value;

    setTransactions(prev =>
      prev.map(t =>
        t.id === editingId
          ? { ...t, type, description, amount, category, date }
          : t
      )
    );

    closeEditModal();
  };

  // Display transactions
  const displayTransactions = () => {
    const container = document.getElementById('transactionsList');
    if (!container) return;

    let filteredTransactions = transactions;

    if (currentFilter !== 'all') {
      filteredTransactions = transactions.filter(t => t.type === currentFilter);
    }

    if (filteredTransactions.length === 0) {
      container.innerHTML = '<div style="text-align: center; color: #666; padding: 2rem;">No transactions found</div>';
      return;
    }

    container.innerHTML = filteredTransactions.map(transaction => `
    <div class="transaction-item">
      <div class="transaction-info">
        <div class="transaction-title">${transaction.description}</div>
        <div class="transaction-details">${transaction.category} • ${formatDate(transaction.date)}</div>
      </div>
      <div class="transaction-amount ${transaction.type}">
        ${transaction.type === 'income' ? '+' : '-'}$${transaction.amount.toFixed(2)}
      </div>
      <div class="transaction-actions">
        <button class="action-btn edit-btn" onclick="editTransaction(${transaction.id})">Edit</button>
        <button class="action-btn delete-btn" onclick="deleteTransaction(${transaction.id})">Delete</button>
      </div>
    </div>
  `).join('');
  };

  // Update statistics
  const updateStats = () => {
    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expenses;

    const totalIncomeEl = document.getElementById('totalIncome');
    const totalExpensesEl = document.getElementById('totalExpenses');
    const netBalanceEl = document.getElementById('netBalance');

    if (totalIncomeEl) totalIncomeEl.textContent = `$${income.toFixed(2)}`;
    if (totalExpensesEl) totalExpensesEl.textContent = `$${expenses.toFixed(2)}`;
    if (netBalanceEl) {
      netBalanceEl.textContent = `$${balance.toFixed(2)}`;
      netBalanceEl.style.color = balance >= 0 ? '#4CAF50' : '#f44336';
    }
  };

  // Edit transaction
  const editTransaction = (id) => {
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) return;

    setEditingId(id);

    // Set type
    document.querySelectorAll('#editModal .type-option').forEach(opt => opt.classList.remove('active'));
    document.querySelector(`#editModal .type-option[data-type="${transaction.type}"]`).classList.add('active');

    // Update categories and set values
    updateEditCategories(transaction.type);

    document.getElementById('editDescription').value = transaction.description;
    document.getElementById('editAmount').value = transaction.amount;
    document.getElementById('editCategory').value = transaction.category;
    document.getElementById('editDate').value = transaction.date;

    document.getElementById('editModal').style.display = 'block';
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  // Open transaction modal
  const openTransactionModal = (type) => {
    // Set the type in the main form
    document.querySelectorAll('#transactionForm .type-option').forEach(opt => opt.classList.remove('active'));
    document.querySelector(`#transactionForm .type-option[data-type="${type}"]`).classList.add('active');
    updateCategories(type);

    // Scroll to form
    document.querySelector('.transaction-form').scrollIntoView({ behavior: 'smooth' });
  };

  // Close edit modal
  const closeEditModal = () => {
    document.getElementById('editModal').style.display = 'none';
    setEditingId(null);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Event listeners setup
  useEffect(() => {
    // Type toggle
    document.querySelectorAll('.type-option').forEach(option => {
      option.addEventListener('click', function () {
        const container = this.parentElement;
        const type = this.dataset.type;

        container.querySelectorAll('.type-option').forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');

        if (container.parentElement.id === 'editModal') {
          updateEditCategories(type);
        } else {
          updateCategories(type);
        }
      });
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        setCurrentFilter(this.dataset.filter);
      });
    });

    // Forms
    const transactionForm = document.getElementById('transactionForm');
    const editForm = document.getElementById('editForm');

    if (transactionForm) {
      transactionForm.addEventListener('submit', handleTransactionSubmit);
    }
    if (editForm) {
      editForm.addEventListener('submit', handleEditSubmit);
    }

    // Close modal when clicking outside
    window.addEventListener('click', function (e) {
      const modal = document.getElementById('editModal');
      if (e.target === modal) {
        closeEditModal();
      }
    });

    // Cleanup function
    return () => {
      document.querySelectorAll('.type-option').forEach(option => {
        option.removeEventListener('click', () => { });
      });
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.removeEventListener('click', () => { });
      });
      if (transactionForm) {
        transactionForm.removeEventListener('submit', handleTransactionSubmit);
      }
      if (editForm) {
        editForm.removeEventListener('submit', handleEditSubmit);
      }
    };
  }, []);




  // Make functions globally available for onclick handlers
  window.editTransaction = editTransaction;
  window.deleteTransaction = deleteTransaction;
  window.openTransactionModal = openTransactionModal;

  return (
    <>


      {/* main content */}
      <div className="main-content">
        <div className="header">
          <h1 className="welcome-text">Welcome to your Dashboard!</h1>
          <p className="subtitle">Track your income and expenses with ease</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card income">
            <div className="stat-title">Total Income</div>
            <div className="stat-amount" id="totalIncome">$0.00</div>
            <div className="stat-change">This month</div>
          </div>
          <div className="stat-card expense">
            <div className="stat-title">Total Expenses</div>
            <div className="stat-amount" id="totalExpenses">$0.00</div>
            <div className="stat-change">This month</div>
          </div>
          <div className="stat-card balance">
            <div className="stat-title">Net Balance</div>
            <div className="stat-amount" id="netBalance">$0.00</div>
            <div className="stat-change">Current balance</div>
          </div>
        </div>

        {/* action cart */}
        <div className="action-section">
          <div className="quick-actions">
            <h3 className="section-title">Quick Actions</h3>
            <div className="action-buttons">
              <button className="btn btn-income" onClick={() => openTransactionModal('income')}>
                + Add Income
              </button>
              <button className="btn btn-expense" onClick={() => openTransactionModal('expense')}>
                - Add Expense
              </button>
            </div>
          </div>

          <div className="transaction-form">
            <h3 className="section-title">Add Transaction</h3>
            <form id="transactionForm">
              <div className="type-toggle">
                <div className="type-option active" data-type="income">Income</div>
                <div className="type-option" data-type="expense">Expense</div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <input type="text" className="form-input" id="description" placeholder="Enter description" required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Amount</label>
                  <input type="number" className="form-input" id="amount" placeholder="0.00" step="0.01" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-select" id="category" required>
                    <option value="">Select category</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Date</label>
                <input type="date" className="form-input" id="date" required />
              </div>

              <button type="submit" className="btn btn-income">
                Add Transaction
              </button>
            </form>
          </div>
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