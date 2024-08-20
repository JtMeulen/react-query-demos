import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

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

export const RQSuperHeroesPage = () => {
  const { isPending, data, isError, error, isFetching } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    // gcTime: 1000, // Garbage collection time (time to invalidate the cache) (this means it will cause a isPending hook again)
    // staleTime: 10000, // Time to consider the data stale, so there is no refetching in the background for that period
    // refetchOnMount: false, // This will not refetch the data when the component mounts, if if it is stale
    // refetchOnWindowFocus: true, // This will refetch the data when the window is focused, if the data is stale
    // refetchInterval: 1000, // This will refetch the data every 1 second, if the data is stale
    // refetchIntervalInBackground: true, // This will refetch the data every 1 second, if the data is stale, even if the window is not focused
  });

  // isPending is only initiated when there is no cache
  // isFetching is always initiated (if the data is stale). It create a request in the background, and updates the data and cache silently (so you see a change in the UI)
  console.log({ isPending, isFetching });

  if (isPending) return <h2>Loading...</h2>;
  if (isError) return <h2>Error: {error.message}</h2>;

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <ul>
        {data?.map((hero: IHero) => {
          return (
            <li key={hero.id}>
              <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
