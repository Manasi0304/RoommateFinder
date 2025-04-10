import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
    return (
        <div className="home-container">
            <h1>Roommate Finder</h1>
            <div className="home-buttons">
                <Link to="/register-roommate" className="btn">➕ Register You as Roommate</Link>
                <Link to="/find-roommate" className="btn">Find Roommate</Link>
            </div>
        </div>
    );
}

export default Home;