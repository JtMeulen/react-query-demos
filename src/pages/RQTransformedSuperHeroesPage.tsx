import { useQuery } from "@tanstack/react-query";

type IHero = {
  id: number;
  name: string;
  alterEgo: string;
};

const fetchSuperHeroes = async () => {
  const res = await fetch("http://localhost:4000/superheroes");

  if (!res.ok) {
    const errorCode = res.status;
    const errorMessage = await res.text();
    throw new Error(`${errorCode} - ${errorMessage}`);
  }

  return res.json();
};

export const RQTransformedSuperHeroesPage = () => {
  const { isPending, data, isError, error } = useQuery({
    queryKey: ["super-heroes-transformed"],
    queryFn: fetchSuperHeroes,
    select: (data) => data.map((hero: IHero) => hero.name.toUpperCase()),
  });

  if (isPending) return <h2>Loading...</h2>;
  if (isError) return <h2>Error: {error.message}</h2>;

  return (
    <>
      <h2>React Query Super Heroes Page (transformed data)</h2>
      <ul>
        {data?.map((hero: string) => {
          return <li key={hero}>{hero}</li>;
        })}
      </ul>
    </>
  );
};
