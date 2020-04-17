import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response =>{
      setRepositories(response.data);
    });
  }, []);


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repositório ${Date.now()}`,
      url: "https://github.com/thedrops/desafios-bootcamp-rocketseat",
      techs: ['Javascript', 'React', 'React-Native']

    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    api.delete('repositories/'+id).then(response =>{
      api.get('repositories').then(response =>{
        setRepositories(response.data);
      });
    });
  }

 

 

  return (
    <div>
      <ul data-testid="repository-list">
        <li>
          {repositories.map(repository => 
            <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
        </li> )}
          
        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
