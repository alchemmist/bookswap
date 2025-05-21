import "./AddBook.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { getAuthLogin } from "../../stores/auth";

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [cover, setCover] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [coverPreview, setCoverPreview] = useState("");

  useEffect(() => {
    if (cover) {
      setCoverPreview(cover);
    }
  }, [cover]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const newBook = {
        title,
        author,
        cover,
        responsabile: getAuthLogin(),
      };

      await axios.post("/api/books", newBook);
      navigate("/home");
    } catch (err) {
      setError("Ошибка при добавлении книги. Попробуйте снова.");
      console.error("Add book error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="addbook-container">
      <div className="addbook-box">
        <h1>Добавить книгу</h1>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Название книги*</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Автор*</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cover">Обложка (URL)</label>
            <input
              type="url"
              id="cover"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
              placeholder="https://example.com/cover.jpg"
            />
            {coverPreview && (
              <div className="cover-preview">
                <img
                  id="cover-preview"
                  src={coverPreview}
                  alt="Предпросмотр обложки"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="base-button submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Добавляем..." : "Добавить книгу"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
