import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { collections } from './components/strapi/strapi_interface';
import { parseRichText } from './components/strapi/strapi_rich_text';
import { navbar } from './components/navbar';
import { MapComponent } from './components/map/map_renderer';
import { AnyType } from 'ol/expr/expression';
import { assert } from 'console';
import { blogpost_entry, test_entry } from './components/strapi/strapi_entries';

function App() {
  const [get_blogpost_text, set_blogpost_text] = useState([]);
  const [get_test_richtext, set_test_richtext] = useState([]);


  useEffect(() => {
    fetch(collections.blogposts)
      .then(x => x.json())
      .then(x => set_blogpost_text(x.data.map((x: blogpost_entry) => x.attributes.Title)));
    fetch(collections.tests)
      .then(x => x.json())
      .then(x => set_test_richtext(x.data.map((x: test_entry) => x.attributes.richtext.map(x => parseRichText(x)))));
  }, []);

  return (
    <div>

      {navbar()}
      <div className="text-xl font-medium text-black">
        <header className="App-header">
          <p>
            hello {get_blogpost_text} {"hello fart!"}
          </p>
        </header>
      </div>
      {MapComponent()}
      <div className='container mx-auto max-w-xl'>{get_test_richtext}</div>
    </div>

  );
}

export default App;
