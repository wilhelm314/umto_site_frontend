import './App.css';
import { MapRowComponent } from './components/map/map_component';
import { Navbar } from './components/navbar';
import { AboutPage } from './pages/aboutpage';
import { Routes, Route } from 'react-router-dom';
import { BackstageHeader } from './components/backstage/backstageHeader';
import SignIn, { GoogleAuthCallback } from './components/auth/signin';
import { useAuthContext } from './context/authContext';
import { Profile } from './pages/profilepage';
import { UpcomingProjectsFrontpage, Project, UpcomingProjectsProjectspage } from './components/projects';
import { RenderTrophy, Trophies } from './components/trophies';
import { Frontpage } from './pages/frontpage';
import { Navpage } from './pages/mobilenavpage';
import { Footer } from './components/footer';
import { SmukBusMap } from './components/map/smuk_bus_map';




function App() {

  const { user } = useAuthContext();

  return (
    <div>
      <div className='z-50 relative'>{Navbar()}</div>


      <div className={'mt-28  bg-white ' + `${window.screen.width / window.screen.height < 2 / 3 ? '' : 'px-28'}`}>
        <Routes>
          <Route path='/nav' element={<Navpage />}></Route>
          <Route path='/api/auth/google/callback' element={<GoogleAuthCallback />}></Route>
          <Route path='/' element={<Frontpage />}></Route>
          <Route path='/community' >
            <Route index ></Route>
            <Route path='cc'>
              <Route path=':id'></Route>
            </Route>

          </Route>
          <Route path='/organisation' element={<AboutPage />}></Route>
          <Route path='/trophies'>
            <Route index element={<Trophies />}></Route>
            <Route path=':id' element={<RenderTrophy />}></Route>
          </Route>
          <Route path='/projects' >
            <Route index element={<UpcomingProjectsProjectspage />}></Route>
            <Route path=':id' element={<Project />}></Route>
          </Route>
          <Route path='/backstage'>
            <Route index element={<BackstageHeader />}></Route>
            <Route path='signin' element={<SignIn />}></Route>
            <Route path='profile' element={<Profile />}></Route>

          </Route>
        </Routes >
      </div>


      {Footer()}

    </div>

  );
}

export default App;
