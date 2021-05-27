import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import './App.css';

function App() {
  const APP_ID = process.env.REACT_APP_EDAMAM_API_ID;
  const APP_KEY = process.env.REACT_APP_EDAMAM_API_KEY;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [home, setHome] = useState(0);

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
    setHome(1);
  }


  const getIndex = e => {
    return e%3;
  };
  

  return (
    <div className="App">

      {home===0 && 
        <div className="Home">
          <h1>Recipe Finder</h1>
        </div>
      }


      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      

      
    
      <div className="header"><h1>{query}</h1></div>
      <div className="recipes">
        {recipes.slice(0,7).map((recipe,index) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            time={recipe.recipe.totalTime} 
            calories={Number((recipe.recipe.calories).toFixed(0))} 
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
            url = {recipe.recipe.url}
            cuisine = {recipe.recipe.cuisineType}
            serving = {recipe.recipe.yield}
            id = {getIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
