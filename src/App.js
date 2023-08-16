import './App.css';
import MovieList from './components/MovieList';
import UpdateMovie from './components/UpdateMovie';
import MovieForm from './components/MovieForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import { IonPage, setupIonicReact } from '@ionic/react';

setupIonicReact();
function App() {
  return (
      <Router>
        <IonPage>
        <Navbar />
            <Routes>
              <Route path="/" element={<MovieList />} />
              
              <Route path="/update/:id" element={<UpdateMovie />} />
              
              <Route path="/add" element={<MovieForm />} />
            </Routes>
        <Footer />
        </IonPage>
      </Router>
  );
}


export default App;
