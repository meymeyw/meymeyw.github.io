// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { BrowserRouter as Switch, Route, Routes} from "react-router-dom";
import 'primereact/resources/themes/lara-dark-teal/theme.css';

// import './App.css'
import Home from './views/Home';
import Profile from './views/Profile';
import Navbar from './components/Navbar';

export default function App() {
  return (
      <div>
        <Navbar/>
        <Switch>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
            {/* <Route path="/comparison" element={<Comparison/>}></Route> */}
            {/* <Route path="/network" element={<Network/>}></Route> */}
            {/* <Route path="/mapview" element={<MapView/>}></Route> */}
          </Routes>
        </Switch>
      </div>
    );
}

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

