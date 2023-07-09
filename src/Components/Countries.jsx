import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import Article from "./Article";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");


  const regions = [
    {
      name: "Europe",
    },
    {
      name: "Asia",
    },
    {
      name: "Africa",
    },
    {
      name: "Oceania",
    },
    {
      name: "Americas",
    },
    {
      name: "Antarctic",
    },
  ];







  const getCountries = async () => {
    const { data } = await axios.get("https://restcountries.com/v3.1/all");
    setCountries(data);
  };

  useEffect(() => {
    getCountries();
  }, []);


  const filterByRegion = async (region) => {
    const { data } = await axios.get(`https://restcountries.com/v3.1/region/${region}`);
    setCountries(data);
  };

  const searchCountry = async () => {
    const { data } = await axios.get(`https://restcountries.com/v3.1/name/${searchText}`);
    setCountries(data);
  };






  function handleSearchCountry(e) {
    e.preventDefault();
    searchCountry();
  }



  function handleFilterByRegion(e) {
    e.preventDefault();
    filterByRegion();
  }








  return (
    <>
      {countries ? (
        <section className=" container mx-auto p-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">
            <form
             onSubmit={handleSearchCountry}
             className="max-w-4xl md:flex-1" 
            autoComplete="off">
              <input 
               type="text"
                name="search"
                id="search"
                placeholder="Search for a country by its name"
                required 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="py-3 px-4 text-gray-600 placeholder-gray-600 w-full shadow
                 rounded outline-none dark:text-gray-400 dark:placeholder-gray-400
                  dark:bg-gray-800 dark:focus:bg-gray-700 transition-all duration-200"
               />
            </form>

            <form onSubmit={handleFilterByRegion}>
              <select
              name="filter-by-region"
                id="filter-by-region"
               className="w-52 py-3 px-4 outline-none shadow rounded
                text-gray-600 dark:text-gray-400 dark:bg-gray-800 dark:focus:bg-gray-700"
                value={regions.name}
                onChange={(e) => filterByRegion(e.target.value)}
              >

                {regions.map((region, index) => (
                  <option key={index} value={region.name}>
                    {region.name}
                  </option>
                ))}


              </select>
            </form>
            
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {countries.map((country) => (
              <Article key={country.name.common} {...country} />
            ))}
          </div>
        </section>
      ) :
              <Loading/>
      }
    </>
  );
};

export default Countries;
