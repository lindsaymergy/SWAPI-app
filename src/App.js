import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [starships, setStarships] = useState([])
  const  [manufacturers, setManufacturers] = useState([])

  const results = [];
  async function getStarships() {
    
    let url = 'https://swapi.dev/api/starships/';
    
    do {
      const res = await fetch(url);
      const data = await res.json();
      url = data.next;
      results.push(...data.results);
    } while(url)

    const manufacturers = [];
    results.map((item) => (
      manufacturers.push(item.manufacturer)
    ))

    setManufacturers(manufacturers);
    console.log('look here:' + manufacturers)
    
      // display manufacturers in dropdown element
      // splice array by commas
      // remove spaces from items
      // remove duplicate items
      // when dropdown option is clicked, 
      // set state to only display items that relate

    setStarships(results);  
  }



useEffect(() => {
  getStarships()
  }, []
);

  return (
    <div className="App">
      <h1>Starships!</h1>
      <select>
        <option value="one"></option>
      </select>
      <table>
      {starships.map((ship) => (
        <tr>
          <td style={{backgroundColor:"hotpink"}}>
            {ship.name}
          </td>
          <td style={{backgroundColor:"aqua"}}>
            {ship.manufacturer}
          </td>
        </tr>
        )
        )}
      </table>
    </div>
  );
}

export default App;