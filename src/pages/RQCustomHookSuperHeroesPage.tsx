import { useState } from "react";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

interface IHero {
  id: number;
  name: string;
  alterEgo: string;
}

export const RQCustomHookSuperHeroesPage = () => {
  const [initialFetch, setInitialFetch] = useState(false);

  const { isSuccess, isPending, isFetching, data, isError, error, refetch } =
    useSuperHeroesData();

  if (isError) return <h2>Error: {error.message}</h2>;
  if (isSuccess && !initialFetch) {
    setInitialFetch(true);
  }

  return (
    <>
      <h2>React Query Super Heroes Page (custom hook)</h2>
      {isPending || isFetching ? (
        <p>Loading...</p>
      ) : (
        <>
          <button disabled={!initialFetch} onClick={() => refetch()}>
            Refetch
          </button>
          <ul>
            {data?.map((hero: IHero) => {
              return <li key={hero.id}>{hero.name}</li>;
            })}
          </ul>
        </>
      )}
    </>
  );
};
