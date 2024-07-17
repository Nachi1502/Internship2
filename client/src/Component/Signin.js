import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signin = ({ setIsLoggedIn }) => {
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch('/signin', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    const data = await res.json();

    if (res.status === 400 || !data) {
      window.alert("Invalid Login");
      console.log("Invalid Login");
    } else {
      window.alert("Successful Login");
      console.log("Successful Login");

      setIsLoggedIn(true);
      navigate("/");
    }
  }

  return (
    <div className='main-section'>
      <div className="wrapper">
        <div className="form-left">
          <h2 className="text-uppercase">information</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et molestie ac feugiat sed. Diam volutpat commodo.
          </p>
          <p className="text">
            <span>Sub Head:</span>
            Vitae auctor eu augudsf ut. Malesuada nunc vel risus commodo viverra. Praesent elementum facilisis leo vel.
          </p>
          <div className="form-field">
            <input type="submit" className="account" value="Have an Account?" />
          </div>
        </div>
        <form className="form-right" method='POST'>
          <h2 className="text-uppercase">Login form</h2>

          <div className="mb-3">
            <label>Email</label>
            <input type="email" className="input-field" name="email" required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="row">
            <div className="col-sm-6 mb-3">
              <label>Password</label>
              <input type="password" name="password" id="pwd" className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="form-field">
            <input type="submit" value="signin" className="register" name="signin"
              onClick={loginUser}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signin;
