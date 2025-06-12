import { useState } from 'react'
import './App.css'
import countriesController from './controller/countriesController'
import { useEffect } from 'react';
import { useRef } from 'react';
import CountryCard from './components/countryCard';

function App() {

  const [countriesFilter, setCountriesFilter] = useState(null);
  const countries = useRef(null)

  useEffect(() => {
    const handleFetchCountries = async () => {
      try {
        const response = await countriesController.getAll();
        console.log(response)
        countries.current = response;
        setCountriesFilter(response)
      } catch (err) {
        console.log(err);
      }
    }
    handleFetchCountries();
  }, [])

  const handleFilter = (filter) =>{
        const regExp = new RegExp(`${filter}`, "i");
    setCountriesFilter(countries.current.filter((e) => regExp.test(e.name.official)));
  }

  const onChange = (e) => {
    e.preventDefault();
    const filter = e.target.value;
    handleFilter(filter);
  }

  const onClickCountry = (e) =>{
      const dataName = e.target.dataset.name;
      handleFilter(dataName);
  }

  return (
    <>
      {!countriesFilter && <div>Cargando</div>}
      {countriesFilter &&
        <>
          <div>
            <label>Find Countries : </label>
            <input onChange={onChange} id='name' name='name' />
          </div>
          {countriesFilter.length > 10 ? <p>To many elements</p>
            : countriesFilter.length !== 1 ?
              <ol onClick={onClickCountry}>
                {countriesFilter.map((e, i) => (<ul key={i} data-name={e.name.official} style={{cursor:"pointer"}}>{e.name.official}</ul>))}
              </ol>
              :
              <CountryCard data={countriesFilter[0]}/>
          }
        </>}

    </>
  )
}

export default App
