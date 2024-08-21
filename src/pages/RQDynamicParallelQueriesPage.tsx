import { useQueries } from "@tanstack/react-query";

const fetchData = async (id: number) => {
  const res = await fetch("http://localhost:4000/superheroes/" + id);

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
};

export const RQDynamicParallelQueriesPage = ({
  heroIds,
}: {
  heroIds: number[];
}) => {
  const queryResults = useQueries({
    queries: heroIds.map((id) => ({
      queryKey: ["superheroes", id],
      queryFn: () => fetchData(id),
    })),
  });

  console.log(queryResults);

  return (
    <div>
      <h1>RQ Dynamic Parallel Queries</h1>
      {queryResults.map((query, idx) => {
        if (query.isError) {
          return <p key={query.error.message}>Error: {query.error.message}</p>;
        } else if (query.isPending) {
          return <p key={idx}>Loading...</p>;
        }

        return <p key={query.data.id}>{query.data.name}</p>;
      })}
    </div>
  );
};
