import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { collections, blogpost_entry } from './components/strapi_interface';
import { navbar } from './components/navbar';
import { MapComponent } from './components/map/map_renderer';

function App() {
  const [get_blogpost_text, set_blogpost_text] = useState([]);

  useEffect(() => {
    fetch(collections.blogposts)
      .then(x => x.json())
      .then(x => set_blogpost_text(x.data.map((x: blogpost_entry) => x.attributes.Title)));
  }, []);

  return (
    <div>
      {navbar()}
      <div className="text-xl font-medium text-black">
        <header className="App-header">
          <p>
            hello {get_blogpost_text}
          </p>
        </header>
      </div>
      {MapComponent()}
    </div>

  );
}

export default App;
