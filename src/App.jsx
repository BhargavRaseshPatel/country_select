import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [selectedCity, setSelectedCity] = useState("")

  useEffect(() => {
    const country = async () => {
      const data = await (await fetch('https://crio-location-selector.onrender.com/countries')).json();
      setCountries(data)
    }
    country()
  }, [])

  const handlingCountry = (country) => {
    fetch(`https://crio-location-selector.onrender.com/country=${country}/states`).then(data => data.json()).then(data => setStates(data))
    setSelectedCountry(country)
    setSelectedCity("")
    setSelectedState("")
  }

  const changingState = (event) => {
    fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${event.target.value}/cities`).then(data => data.json()).then(data => setCities(data))
    setSelectedState(event.target.value)
    setSelectedCity("")
  }

  return (
    <div>
      <h2>Select Location</h2>

      <select id="country" defaultValue={'Select Country'} onChange={(e) => handlingCountry(e.target.value)}>
        <option >Select Country</option>
        {countries.map((data) => (
          <option value={data} key={data}>{data}</option>
        ))}
      </select>

      <select id="state"  onChange={changingState} disabled={!selectedCountry}>
        <option >Select State</option>
        {states.map(data => (
          <option key={data} value={data}>{data}</option>
        ))}
      </select>

      <select id="city" value={selectedCity} disabled={!selectedState} onChange={(e) => setSelectedCity(e.target.value)}>
        <option >Select City</option>
        {cities.map(data => (
          <option key={data} value={data}>{data}</option>
        ))}
      </select>

      {selectedCity && <p>You selected {selectedCity}, {selectedState}, {selectedCountry}</p>}
    </div>
  )
}

export default App
