import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type IColor = {
  id: number;
  name: string;
};

const fetchColors = async (page: number) => {
  const res = await fetch(
    `http://localhost:4000/colors?_per_page=5&_page=${page}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const RQPaginatedQueriesPage = () => {
  const [page, setPage] = useState(1);

  const { isPending, isFetching, data, isError, error } = useQuery({
    queryKey: ["colors", page],
    queryFn: () => fetchColors(page),
    placeholderData: (previousData) => previousData, // Show previous data while fetching new data to not cause loading states
  });

  if (isError) return <h2>Error: {error.message}</h2>;

  return (
    <>
      <h2>React Query Colors (pagination)</h2>
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul>
            {data.data?.map((color: IColor) => {
              return <li key={color.id}>{color.name}</li>;
            })}
          </ul>
          <div>
            <button
              disabled={page === data.first}
              onClick={() => setPage(data.prev)}
            >
              Previous page
            </button>
            <span>
              page: {page}/{data.pages}
            </span>
            <button
              disabled={page === data.last}
              onClick={() => setPage(data.next)}
            >
              Next page
            </button>
            {isFetching ? <p>Updating...</p> : null}
          </div>
        </>
      )}
    </>
  );
};
