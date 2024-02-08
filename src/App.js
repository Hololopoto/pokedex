import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [pokes, setPokes] = useState([]);
  const [poke, setPoke] = useState([]);
  const pokeBg = {
    grass: "#8BD369",
    fire: "#FF603F",
    water: "#3399FF",
    bug: "#AABB22",
    normal: "#AAAA99",
    flying: "#9AA8FA",
    poison: "#B76EA4",
    electric: "#FFD34E",
    ground: "#E2C56A",
    fairy: "#F1A8EC",
    psychic: "#FF6EA4",
    fighting: "#C56E5C",
    rock: "#C5B679",
    dragon: "#7766EE",
    ice: "#66CCFF",
  };
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
    <div className="mb-20 mx-auto   px-40  max-[768px]:px-10 xl:px-30">
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
      <div className="flex mx-auto gap-9 flex-wrap  flex-row">
        {poke.map((x, index) => {
          return (
            <div
              key={index}
              style={{ backgroundColor: `${pokeBg[x.types[0].type.name]}` }}
              className={
                pokeBg &&
                `pokes flex-row cursor-pointer border-black hover:scale-105 transition items-center justify-center bg-${x.types[0].type.name} border-4 xl:w-[22%] lg:w-[46%] md:w-[46%] max-[768px]:w-[100%] rounded-lg flex`
              }>
              <div className="flex-col  hover:scale-110 transition my-6">
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
