import './App.css';
import GenerateForm from './components/GenerateForm';
import {Routes, Route} from 'react-router-dom'
import ScanQRCode from './components/Scan'

function App() {
  return (
    <div className="App">
      
      <Routes>
          <Route path="/" element={<GenerateForm/>}/>
          <Route path="/:urlName" element={<ScanQRCode/>}/>
          <Route path="/generate" element={<GenerateForm/>}/>
      </Routes>
    </div>
  );
}

export default App;
