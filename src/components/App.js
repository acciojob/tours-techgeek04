import React, { useState, useEffect } from "react";

const url = "https://mock-api-for-tours.com/tours"; 

const App = () => {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setTours(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tours:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const removeTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (tours.length === 0) {
    return (
      <main id="main">
        <h2>No tours left</h2>
        <button onClick={fetchTours}>Refresh</button>
      </main>
    );
  }

  return (
    <main id="main">
      <h1>Our Tours</h1>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
};

const Tours = ({ tours, removeTour }) => {
  return (
    <div>
      {tours.map((tour) => (
        <Tour key={tour.id} {...tour} removeTour={removeTour} />
      ))}
    </div>
  );
};

const Tour = ({ id, name, info, image, price, removeTour }) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <div className="tour-card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <h4>${price}</h4>
      <p>
        {readMore ? info : `${info.substring(0, 200)}...`}
        <button onClick={() => setReadMore(!readMore)}>
          {readMore ? "Show less" : "Show more"}
        </button>
      </p>
      <button onClick={() => removeTour(id)}>Not Interested</button>
    </div>
  );
};

export default App;
