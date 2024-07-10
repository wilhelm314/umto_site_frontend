import { useEffect, useState } from 'react';
import './App.css';
import { MapRowComponent } from './components/map/map_component';
import { navbar } from './components/navbar';
import { AboutPage } from './pages/about';
import * as ReactDOM from "react-dom/client";
import { Routes, Route } from 'react-router-dom';
import { BackstageHeader } from './components/backstage/backstageHeader';
import SignIn, { GoogleAuthCallback } from './components/auth/signin';
import { AuthContext, useAuthContext } from './context/authContext';
import { Button } from 'antd';
import { Profile } from './pages/profile';
import { Projects, RenderProject } from './pages/projects';




function App() {

  const { user } = useAuthContext();

  return (
    <>
      {navbar()}
      <Routes>
        <Route path='/api/auth/google/callback' element={<GoogleAuthCallback />}></Route>
        <Route path='/' element={<>{user?.id}</>}></Route>
        <Route path='/map' element={<MapRowComponent />}></Route>
        <Route path='/about' element={<AboutPage />}></Route>
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
    </>

  );
}

export default App;
