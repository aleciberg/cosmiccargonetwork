import React, { useEffect } from "react";

const StarryBackground: React.FC = () => {
  const createStars = () => {
    const numStars = 100; // Adjust the number of stars
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div");
      star.className = "star";
      const size = Math.random() * 3; // Star size
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.left = `${Math.random() * 100}vw`;
      document.body.appendChild(star);
    }
  };

  useEffect(() => {
    createStars();
  }, []);

  return null; // This component doesn't render anything itself
};

export default StarryBackground;
