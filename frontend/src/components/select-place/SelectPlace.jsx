import React, { useState, useEffect, useRef } from "react";
import "./SelectPlace.css";

function SelectPlace({ options, selected, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (place) => {
    onSelect(place);
    setIsOpen(false);
  };

  return (
    <div className="select-place-wrapper" ref={containerRef}>
      <div className="select-place-display" onClick={handleToggle}>
        {selected && selected.id ? (
          <>
            <span className="place-title">{selected.title}</span>
            <span className="place-address">{selected.full_address}</span>
          </>
        ) : (
          <div className="place-none">Не выбрано</div>
        )}
      </div>

      {isOpen && (
        <div className="select-place-container">
          {options.map((place) => (
            <div
              key={place.id}
              className={`select-place-option ${selected?.id === place.id ? "selected" : ""}`}
              onClick={() => handleSelect(place)}
            >
              <span className="place-title">{place.title}</span>
              <span className="place-address">{place.full_address}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectPlace;
