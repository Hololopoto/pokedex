import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [pokes, setPokes] = useState([]);
  const [poke, setPoke] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [nextPoke, setNextPoke] = useState();
  const [PrevPoke, setPrevPoke] = useState();
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
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
  // Apiden idleri sıralayarak veri çekme yöntemi.
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
      const request = await axios(url);

      setPokes(request?.data?.results);
      setNextPoke(request?.data?.next);
      setPrevPoke(request?.data?.previous);
      console.log(request?.data?.results);
    };

    getPokes();
  }, [url]);
  // Datayı Toplayıp Tek Bir Arrayde yazdırmanın 2. yöntemi(ÇOK YAVAŞ)
  // useEffect(() => {
  //   pokes.map(async () => {
  //     const response = await axios.all(
  //       pokes.map((poke, index) => axios(poke.url))
  //     );
  //     const pokeData = response.map((res) => res.data);
  //     setPoke(pokeData);
  //   });
  // }, [pokes]);
  // console.log("pokes", pokes);
  useEffect(() => {
    pokes.map(async (poke, index) => {
      const response = await axios(poke.url);
      // console.log(response.data);
      setPoke((state) => {
        state = [...state, response.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  }, [pokes]);
  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
    const filteredPokes = poke.filter((p) =>
      p.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log();
    setFiltered(filteredPokes);
  };
  console.log("POKEDATA", poke);
  return (
    <div className="mb-20 mx-auto   px-40  max-[768px]:px-10 xl:px-30">
      <div className="search my-11 flex flex-col items-center gap-6 w-full justify-center">
        <h1 className="text-3xl text-bold"> Alper </h1>
        <h1 className="text-3xl text-bold"> || POKEDEX || </h1>
        <input
          className="border-black pl-1 w-1/2 border-4 rounded-md max-[768px]:w-[100%]"
          type="search"
          name="PokeSearch"
          value={search}
          onChange={handleSearch}
          placeholder="Place Name A Pokemon"
          id=""
        />
      </div>
      {/* <div> {search} </div> */}
      <div className="flex mx-auto gap-9 flex-wrap  flex-row">
        {poke.map((x, index) => {
          return (
            <div
              key={index}
              style={{ backgroundColor: `${pokeBg[x.types[0].type.name]}` }}
              className={
                pokeBg &&
                `pokes flex-row cursor-pointer border-black hover:scale-110 transition items-center justify-center border-4 xl:w-[18%] lg:w-[46%] md:w-[46%] max-[768px]:w-[100%] rounded-lg flex`
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
      <div className="flex justify-between mt-10 ">
        <button
          onClick={() => {
            setPoke([]);
            setUrl(PrevPoke);
          }}
          className=" w-52 h-14 max-[768px]:w-24 max-[768px]:h-10 rounded-md bg-amber-500">
          Prev
        </button>
        <button
          onClick={() => {
            setPoke([]);
            setUrl(nextPoke);
          }}
          className="w-52 h-14 max-[768px]:w-24 max-[768px]:h-10 rounded-md bg-amber-500">
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
