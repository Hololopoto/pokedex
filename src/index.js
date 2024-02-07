import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <>
    <App />
  </>
  /* </React.StrictMode> */
);

// useEffect(() => {
//   pokes.map(async () => {
//     const response = await axios.all(
//       pokes.map((poke, index) => axios(poke.url))
//     );
//     const pokeData = response.map((res) => res.data);
//     setPoke(pokeData);
//     console.log(pokeData);
//   });
// }, [pokes]);
