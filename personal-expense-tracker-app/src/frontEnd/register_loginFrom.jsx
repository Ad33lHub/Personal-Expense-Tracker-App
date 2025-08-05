import { useState } from 'react';
import './designCss/Register'


export default function Register() {


  let [isRightContainerClass, SetContainerClass] = useState(true);



  return (
    <>
      <div className={isRightContainerClass ? 'container right-panel-active' : 'container'} >
        <div className="form-container sign-up-container">
          {/* <form action="#"> */}
          <form>
            <h1>Create Account</h1>
            <div className="social-container">
              {/* <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a> */}
              <a href="https://facebook.com/yourprofile" className="social" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>

              <a href="https://plus.google.com/yourprofile" className="social" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-google-plus-g"></i>
              </a>

              <a href="https://linkedin.com/in/yourprofile" className="social" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>

            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button  >Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          {/* <form action="#"> */}
          <form>
            <h1>Sign in</h1>
            <div className="social-container">
              {/* <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a> */}
              <a href="https://facebook.com/yourprofile" className="social" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>

              <a href="https://plus.google.com/yourprofile" className="social" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-google-plus-g"></i>
              </a>

              <a href="https://linkedin.com/in/yourprofile" className="social" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>

            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            {/* <a href="#">Forgot your password?</a> */}
            <a>Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>



        <div className="overlay-container">
          <div className="overlay">

            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" onClick={() => {
                SetContainerClass(false)
              }}>Sign In</button>
            </div>



            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" onClick={() => { SetContainerClass(true) }}>Sign Up</button>
            </div>

          </div>
        </div>

      </div>







    </>
  );
}