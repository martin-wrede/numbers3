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
    <br/><br/>
    <h3>Dear Sarah!</h3>
    <br/><br/>
    <div class="meindiv5">
      
    <audio controls class="audio">		 
				<source src="./src/audio/free-ambient-videos.mp3" type="audio/mpeg" /> 
		</audio>
    </div>
    </div>
    </div>
    <App />
    </>
  </React.StrictMode>
)
