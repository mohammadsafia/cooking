import "./Create.css"
import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {projectFirestore} from "../../firebase/config";

export default function Create() {
    const [title, setTitle] = useState('');
    const [method, setMethod] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [newIngredient, setNewIngredient] = useState('');
    const [ingredients, setIngredients] = useState([]);

    const ingredientInput = useRef(null);
    
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        const doc = {
            title, ingredients, method, cookingTime: `${cookingTime} minutes`
        };
        try {
            await projectFirestore.collection('recipes').add(doc);
            navigate('/')
        } catch (err) {
            console.error(err);
        }
    }

    const handleAdd = (event) => {
        event.preventDefault();
        
        const ing = newIngredient.trim();

        if (ing && !ingredients.includes(ing)) setIngredients(prevState => [...prevState, ing]);

       
        setNewIngredient('');
        ingredientInput.current.focus();
    }
    return (
        <div className="create">
            <h2 className="page-title">Add a New Recipe</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Recipe title:</span>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        required
                    />
                </label>

                <label>
                    <span>Recipe ingredients:</span>
                    <div className="ingredients">
                        <input ref={ingredientInput} value={newIngredient}
                               onChange={(e) => setNewIngredient(e.target.value)} type="text"/>
                        <button onClick={handleAdd} className="btn">add</button>
                    </div>
                </label>
                <p>Current ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)}</p>
                <label>
                    <span>Recipe method:</span>
                    <textarea
                        onChange={(e) => setMethod(e.target.value)}
                        value={method}
                        required
                    />
                </label>
                <label>
                    <span>Cooking time (minutes):</span>
                    <input
                        value={cookingTime}
                        onChange={(e) => setCookingTime(e.target.value)}
                        type="number"
                        required
                    />
                </label>
                <button className="btn">Submit</button>
            </form>
        </div>
    )
}