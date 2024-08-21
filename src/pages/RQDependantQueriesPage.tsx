import { useQuery } from "@tanstack/react-query";

const fetchData = async (apiPath: string) => {
  // Mock a delay for testing purposes
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const res = await fetch("http://localhost:4000/" + apiPath);

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
};

export const RQDependantQueriesPage = ({ userId }: { userId: string }) => {
  const userQuery = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchData("users/" + userId),
  });

  const channelId = userQuery?.data?.channelId;

  const channelQuery = useQuery({
    queryKey: ["channel", channelId],
    queryFn: () => fetchData("channel/" + channelId),
    enabled: !!channelId,
  });

  if (userQuery.isError) {
    return <h2>Error: {userQuery.error.message}</h2>;
  } else if (channelQuery.isError) {
    return <h2>Error: {channelQuery.error.message}</h2>;
  }

  console.log(userQuery);

  return (
    <>
      <h2>RQ Parallel Queries Page</h2>
      <h3>User</h3>
      {userQuery.isPending ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>{userQuery.data.name}</p>
          <p>{userQuery.data.email}</p>
        </>
      )}
      <h3>Channel</h3>
      {channelQuery.isPending ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>{channelQuery.data.name}</p>
          <ul>
            {channelQuery.data.content.map((item: string) => {
              return <li key={item}>{item}</li>;
            })}
          </ul>
        </>
      )}
    </>
  );
};
