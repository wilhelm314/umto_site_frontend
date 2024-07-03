import { useEffect, useState } from 'react';
import './App.css';
import { MapRowComponent } from './components/map/map_component';
import { navbar } from './components/navbar';
import { blogpost_entry, page_entry, test_entry } from './components/strapi/strapi_entries';
import { collections, getAboutPageURL, getImageURL } from './components/strapi/strapi_interface';
import { parseRichText } from './components/strapi/strapi_rich_text';
import { AboutPage } from './pages/about';
import * as ReactDOM from "react-dom/client";
import { Routes, Route } from 'react-router-dom';
import { BackstageHeader } from './components/backstage/backstageHeader';
import SignUp from './components/auth/signup';
import SignIn from './components/auth/signin';


function App() {


  return (
    <>
      {navbar()}
      <Routes>
        <Route path='/' element={<>front</>}></Route>
        <Route path='/map' element={<MapRowComponent />}></Route>
        <Route path='/about' element={<AboutPage />}></Route>
        <Route path='/projects' element={<>projects</>}></Route>
        <Route path='/backstage'>
          <Route index element={<BackstageHeader />}></Route>
          <Route path='signup' element={<SignUp />}></Route>
          <Route path='signin' element={<SignIn />}></Route>
          <Route path='profile' element={<>hello</>}></Route>

        </Route>
      </Routes>
    </>

  );
}

export default App;
