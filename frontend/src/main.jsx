
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


import store from './Store/Store.jsx'; 
import { BrowserRouter, Router } from 'react-router-dom';
createRoot(document.getElementById('root')).render(
<BrowserRouter>
<Provider store={store}>
   
    <App />
   
        
     
    </Provider>
</BrowserRouter>
    
);
