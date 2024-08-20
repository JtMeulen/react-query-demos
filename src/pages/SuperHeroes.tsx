import { useState, useEffect } from "react";

type IHero = {
  id: number;
  name: string;
  alterEgo: string;
};

export const SuperHeroesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IHero[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("http://localhost:4000/superheroes");
        const data = await res.json();
        setData(data);
      } catch {
        setError("Error fetching data");
      }

      setIsLoading(false);
    };

    getData();
  }, []);

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <>
      <h2>Super Heroes Page</h2>
      {data.map((hero) => {
        return <div key={hero.id}>{hero.name}</div>;
      })}
    </>
  );
};
