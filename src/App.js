import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';

function App() {
  return (
    <Router>
      <Menu />
      <main>
      </main>
    </Router>
  );
}

export default App;
