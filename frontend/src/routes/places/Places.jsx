import "./Places.css";
import React, { useState, useEffect } from "react";
import Input from "../../components/input/Input";
import axios from "axios";
import PlaceItem from "../../components/place-item/PlaceItem";

function Places() {
  const [places, setPlaces] = useState([]);
  const [newPlaceTitle, setNewPlaceTitle] = useState("");
  const [newPlaceFullAddress, setNewPlaceFullAddress] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/places");
        setPlaces(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchData();
  }, []);

  const handleRemovePlace = async (id) => {
    try {
      await axios.delete(`/api/places/${id}`);
      setPlaces((places) => places.filter((place) => place.id !== id));
    } catch (error) {
      console.log("error while deleting place:", error);
    }
  };

  const handleAddPlace = async () => {
    try {
      const newPlace = {
        title: newPlaceTitle,
        full_address: newPlaceFullAddress,
      };
      await axios.post("/api/places", newPlace);
      setPlaces((places) => [...places, newPlace]);
      setNewPlaceTitle("");
      setNewPlaceFullAddress("");
      document.getElementById("place-title-input").value = "";
      document.getElementById("place-full-address-input").value = "";
    } catch (err) {
      console.error("Add book error:", err);
    }
  };

  return (
    <>
      <div className="place-page-box">
        <h1>Точки трансферов</h1>
        <div className="places-list">
          {places.map((item) => (
            <PlaceItem
              key={item.id}
              id={item.id}
              title={item.title}
              fullAddress={item.full_address}
              removeHandler={handleRemovePlace}
            />
          ))}
        </div>
        <div className="add-place-form">
          <Input
            id="place-title-input"
            type="text"
            placeholder="Название места"
            onChange={(e) => setNewPlaceTitle(e.target.value)}
            required
          />
          <Input
            id="place-full-address-input"
            type="text"
            placeholder="Полный адрес"
            onChange={(e) => setNewPlaceFullAddress(e.target.value)}
            required
          />
          <button
            className="base-button"
            id="add-place-button"
            onClick={handleAddPlace}
          >
            Добавить место
          </button>
        </div>
      </div>
    </>
  );
}

export default Places;
