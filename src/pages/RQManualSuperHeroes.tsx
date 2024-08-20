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

export const RQManualSuperHeroesPage = () => {
  const { isLoading, isFetching, data, isError, error, refetch } = useQuery({
    queryKey: ["super-heroes-manual"],
    queryFn: fetchSuperHeroes,
    enabled: false,
  });

  // The official docs mention to use isLoading here, instead of isPending (not sure if intended).
  // isPending is always true when enabled: false, so the UI will always show "Loading..."
  if (isLoading || isFetching) return <h2>Loading...</h2>;
  if (isError) return <h2>Error: {error.message}</h2>;

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <button onClick={() => refetch()}>Load data</button>
      <ul>
        {data?.map((hero: IHero) => {
          return <li key={hero.id}>{hero.name}</li>;
        })}
      </ul>
    </>
  );
};
