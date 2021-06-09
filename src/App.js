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


  const slideImages = [
    'food12.jpg',
    'lilybanse.jpg',
    'brooke.jpg',
    'melissa.jpg'
  ];
  const delay = 2500;
  const [index, setIndex] = useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === slideImages.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );
    return () => {
      resetTimeout();
    };
  }, [index]);

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
          <div className="navbar">
            <img src="icon.svg" className="logo"/>
          </div>
          <h1>Recipe Finder</h1>
        </div>
      }


      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>

      {home===0 &&
        <div className="slideshow">
          <div 
            className="slideshowSlider"
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
          >
            {slideImages.map((backgroundImage, index) => (
                <img className="slide" key={index} src={backgroundImage} alt="image" />
            ))}
          </div>
          
          <div className="slideshowDots">
              {slideImages.map((_,idx) => (
                <div 
                  key={idx} 
                  className={`slideshowDot${index === idx ? " active" : ""}`}
                  onClick={() => {
                    setIndex(idx);
                  }}
                ></div>
              ))}
          </div>
        </div>
      }

    
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
