import './App.css';
import { MapRowComponent } from './components/map/map_component';
import { Navbar } from './components/navbar';
import { AboutPage } from './pages/aboutpage';
import { Routes, Route } from 'react-router-dom';
import { BackstageHeader } from './components/backstage/backstageHeader';
import SignIn, { GoogleAuthCallback } from './components/auth/signin';
import { useAuthContext } from './context/authContext';
import { Profile } from './pages/profilepage';
import { Projects, RenderProject } from './components/projects';
import { RenderTrophy, Trophies } from './components/trophies';
import { Frontpage } from './pages/frontpage';




function App() {

  const { user } = useAuthContext();

  return (
    <div>
      {Navbar()}


      <div className='mt-28'>
        <Routes>
          <Route path='/api/auth/google/callback' element={<GoogleAuthCallback />}></Route>
          <Route path='/' element={<Frontpage />}></Route>
          <Route path='/map' element={<MapRowComponent />}></Route>
          <Route path='/about' element={<AboutPage />}></Route>
          <Route path='/trophies'>
            <Route index element={<Trophies />}></Route>
            <Route path=':id' element={<RenderTrophy />}></Route>
          </Route>
          <Route path='/projects' >
            <Route index element={<Projects />}></Route>
            <Route path=':id' element={<RenderProject />}></Route>
          </Route>
          <Route path='/backstage'>
            <Route index element={<BackstageHeader />}></Route>
            <Route path='signin' element={<SignIn />}></Route>
            <Route path='profile' element={<Profile />}></Route>

          </Route>
        </Routes >
      </div>




    </div>

  );
}

export default App;
