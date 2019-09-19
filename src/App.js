import React from 'react';
import ReactDOM from 'reac-dom';
import './App.css';
import Form from "./Components/Form";

function App() {
  return (
    <div className="App">
      <h1>Hello!</h1>
      <Form />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
export default App;
