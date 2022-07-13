import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
    <div class="meindiv">
    <div class="meindiv2"><h1> - Happy -
     </h1></div>
    <div class="meindiv3"><h2>  Birthday</h2>  
    </div>
    <div class="meindiv4">
    
    <h3>Dear Sarah!</h3>
    <br/><br/>
    <div class="meindiv5">
       
   
    </div>
    </div>
    </div>
    <App scale="0.27" modelPath={"/gift5.glb"} /> />
    </>
  </React.StrictMode>
)
