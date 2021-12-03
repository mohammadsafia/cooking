import "./Searchbar.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


export default function Searchbar() {
    const [term, setTerm] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
            
        navigate(`search?q=${term}`);
        setTerm('')
    }
    return (
        <div className="searchbar">
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">Search:</label>
                <input
                    type="text"
                    id="search"
                    onChange={(e) => setTerm(e.target.value)}
                    required
                    value={term}
                />
            </form>
        </div>
    )
}