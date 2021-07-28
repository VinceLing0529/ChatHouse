import { Router } from '@reach/router';
import Main from './views/Main';
import Room from './views/Room';
import './App.css';
import Search from './views/Search';
function App() {
  return (
    <div className="App">
        <Router>
        <Main path="/"/>
        <Search path="search/:name"/>
        <Room path="room/:id" />
      </Router>
    </div>
  );
}

export default App;
