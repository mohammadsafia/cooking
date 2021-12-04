import "./Recipe.css"
import {useParams} from "react-router-dom";
import {useTheme} from "../../hooks/useTheme";
import {useEffect, useState} from "react";
import {projectFirestore} from "../../firebase/config";

export default function Recipe() {
    const {id} = useParams();
    const {mode} = useTheme();

    const [recipe, setRecipe] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsPending(true);

        const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot((doc) => {
            if (doc.exists) {
                setIsPending(false);
                setRecipe(doc.data());
            } else {
                setIsPending(false);
                setError('Could not find that recipe')
            }
        }, err => {
            setError(err.message);
            setIsPending(false)
        })

        return () => unsub();

    }, [id])

    const onUpdate = async () => {

        try {
            await projectFirestore.collection('recipes').doc(id).update({
                title: 'Something'
            })
        } catch (err) {
            console.error(err)
        }

    }
    return (
        <div className={`recipe ${mode}`}>
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Loading...</p>}
            {recipe && (
                <>
                    <h1 className="page-title">{recipe.title}</h1>
                    <p>Takes {recipe.cookingTime} to cook.</p>
                    <ul>
                        {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
                    </ul>
                    <p className="method">{recipe.method}</p>
                    <button onClick={onUpdate}>Update me</button>
                </>
            )}
        </div>
    )
}