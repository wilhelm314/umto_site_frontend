import { useEffect, useState } from 'react';
import './App.css';
import { MapRowComponent } from './components/map/map_component';
import { navbar } from './components/navbar';
import { blogpost_entry, test_entry } from './components/strapi/strapi_entries';
import { collections } from './components/strapi/strapi_interface';
import { parseRichText } from './components/strapi/strapi_rich_text';


function App() {
  const [get_blogpost_text, set_blogpost_text] = useState([]);
  const [get_test_richtext, set_test_richtext] = useState([]);


  useEffect(() => {
    //blogpost type test
    fetch(collections.blogposts)
      .then(x => x.json())
      .then(x => set_blogpost_text(x.data.map((x: blogpost_entry) => x.attributes.Title)));

    // test toye test (sorry)
    fetch(collections.tests)
      .then(x => x.json())
      .then(x => set_test_richtext(x.data.map((x: test_entry) => x.attributes.richtext.map(x => parseRichText(x)))));
  }, []);




  return (
    <div key="a1">

      {navbar()}
      <div key="a2" className="text-xl font-medium text-black">
      </div>
      <MapRowComponent />
    </div>

  );
}

export default App;
