import axios from "axios";
import { useState, useEffect } from "react";

export default function Main() {
  const [article, setArticle] = useState([]);

  function fetchArticle() {
    axios
      .get("http://localhost:3000/bacheca")
      .then((res) => setArticle(res.data));
  }
  useEffect(fetchArticle, []);

  function deleteArticles() {
    setArticle([])
  }

  function addArticles() {
    fetchArticle()
  }

  return (
    <main>
      <div className="container">
        <h1>LISTA</h1>
        <div className="btn-container">
          <button onClick={deleteArticles} className="btn">DELETE</button>
          <button onClick={addArticles} className="btn">MOSTRA LA LISTA</button>
        </div>
        <div className="list">
          <ul>
            {article.map((item) => (
              <li key={item.title}>
                <p>
                  <strong>{item.title}</strong>
                </p>
                <p>{item.content}</p>
                <p>{item.image}</p>
                <p>{item.tags}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
