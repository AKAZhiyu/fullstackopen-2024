import { useState, useEffect } from 'react'
import Display from './components/Display'
import axios from '../node_modules/axios'

function App() {
  // const [count, setCount] = useState(0)

  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])


  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setAllCountries(response.data)
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }, []);


  const handleValueChange = (event) => {
    const searchValue = event.target.value
    setValue(searchValue)

    const filteredCountries = allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(searchValue.toLowerCase())
    );
    setCountries(filteredCountries); 
  }

  return (
    <div>
      <div>find countries<input value={value} onChange={handleValueChange} /></div>
      <Display countries={countries} setCountries={setCountries} />
    </div>
  )
}

export default App
