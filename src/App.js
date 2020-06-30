import React, { useEffect, useState } from "react";

import "./styles.css";
import api from './services/api'

function App() {

  const [repositories, setRepositories] = useState([]);


  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const newRepository = {
      title: `Repositório ${Date.now()}`,
      url: 'github.com.br'
    }
    const response = (await api.post('repositories', newRepository)).data;
    setRepositories([...repositories, response]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`,);
    setRepositories(repositories.filter(repository => repository.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            <h3>
              {repository.title}
            </h3>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button></li>
        ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
