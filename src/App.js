import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [pokes, setPokes] = useState([]);
  const [poke, setPoke] = useState([]);
  // const Count = 5;

  // useEffect(() => {
  //   const initPokemon = async () => {
  //     for (let i = 2; i <= Count; i++) {
  //       await getPokes(i);
  //     }
  //   };

  //   const getPokes = async (id) => {
  //     const request = await axios(
  //       `https://pokeapi.co/api/v2/pokemon/${id || 1}`
  //     );
  //     setPokes(request.data);
  //     console.log(request);
  //   };

  //   getPokes();
  //   initPokemon();
  // }, []);
  useEffect(() => {
    const getPokes = async () => {
      const request = await axios(
        "https://pokeapi.co/api/v2/pokemon?limit=5&offset=0"
      );

      setPokes(request?.data?.results);
      // console.log(request?.data?.results);
    };
    getPokes();
  }, []);
  // console.log("pokes", pokes);
  useEffect(() => {
    pokes.map(async () => {
      const response = await axios.all(
        pokes.map((poke, index) => axios(poke.url))
      );
      const pokeData = response.map((res) => res.data);
      setPoke(pokeData);
    });
  }, [pokes]);

  console.log("POKEDATA", poke);
  return (
    <div>
      <div className="flex justify-center flex-col">
        <h2 className="text-2xl font-bold mx-auto ">POKEDEX</h2>
        <input
          type="search"
          name="Search Pokemon"
          id=""
          className="border-black w-1/2 mx-auto border-4 rounded-md"
        />
      </div>
      {poke.map((x, index) => {
        return (
          <div className="flex flex-row" key={index}>
            <div className="flex flex-row">
              <div className="flex flex-col">
                <img
                  className="w-[200px] h-auto"
                  src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${x.id
                    .toString()
                    .padStart(3, "0")}.png`}
                  alt="PokemonPhoto"
                />
                <div className="poke-infos items-center flex-col flex">
                  <div className=" ">
                    {x.name[0].toUpperCase() + x.name.slice(1)}
                  </div>
                  <div className="poke-id">
                    {"#" + x.id.toString().padStart(3, "0")}
                  </div>
                  <div className="poke-type">
                    {x.types[0].type.name[0].toUpperCase() +
                      x.types[0].type.name.slice(1)}
                  </div>
                  <div className="poke-weight">{x.weight + "Kg"}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
