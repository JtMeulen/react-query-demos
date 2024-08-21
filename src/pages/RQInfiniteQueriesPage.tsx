import { useInfiniteQuery } from "@tanstack/react-query";

type IColor = {
  id: number;
  name: string;
};

const fetchColors = async ({ pageParam }: { pageParam: number }) => {
  console.log("pageParam", pageParam);
  const res = await fetch(`http://localhost:4000/colors?_limit=${pageParam}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const RQInfiniteQueriesPage = () => {
  const {
    isPending,
    isFetching,
    data,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["colors"],
    queryFn: fetchColors,
    initialPageParam: 3,
    getNextPageParam: (_lastPage, pages) => {
      return pages[pages.length - 1].length + 3;
    },
  });

  if (isError) return <h2>Error: {error.message}</h2>;

  return (
    <>
      <h2>React Query Colors (infinite loading)</h2>
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul>
            {data?.pages[data.pages.length - 1].map((color: IColor) => {
              return <li key={color.id}>{color.name}</li>;
            })}
          </ul>
          {hasNextPage && (
            <button onClick={() => fetchNextPage()}>Load more</button>
          )}
          {isFetching && <p>Loading...</p>}
        </>
      )}
    </>
  );
};
