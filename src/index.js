import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Video from './components/pages/Video';
import PageNotFound from './components/pages/PageNotFound';
import Crop from './components/pages/Crop';
//import Modalone from './components/pages/Modalone';
import App from './App';
import './App.css';


const root = ReactDOM.createRoot(
    document.getElementById("root")
);
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/home" element={<App />}>
                <Route index path="/home" element={<Home />} />
                <Route index path="/home/:ids" element={<Video />} />
                <Route index path="/home/demo" element={<Crop />} />
                <Route path='*' element={<PageNotFound />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

