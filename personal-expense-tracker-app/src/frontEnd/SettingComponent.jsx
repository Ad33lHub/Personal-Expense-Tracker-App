import React, { useState } from 'react';

const Settings = () => {
  const [userDetails, setUserDetails] = useState({
    id: 'USR001',
    email: 'user@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [isEditing, setIsEditing] = useState({
    id: false,
    email: false,
    password: false
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [errors, setErrors] = useState({});
  const [saveSuccess, setSaveSuccess] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleInputChange = (field, value) => {
    setUserDetails(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSave = (field) => {
    const newErrors = {};

    if (field === 'email') {
      if (!validateEmail(userDetails.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (field === 'password') {
      if (!userDetails.currentPassword) {
        newErrors.currentPassword = 'Current password is required';
      }
      if (!validatePassword(userDetails.newPassword)) {
        newErrors.newPassword = 'Password must be at least 8 characters long';
      }
      if (userDetails.newPassword !== userDetails.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (field === 'id') {
      if (!userDetails.id.trim()) {
        newErrors.id = 'User ID cannot be empty';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsEditing(prev => ({
      ...prev,
      [field]: false
    }));

    setSaveSuccess(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`);
    
    if (field === 'password') {
      setUserDetails(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    }

    setTimeout(() => setSaveSuccess(''), 3000);
  };

  const handleCancel = (field) => {
    setIsEditing(prev => ({
      ...prev,
      [field]: false
    }));
    setErrors({});
    
    if (field === 'password') {
      setUserDetails(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };


  const iconStyle = {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    marginRight: '8px',
    textAlign: 'center',
    fontSize: '14px',
    verticalAlign: 'middle'
  };

  const buttonIconStyle = {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    marginRight: '6px',
    textAlign: 'center',
    fontSize: '12px',
    verticalAlign: 'middle'
  };

  return (
    <div style={{ flex:'1', padding: '2rem', overflowY:'auto'}}>
      <div style={{backgroundColor: 'white',padding:'20px', marginBottom:'20px', borderRadius:'20px'}}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
          Account Settings
        </h2>
        <p style={{ color: '#6b7280' }}>Manage your profile information and security settings</p>
      </div>

      {saveSuccess && (
        <div style={{ 
          marginBottom: '24px', 
          padding: '16px', 
          backgroundColor: '#f0fdf4', 
          border: '1px solid #bbf7d0', 
          borderRadius: '8px', 
          display: 'flex', 
          alignItems: 'center',
        }}>
          <span style={{ color: '#16a34a', marginRight: '8px' }}>✓</span>
          <span style={{ color: '#15803d' }}>{saveSuccess}</span>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' , backgroundColor: 'white', borderRadius:'20px', padding:'20px'}}>
     
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ ...iconStyle, color: '#6b7280' }}>👤</span>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: 0 }}>User ID</h3>
            </div>
            {!isEditing.id && (
              <button
                onClick={() => setIsEditing(prev => ({ ...prev, id: true }))}
                style={{
                  padding: '4px 12px',
                  fontSize: '14px',
                  color: '#2563eb',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
                onMouseOver={(e) => e.target.style.color = '#1d4ed8'}
                onMouseOut={(e) => e.target.style.color = '#2563eb'}
              >
                Edit
              </button>
            )}
          </div>

          {isEditing.id ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="text"
                value={userDetails.id}
                onChange={(e) => handleInputChange('id', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: errors.id ? '1px solid #ef4444' : '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = errors.id ? '#ef4444' : '#d1d5db'}
                placeholder="Enter your user ID"
              />
              {errors.id && (
                <p style={{ color: '#ef4444', fontSize: '14px', margin: 0 }}>{errors.id}</p>
              )}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleSave('id')}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#16a34a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '14px'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#15803d'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#16a34a'}
                >
                  <span style={buttonIconStyle}>💾</span>
                  Save
                </button>
                <button
                  onClick={() => handleCancel('id')}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#d1d5db',
                    color: '#374151',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '14px'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#9ca3af'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#d1d5db'}
                >
                  <span style={buttonIconStyle}>✕</span>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p style={{ 
              color: '#374151', 
              fontFamily: 'monospace', 
              backgroundColor: '#f9fafb', 
              padding: '8px 12px', 
              borderRadius: '4px',
              margin: 0
            }}>
              {userDetails.id}
            </p>
          )}
        </div>

        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ ...iconStyle, color: '#6b7280' }}>📧</span>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: 0 }}>Email Address</h3>
            </div>
            {!isEditing.email && (
              <button
                onClick={() => setIsEditing(prev => ({ ...prev, email: true }))}
                style={{
                  padding: '4px 12px',
                  fontSize: '14px',
                  color: '#2563eb',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
                onMouseOver={(e) => e.target.style.color = '#1d4ed8'}
                onMouseOut={(e) => e.target.style.color = '#2563eb'}
              >
                Edit
              </button>
            )}
          </div>

          {isEditing.email ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="email"
                value={userDetails.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: errors.email ? '1px solid #ef4444' : '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = errors.email ? '#ef4444' : '#d1d5db'}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p style={{ color: '#ef4444', fontSize: '14px', margin: 0 }}>{errors.email}</p>
              )}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleSave('email')}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#16a34a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '14px'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#15803d'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#16a34a'}
                >
                  <span style={buttonIconStyle}>💾</span>
                  Save
                </button>
                <button
                  onClick={() => handleCancel('email')}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#d1d5db',
                    color: '#374151',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '14px'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#9ca3af'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#d1d5db'}
                >
                  <span style={buttonIconStyle}>✕</span>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p style={{ color: '#374151', margin: 0 }}>{userDetails.email}</p>
          )}
        </div>

      
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ ...iconStyle, color: '#6b7280' }}>🔒</span>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: 0 }}>Password</h3>
            </div>
            {!isEditing.password && (
              <button
                onClick={() => setIsEditing(prev => ({ ...prev, password: true }))}
                style={{
                  padding: '4px 12px',
                  fontSize: '14px',
                  color: '#2563eb',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
                onMouseOver={(e) => e.target.style.color = '#1d4ed8'}
                onMouseOut={(e) => e.target.style.color = '#2563eb'}
              >
                Change Password
              </button>
            )}
          </div>

          {isEditing.password ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                  Current Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    value={userDetails.currentPassword}
                    onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 40px 8px 12px',
                      border: errors.currentPassword ? '1px solid #ef4444' : '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                    onBlur={(e) => e.target.style.borderColor = errors.currentPassword ? '#ef4444' : '#d1d5db'}
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    style={{
                      position: 'absolute',
                      right: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#6b7280',
                      fontSize: '14px'
                    }}
                    onMouseOver={(e) => e.target.style.color = '#374151'}
                    onMouseOut={(e) => e.target.style.color = '#6b7280'}
                  >
                    {showPasswords.current ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.currentPassword && (
                  <p style={{ color: '#ef4444', fontSize: '14px', margin: '4px 0 0 0' }}>{errors.currentPassword}</p>
                )}
              </div>

         
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                  New Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={userDetails.newPassword}
                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 40px 8px 12px',
                      border: errors.newPassword ? '1px solid #ef4444' : '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                    onBlur={(e) => e.target.style.borderColor = errors.newPassword ? '#ef4444' : '#d1d5db'}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    style={{
                      position: 'absolute',
                      right: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#6b7280',
                      fontSize: '14px'
                    }}
                    onMouseOver={(e) => e.target.style.color = '#374151'}
                    onMouseOut={(e) => e.target.style.color = '#6b7280'}
                  >
                    {showPasswords.new ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.newPassword && (
                  <p style={{ color: '#ef4444', fontSize: '14px', margin: '4px 0 0 0' }}>{errors.newPassword}</p>
                )}
              </div>

        
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                  Confirm New Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={userDetails.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 40px 8px 12px',
                      border: errors.confirmPassword ? '1px solid #ef4444' : '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                    onBlur={(e) => e.target.style.borderColor = errors.confirmPassword ? '#ef4444' : '#d1d5db'}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    style={{
                      position: 'absolute',
                      right: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#6b7280',
                      fontSize: '14px'
                    }}
                    onMouseOver={(e) => e.target.style.color = '#374151'}
                    onMouseOut={(e) => e.target.style.color = '#6b7280'}
                  >
                    {showPasswords.confirm ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p style={{ color: '#ef4444', fontSize: '14px', margin: '4px 0 0 0' }}>{errors.confirmPassword}</p>
                )}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleSave('password')}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#16a34a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '14px'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#15803d'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#16a34a'}
                >
                  <span style={buttonIconStyle}>💾</span>
                  Update Password
                </button>
                <button
                  onClick={() => handleCancel('password')}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#d1d5db',
                    color: '#374151',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '14px'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#9ca3af'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#d1d5db'}
                >
                  <span style={buttonIconStyle}>✕</span>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p style={{ color: '#374151', margin: 0 }}>••••••••••••</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;