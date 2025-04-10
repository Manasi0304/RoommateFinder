import { Routes, Route } from "react-router-dom";
import Home from "./assets/Pages/Home";
import FindRoommates from "./assets/Pages/FindRoommates";
import RoommateProfile from "./assets/Pages/RoommateProfile";
import RegisterRoommate from "./assets/Pages/RegisterRoommate";
import MatchedRoommates from "./assets/Pages/MatchedRoommates";


function App() {

  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find-roommate" element={<FindRoommates />} />
        <Route path="/roommate/:id" element={<RoommateProfile />} />
        <Route path="/register-roommate" element={<RegisterRoommate />} />
        <Route path="/matched-roommates/:userId" element={<MatchedRoommates />} />
    </Routes>
  )
}

export default App;
