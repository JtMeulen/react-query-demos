import { useQuery } from "@tanstack/react-query";

export const useSuperHeroesData = () => {
  return useQuery({
    queryKey: ["super-heroes"],
    queryFn: async () => {
      const res = await fetch("http://localhost:4000/superheroes");

      if (!res.ok) {
        const errorCode = res.status;
        throw new Error(`${errorCode} - Error has occurred.`);
      }

      return res.json();
    },
  });
};
