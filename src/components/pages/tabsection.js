import React, { useState } from 'react';

const Home = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form data as needed (e.g., send it to the server)
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='container '>
      <div className='row'>
        <div className='col-md-12'>
          <h1 className='text-center'>hello form</h1>
          <div>
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              )}
              {step === 2 && (
                <div>
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              )}
              {step === 3 && (
                <div>
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              )}
              <button
                onClick={() => setStep(step - 1)}
                disabled={step === 1}
              >
                Previous
              </button>
              <button
                onClick={() => setStep(step + 1)}
                disabled={step === 3}
              >
                Next
              </button>
              {step === 3 && (
                <button type="submit">Submit</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home