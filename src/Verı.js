import { Axios } from "axios";
import React, { useEffect, useState } from "react";

function Verı() {
  const [users, setUsers] = useState(false);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((result) => {
        if (result.ok && result.status === 200) {
          return result.json();
        }
      })

      .then((e) => setUsers(e))

      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {users &&
        users.map((user, index) => {
          <div key={user.id}>
            <div>${index}</div>
          </div>;
        })}
    </div>
  );
}

export default Verı;
