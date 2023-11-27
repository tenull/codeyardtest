import Login from '../src/components/Login.jsx'
import Register from '../src/components/Register.jsx'


function App() {
  return (
    <div className="App">
      <div className='container register d-flex flex-wrap'>
        <div className='col-lg-6 register'><Register /></div>
        <div className='col-lg-6 login '>
          <div className='col-lg-12 blurry-background'>
          <Login />
        </div>
          </div>
        
      </div>
    </div>
  );
}

export default App;
