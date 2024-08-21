import { useQuery, useQueryClient } from "@tanstack/react-query";

type IHero = {
  id: string;
  name: string;
  alterEgo: string;
};

export const useSuperHeroData = (id: string) => {
  // We are using the queryClient to read from the cache to set initial data
  const queryClient = useQueryClient();

  console.log("queryClient", queryClient.getQueryData(["super-heroes"]));

  return useQuery({
    queryKey: ["super-hero", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:4000/superheroes/${id}`);

      if (!res.ok) {
        const errorCode = res.status;
        throw new Error(`${errorCode} - Error when fetching`);
      }

      return res.json();
    },
    initialData: () => {
      const cachedData = queryClient.getQueryData(["super-heroes"]) as
        | IHero[]
        | undefined;

      return cachedData?.find((hero: IHero) => hero.id === id);
    },
  });
};
