import { useQuery } from "@tanstack/react-query";

type IHero = {
  id: number;
  name: string;
  alterEgo: string;
};

type IFriend = {
  id: number;
  name: string;
};

const fetchData = async (apiPath: string) => {
  const res = await fetch("http://localhost:4000/" + apiPath);

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
};

export const RQParallelQueriesPage = () => {
  const superHeroesQuery = useQuery({
    queryKey: ["superheroes"],
    queryFn: () => fetchData("superheroes"),
  });

  const friendsQuery = useQuery({
    queryKey: ["friends"],
    queryFn: () => fetchData("friends"),
  });

  if (superHeroesQuery.isError) {
    return <h2>Error: {superHeroesQuery.error.message}</h2>;
  } else if (friendsQuery.isError) {
    return <h2>Error: {friendsQuery.error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Parallel Queries Page</h2>
      {superHeroesQuery.isPending ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>Heroes</h3>
          {superHeroesQuery.data.map((hero: IHero) => {
            return <p key={hero.id}>{hero.name}</p>;
          })}
        </>
      )}
      {friendsQuery.isPending ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>Friends</h3>
          {friendsQuery.data.map((friend: IFriend) => {
            return <p key={friend.id}>{friend.name}</p>;
          })}
        </>
      )}
    </>
  );
};
