import React, { useEffect, useState } from "react";
import axios from "axios";

function Transfres() {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/api/transfers")
      .then(res => {
        // Показываем только завершённые трансферы (closed_at !== null)
        const completed = res.data.filter(t => t.closed_at !== null);
        setTransfers(completed);
      })
      .catch(() => setError("Не удалось загрузить трансферы"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto", padding: "1rem" }}>
      <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Завершённые трансферы</h1>

      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && transfers.length === 0 && (
        <p>Завершённых трансферов пока нет.</p>
      )}

      {!loading && !error && transfers.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {transfers.map(t => (
            <li
              key={t.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: 6,
                padding: "1rem",
                marginBottom: "1rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                transition: "box-shadow 0.3s",
                cursor: "default"
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)"}
            >
              <div><strong>ID:</strong> {t.id}</div>
              <div><strong>Книга ID:</strong> {t.book}</div>
              <div><strong>Место ID:</strong> {t.place}</div>
              <div><strong>Отправитель:</strong> {t.sender}</div>
              <div><strong>Получатель:</strong> {t.receiver || "-"}</div>
              <div><strong>Создан:</strong> {new Date(t.created_at).toLocaleString()}</div>
              <div><strong>Завершён:</strong> {new Date(t.closed_at).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Transfres;

