import {useSearchParams} from "react-router-dom";

import {useFetch} from "../../hooks/useFetch";
import RecipeList from "../../components/RecipeList";

import "./Search.css"


export default function Search() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q')
    const {data, isPending, error} = useFetch(`http://localhost:3000/recipes?q=${query}`)
    return (
        <div>
            <h2 className="page-title">Recipes including "{query}"</h2>
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Loading...</p>}
            {data && <RecipeList recipes={data}/>}
        </div>
    )
}