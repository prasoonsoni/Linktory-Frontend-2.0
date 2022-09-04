import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/:username" element={<UserProfile/>}></Route>
        </Routes>
      </Router>
  );
}

export default App;
