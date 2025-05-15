import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [texte, setTexte] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/todos')
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  const ajouterTodo = (e) => {
    e.preventDefault();
    if (!texte.trim()) return;
    fetch('http://localhost:3001/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texte, done: false })
    })
      .then(res => res.json())
      .then(newTodo => {
        setTodos([...todos, newTodo]);
        setTexte('');
      });
  };

  const supprimerTodo = (id) => {
    fetch(`http://localhost:3001/api/todos/${id}`, { method: 'DELETE' })
      .then(() => setTodos(todos.filter(t => t.id !== id)));
  };

  const toggleDone = (todo) => {
    fetch(`http://localhost:3001/api/todos/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !todo.done })
    })
      .then(res => res.json())
      .then(updated => {
        setTodos(todos.map(t => (t.id === updated.id ? updated : t)));
      });
  };

  return (
    <div className="container">
      <h1>🔥 ToDo avec Firebase</h1>
      <form onSubmit={ajouterTodo}>
        <input
          type="text"
          value={texte}
          onChange={e => setTexte(e.target.value)}
          placeholder="Nouvelle tâche..."
        />
        <button type="submit">➕</button>
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo.id} className={todo.done ? 'done' : ''}>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleDone(todo)}
              />
              {todo.texte}
            </label>
            <button onClick={() => supprimerTodo(todo.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;