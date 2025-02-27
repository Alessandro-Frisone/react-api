import axios from "axios";
import { useState, useEffect } from "react";

const initialData = {
  name: "",
  content: "",
  image: "",
  tags: "",
};

export default function Main() {
  const [article, setArticle] = useState([]);
  const [user, setUser] = useState(initialData);

  // MOSTRA IL CONTENUTO SOLO UNA VOLTA AL CARICAMENTO DELLA PAGINA
  useEffect(fetchArticle, []);

  // MOSTRA IL CONTENUTO BACKEND
  function fetchArticle() {
    axios
      .get("http://localhost:3000/bacheca")
      .then((res) => setArticle(res.data));
  }

  // FUNZIONE CHE ELIMINA L'ELEMENTO SELEZIONATO
  function fetchDeleteArticle(id) {
    axios.delete(`http://localhost:3000/bacheca/${id}`).then(() => {
      setArticle((current) => current.filter((item) => item.id !== id));
    });
  }

  // FUNZIONE CHE CREA UN NUOVO ELEMENTO
  const handleSubmitForm = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3000/bacheca", user).then((response) => {
      setArticle((currentUsers) => [...currentUsers, response.data]);
      setUser(initialData);
    });
  };
  const handleFormArticle = (fieldName, value) => {
    setUser((currentFormData) => {
      return { ...currentFormData, [fieldName]: value };
    });
  };

  // FUNZIONE CHE SVUOTA L'ARRAY (UTILIZZATA SU UN BOTTONE)
  function deleteArticles() {
    setArticle([]);
  }

  // FUNZIONE CHE MOSTRA GLI ELEMENTI (UTILIZZATA SU UN BOTTONE)
  function addArticles() {
    fetchArticle();
  }

  return (
    <main>
      <div className="main-container">
        <div className="container">
          <h1>LISTA</h1>
          <div className="btn-container">
            <button onClick={deleteArticles} className="btn">
              DELETE
            </button>
            <button onClick={addArticles} className="btn">
              MOSTRA LA LISTA
            </button>
          </div>
          <div className="list">
            <ul>
              {article.map((item) => (
                <li key={item.title}>
                  <p>
                    <strong>{item.title}</strong>
                  </p>
                  <p>{item.content}</p>
                  <img src={item.image} alt={item.title} />
                  <p>
                    #
                    {Array.isArray(item.tags)
                      ? item.tags.join(" # ")
                      : item.tags}
                  </p>
                  <button
                    onClick={() => fetchDeleteArticle(item.id)}
                    className="btn btn-delete"
                  >
                    DELETE
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="form-container">
          <h1>
            <strong>INSERISCI I DATI RICHIESTI</strong>
          </h1>
          <form onSubmit={handleSubmitForm} className="form">
            <p>INSERISCI IL TITOLO</p>
            <input
              id="title"
              className="area-testo"
              type="text"
              placeholder="Inserisci il titolo"
              value={article.title}
              onChange={(event) =>
                handleFormArticle("title", event.target.value)
              }
              required
            />
            <br />
            <hr />
            <p>INSERISCI IL CONTENUTO</p>
            <input
              id="content"
              className="area-testo"
              type="text"
              placeholder="Inserisci il contenuto"
              value={article.content}
              onChange={(event) =>
                handleFormArticle("content", event.target.value)
              }
              required
            />
            <br />
            <hr />
            <p>INSERISCI L'IMMAGINE</p>
            <input
              id="image"
              className="area-testo"
              type="text"
              placeholder="Inserisci un immagine"
              value={article.image}
              onChange={(event) =>
                handleFormArticle("image", event.target.value)
              }
              required
            />
            <br />
            <hr />
            <p>INSERISCI I TAG</p>
            <input
              id="tags"
              className="area-testo"
              type="text"
              placeholder="Inserisci i tags di riconoscimetno"
              value={article.tags}
              onChange={(event) =>
                handleFormArticle("tags", event.target.value)
              }
              required
            />
            <hr />
            <button type="submit" className="btn ">
              Salva
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
