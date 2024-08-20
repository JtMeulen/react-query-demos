import { useQuery } from "@tanstack/react-query";

export const useSuperHeroData = (id: string) => {
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
  });
};
