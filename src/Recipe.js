import React from "react";

const getColor = e => {
    if (e.id === 0) {
        return '#99CED3'
    }
    else if (e.id === 1) {
        return '#edb5bf'
    } else {
        return '#86B3D1'
    }
}

const Recipe = ({title,time,calories,image,ingredients,url,cuisine,serving, id}) => {
    return (
        <a href={url} className="card">
            <div className="card-image">
                <img className="card-image"src={image} alt="" /> 
            </div>
            <div className="card-text">
                {time > 0 &&
                    <span className="date" style = {{color: getColor({id})}}>Prep Time: {time} minutes</span>
                }
                <h1>{title}</h1>
                <ul>
                    {ingredients.slice(0,5).map((ingredient, index) => (
                        <li key={index}>{ingredient.text}</li>
                    ))}
                </ul>
            </div>
            

            
            <div className={"card-stats"} style = {{background: getColor({id})}}>
                <div className ="stats">
                    <div className = "value">{calories}</div>
                    <div className = "type">calories</div>
                </div>
                <div className ="stats border">
                    <div className = "type">{cuisine}</div>
                </div>
                <div className ="stats">
                    <div className = "value">{serving}</div>
                    <div className = "type">servings</div>
                </div>
            </div> 
        </a>
    );
};

export default Recipe;