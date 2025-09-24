import React, { useEffect, useState } from "react";

export const WaterDropletBackground = () => {
  const [droplets, setDroplets] = useState<Array<{ id: number; left: number; size: number; delay: number }>>([]);

  useEffect(() => {
    const generateDroplets = () => {
      const newDroplets = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 40 + 20,
        delay: Math.random() * 8,
      }));
      setDroplets(newDroplets);
    };

    generateDroplets();
    const interval = setInterval(generateDroplets, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 water-droplet-bg">
      {droplets.map((droplet) => (
        <div
          key={droplet.id}
          className="water-droplet"
          style={{
            left: `${droplet.left}%`,
            width: `${droplet.size}px`,
            height: `${droplet.size}px`,
            animationDelay: `${droplet.delay}s`,
          }}
        />
      ))}
    </div>
  );
};