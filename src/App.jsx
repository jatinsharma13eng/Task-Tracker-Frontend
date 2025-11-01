import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddTask from './pages/AddTask';
import CompletedTasks from './pages/CompletedTasks';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/completed-tasks" element={<CompletedTasks />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
