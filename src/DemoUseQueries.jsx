import { useQueries } from "react-query";

async function fetchRepos({ queryKey }) {
  const [, username] = queryKey;
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  return await res.json();
}

async function fetchGists(username) {
  const res = await fetch(`https://api.github.com/users/${username}/gists`);
  return await res.json();
}

export default function DemoUseQueries({ username }) {
  const [repos, gists] = useQueries({
    queries: [
      {
        queryKey: ["repos", username],
        queryFn: fetchRepos
      },
      {
        queryKey: ["gists", username],
        queryFn: () => fetchGists(username)
      }
    ]
  });

  // console.log({ repos: repos.data, gists: gists.data });

  return (
    <>
      <h1>User: {username}</h1>
      <div style={{ display: "flex" }}>
        <div>
          <h2>Repos</h2>
          <ul>
            {repos.isSuccess &&
              repos.data.map((repo) => <li key={repo.id}>{repo.name}</li>)}
          </ul>
        </div>
        <div>
          <h2>Gists</h2>
          <ul>
            {gists.isSuccess &&
              gists.data.map((gist) => (
                <li key={gist.id}>{gist.description}</li>
              ))}
          </ul>
        </div>
      </div>
      <hr />
    </>
  );
}
