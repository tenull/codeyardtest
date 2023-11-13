import Login from '../src/components/Login.jsx'
import Register from '../src/components/Register.jsx'
function App() {
  return (
    <div className="App">
      <div className='container register d-flex flex-wrap'>
        <div className='col-lg-6 register'><Register /></div>
        <div className='col-lg-6 bg-success'><Login /></div>
        
      </div>
    </div>
  );
}

export default App;
