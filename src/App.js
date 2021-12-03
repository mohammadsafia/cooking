import {BrowserRouter, Route, Routes} from "react-router-dom";

// page components
import Home from "./pages/home/Home";
import Create from "./pages/create/Create";
import Search from "./pages/search/Search";
import Recipe from "./pages/recipe/Recipe";
import Navbar from "./components/Navbar";
// styles
import "./App.css";
import ThemeSelector from "./components/ThemeSelector";
import {useTheme} from "./hooks/useTheme";


function App() {
  const {mode} = useTheme();
  
  return (
      <div className={`App ${mode}`}>
        <BrowserRouter>
          <Navbar/>
          <ThemeSelector/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/create" element={<Create/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/recipes/:id" element={<Recipe/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
