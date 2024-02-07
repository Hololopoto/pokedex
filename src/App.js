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
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
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
    <div className="mb-20 px-40 max-[768px]:px-10">
      <div className="search my-11 flex flex-col items-center gap-6 w-full justify-center">
        <h1 className="text-3xl text-bold"> Alper </h1>
        <h1 className="text-3xl text-bold"> || POKEDEX || </h1>
        <input
          className="border-black w-1/2 border-4 rounded-md max-[768px]:w-[100%]"
          type="search"
          name="PokeSearch"
          id=""
        />
      </div>
      <div className="flex gap-11 mx-1 flex-wrap flex-row">
        {poke.map((x, index) => {
          return (
            <div
              key={index}
              className="pokes flex-row items-center justify-center border-black border-4 xl:w-[20%] lg:w-[26%] max-[768px]:w-[100%] rounded-lg  flex">
              <div className="flex-col my-6">
                <img
                  className="w-[200px] hover:scale-125 transition h-auto"
                  src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${x.id
                    .toString()
                    .padStart(3, "0")}.png`}
                  alt="PokemonPhoto"
                />
                <div className="poke-infos text-lg text-center py-3 gap-1 grid">
                  <div className=" ">
                    {x.name[0].toUpperCase() + x.name.slice(1)}
                  </div>
                  <div className="poke-id">
                    {"#" + x.id.toString().padStart(3, "0")}
                  </div>
                  <div className="poke-type">
                    {"Type: " +
                      x.types[0].type.name[0].toUpperCase() +
                      x.types[0].type.name.slice(1)}
                  </div>
                  <div className="poke-weight">{x.weight + " Kg"}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
