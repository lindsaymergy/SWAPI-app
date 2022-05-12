import './App.css';
import { useEffect, useState, useMemo } from 'react';

function App() {
  const [loading, setLoading] = useState(true)
  const [starships, setStarships] = useState([])

  async function getStarships() {
    let results = [];
    
    let url = 'https://swapi.dev/api/starships/';
    
    do {
      const res = await fetch(url);
      const data = await res.json();
      url = data.next;
      //results.push(...data.results);
      results = [...results, ...data.results]
      // take our previous array, add everything in results to it (lines 17 and 18 are the same)
    } while(url)

    setStarships(results);
  }

  const manufacturers = useMemo(() => {
    const result = starships.reduce((previous, starship) => {
      return [...previous, ...starship.manufacturer.split(',')];
      //then map the split to apply the trim to each item
    }, [])

    return [...new Set(result)].sort();

    // previous wll initially be set to whatever initialiaze is. THEN create a new array, put all old things

    // reduce will iterate through array, run function, and then build result
    //useMemo returns result of whatever function its passed
    //react will recalculate manufacturers based on when starship changes in dependency array
    // using reduce bc we need to watch starship - otherwise it would recalculate on every page load = performance issues


  }, [starships])

useEffect(() => {
  // useeffect needs to have a function returned, cant handle promise from async
  async function init() {
    await getStarships()
  }

  init()
  }, []
);

console.log(manufacturers)

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