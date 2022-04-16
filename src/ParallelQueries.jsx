import { useQuery } from "react-query";

const fetchRepos = ({ queryKey }) => {
  const [, username] = queryKey;
  return fetch(`https://api.github.com/users/${username}/repos`).then((res) =>
    res.json()
  );
};

const fetchGists = ({ queryKey }) => {
  const [, username] = queryKey;
  return fetch(`https://api.github.com/users/${username}/gists`).then((res) =>
    res.json()
  );
};

export default function ParallelQueries({ username }) {
  const reposQuery = useQuery(["repos", username], fetchRepos);
  const gistsQuery = useQuery(["gists", username], fetchGists);
  console.log({ repos: reposQuery.data, gists: gistsQuery.data });

  return (
    <div>
      <h2>Repos</h2>
      {reposQuery.isLoading ||
        (reposQuery.isFetching && <p>Loading repos.....</p>)}
      {reposQuery.isError && (
        <p>Error loading repos: {reposQuery.error.message}</p>
      )}
      {reposQuery.data && (
        <ul>
          {reposQuery.data.map((repo) => (
            <li key={repo.id}>{repo.name}</li>
          ))}
        </ul>
      )}
      <hr />
      <h2>Gists</h2>
      {gistsQuery.isLoading ||
        (gistsQuery.isFetching && <p>Loading repos.....</p>)}
      {gistsQuery.isError && (
        <p>Error loading repos: {gistsQuery.error.message}</p>
      )}
      {gistsQuery.data && (
        <ul>
          {gistsQuery.data.map((gist) => (
            <li key={gist.id}>{gist.url}</li>
          ))}
        </ul>
      )}{" "}
      <hr />
    </div>
  );
}
