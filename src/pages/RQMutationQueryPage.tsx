import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createRef, FormEvent } from "react";

type IHero = {
  id: number;
  name: string;
  alterEgo: string;
};

const fetchSuperHeroes = async () => {
  const res = await fetch("http://localhost:4000/superheroes");

  if (!res.ok) {
    throw new Error("Error fetching data");
  }

  return res.json();
};

export const RQMutationQueryPage = () => {
  const formRef = createRef<HTMLFormElement>();
  const queryClient = useQueryClient();

  const { isLoading, isFetching, data, isError, error, refetch } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
  });

  const {
    mutate,
    isPending: isMutationPending,
    isError: isMutationError,
    error: mutationError,
  } = useMutation({
    mutationKey: ["add-super-hero"],
    mutationFn: async (newHero: IHero) => {
      const res = await fetch("http://localhost:4000/superheroes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHero),
      });

      if (!res.ok) {
        throw new Error("Error adding new hero");
      }

      return res.json();
    },
    onSuccess: (data) => {
      // Data is returned from the POST request and contains the new hero
      // We can update the cache with the new data
      queryClient.setQueryData(
        ["super-heroes"],
        (oldData: IHero[] | undefined) => {
          return oldData ? [...oldData, data] : [data];
        }
      );
      // We can also invalidate the cache to refetch the data, so right afther a post a new get is made:
      // queryClient.invalidateQueries({ queryKey: ["super-heroes"] });
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const data = {
      name: formData.get("name") as string,
      alterEgo: formData.get("alterEgo") as string,
      id: Math.floor(Math.random() * 1000000),
    };

    mutate(data);
  };

  if (isLoading || isFetching || isMutationPending) return <h2>Loading...</h2>;
  if (isError) return <h2>Error: {error.message}</h2>;
  if (isMutationError) return <h2>Error: {mutationError.message}</h2>;

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <form onSubmit={handleSubmit} ref={formRef}>
        <input type="text" name="name" placeholder="Enter hero name" />
        <input type="text" name="alterEgo" placeholder="Enter hero alter ego" />
        <button type="submit">Add hero</button>
      </form>
      <button onClick={() => refetch()}>Load data</button>
      <ul>
        {data?.map((hero: IHero) => {
          return <li key={hero.id}>{hero.name}</li>;
        })}
      </ul>
    </>
  );
};
