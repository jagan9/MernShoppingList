import './App.css';
import NavBar from './Components/NavBar';
import Items from './Components/Items';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Items />
        </div>
      </BrowserRouter >
    </Provider>
  );
}

export default App;
