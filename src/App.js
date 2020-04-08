import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api";

function App() {
  const [rep, setRep] = useState([]);

  useEffect(() => {
    getRepositories();
  }, []);

  async function getRepositories() {
    try {
      const res = await api.get("/repositories");
      setRep(res.data);
    } catch (error) {
      alert(error);
    }
  }

  async function handleAddRepository() {
    const data = {
      title: "Teste1",
      url: "teste.com",
      techs: ["teste", "teste2"],
    };

    try {
      const res = await api.post("/repositories", data);
      setRep([...res, res.data]);
    } catch (error) {
      alert(error);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);
      setRep(rep.filter((item) => item.id !== id));
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      {rep.map((item) => (
        <div key={item.id}>
          <ul data-testid="repository-list">
            <li>
              {item.title}
              <button onClick={() => handleRemoveRepository(item.id)}>
                Remover
              </button>
            </li>
          </ul>
          <button onClick={handleAddRepository}>Adicionar</button>
        </div>
      ))}
    </>
  );
}

export default App;
