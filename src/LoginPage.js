import React, { useState,useEffect  } from 'react';

function LoginPage({ onLogin }) {

  const [showSignUp, setShowSignUp] = useState(false);
  useEffect(() => {
    setShowSignUp(false);
  }, []);


  const handleSignUpClick = () => {
      setShowSignUp(true);
  };

  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };


  const handleSubmitForLogIn = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    fetch('https://eteh2euzvc.execute-api.us-east-1.amazonaws.com/dev/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => response.text())
      .then(response => {
        if (/^[a-fA-F0-9]{24}$/.test(response)) {
          
            onLogin(response);
        } else {
          console.log("not faund")
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSubmitForSignUp = (event) => {
      event.preventDefault();
      const firstName = event.target.elements.firstName.value;
      const lastName = event.target.elements.lastName.value;
      const email = event.target.elements.email.value;
      const password = event.target.elements.password.value;
      const userData = { firstName, lastName, email, password };
      fetch('https://eteh2euzvc.execute-api.us-east-1.amazonaws.com/dev/users', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
      })
          .then(response => response.json())
          .then(user => {

              console.log(`Added user`);
              setShowSignUp(false);

          })
          .catch(error => console.error(error));
  };

  return (
    <>
      {!showSignUp ? (<div className="container container-xxl container-xl  container-lg col-lg-3  container-md container-sm col-md-4 col-sm-5 col-7 mt-5 border border-secondary rounded" id="app-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmitForLogIn}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" placeholder="email@example.com" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" placeholder="Password" required />
          </div>
          <div className="mb-3">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="dropdownCheck2" checked={checked} onChange={handleCheckboxChange} />
              <label className="form-check-label" htmlFor="dropdownCheck2">
                Remember me
              </label>
            </div>
          </div>
          <button style={{ marginBottom: '10px' }} type="submit" className="btn btn-primary">Sign in</button>
          <button style={{ marginBottom: '10px', marginLeft: '10px' }} onClick={handleSignUpClick} className="btn btn-success">Sign Up</button>
        </form>
      </div>) :
        (
          <div class="container">
            <div class="row">
              <div class="container container-xxl container-xl  container-lg col-lg-3  container-md container-sm col-md-4 col-sm-5 col-7 col-3 mt-5">

                <h1>Sign Up</h1>

                <form id="addUserForm" onSubmit={handleSubmitForSignUp}>
                  <div class="form-group">
                    <label for="email">Email address</label>
                    <input type="email" class="form-control" name="email" id="exampleInputEmail1"
                      aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone
                      else.</small>
                  </div>
                  <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input type="text" name="firstName" class="form-control" id="firstName" aria-describedby="ttt" placeholder="Enter First Name" />
                    <small id="emailHelp" class="form-text text-muted"></small>
                  </div>
                  <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <input type="text" name="lastName" class="form-control" id="lastName"
                      aria-describedby="emailHelp" placeholder="Enter Last Name" />
                    <small id="emailHelp" class="form-text text-muted"></small>
                  </div>
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" class="form-control" id="exampleInputPassword1"
                      placeholder="Password" />
                  </div>
                  <div>
                    <button style={{ marginTop: '10px' }} type=" submit" class="btn btn-primary" onclick="">Sing Up</button>
                  </div>

                </form>
            </div>
          </div>
        </div>)
      }
    </>
  );
}

export default LoginPage;
