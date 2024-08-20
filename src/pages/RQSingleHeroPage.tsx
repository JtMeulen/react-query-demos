import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/useSuperHeroData";

export const RQSingleHeroPage = () => {
  const { id } = useParams();

  const { data, isPending, isError, error } = useSuperHeroData(id || "");

  if (isError) return <h2>Error: {error.message}</h2>;
  if (isPending) return <h2>Loading...</h2>;

  return (
    <>
      <h1>{data.name}</h1>
      <p>{data.alterEgo}</p>
    </>
  );
};
