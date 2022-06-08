import { useState, useCallback, useEffect } from 'react';

const useFormField = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback(e => setValue(e.target.value), []);
  return { value, onChange };
};

function App() {
  const [country, setCountry] = useState('');
  const firstName = useFormField();
  const secondName = useFormField();
  const email = useFormField();
  // const phoneNum = useFormField();
  const [phone, setPhone] = useState('');

  const handleChangePhone = event => {
    setPhone(event.target.value);
  };

  const validate = () => {
    if (firstName.value.length < 5) {
      document.querySelector('#firstName').classList.add('invalid');
      return alert(`FirstName is too short`);
    } else {
      document.querySelector('#firstName').classList.remove('invalid');
    }
    if (secondName.value.length < 5) {
      document.querySelector('#secondName').classList.add('invalid');
      return alert(`SecondName is too short`);
    } else {
      document.querySelector('#secondName').classList.remove('invalid');
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
      document.querySelector('#email').classList.add('invalid');
      return alert('email is not valid');
    } else {
      document.querySelector('#email').classList.remove('invalid');
    }
    if (phone.length < 9) {
      document.querySelector('#phone').classList.add('invalid');
      return alert('Phone is incorrect');
    } else {
      document.querySelector('#phone').classList.remove('invalid');
    }
    return console.log('success');
  };

  const countryCode = country => {
    switch (country) {
      case 'UA':
        setPhone('+380');
        break;
      //mojno es4o)
      default:
        setPhone('');
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://ipinfo.io?token=af20c3f919d279');
      return await response
        .json()
        .then(response => setCountry(response.country));
    }
    countryCode(country);

    return fetchData;
  }, [country]);

  return (
    <div className="container ">
      <div className=" row align-items-end">
        <div className="col">
          <img
            src="https://timeweb.com/media/default/0001/03/3e7af564fca735a8f609f29e64feafefd70b4d69.png"
            className="img-fluid"
            alt="Riba"
          ></img>
        </div>
        <div className="col">
          <div className=" mb-3 ">
            <label htmlFor="firstName" className="form-label ">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              required
              {...firstName}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="secondName" className="form-label">
              Second Name
            </label>
            <input
              type="text"
              className="form-control"
              id="secondName"
              name="secondName"
              placeholder="Second Name"
              required
              // onBlur={validateName}
              {...secondName}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="email@example.com"
              required
              {...email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              placeholder="+9 (999) 999-9999"
              required
              onChange={handleChangePhone}
              value={phone}
              // {...phoneNum}
            />
          </div>
          <div className="col-auto">
            <button
              type="submit"
              className="btn btn-primary mb-3"
              onClick={validate}
            >
              Confirm identity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
