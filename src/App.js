import './App.css';
import { Octokit } from "octokit";
import React, {  useState } from "react";
import {RepoList, RepoListItem} from "./components/RepoList";
import {CommitList, CommitListItem} from "./components/CommitList";

function App() {
  // https://api.github.com/
  const octokit = new Octokit({ auth: "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" });

  const [users, setUsers] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  
  const [commits, setCommits] = useState([]);
  
  const handleInputChange = event => {
  // Update the appropriate state
    const { value } = event.target;
    setUserSearch(value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    getUsers(userSearch)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  };

  const handleCommits = e => {
    e.preventDefault();
    const value  = e.target.value;
    getCommits(value);
  };


  async function getUsers(input) {
        // get all repos from the searched user
       await octokit.request("GET /users/{owner}/repos", {
          owner: input,
          type: "User",
          created: "<2011-01-01",
          in: "login"
        })
        .then(res => setUsers(res.data))
        .catch(err => console.log(err));
}

async function getCommits(repoData) {
        // get all commits from that repo
       await octokit.request("GET /repos/{owner}/{repo}/commits", {
          owner: userSearch,
          repo: repoData
        })
        .then(res => setCommits(res.data))
        .catch(err => console.log(err));
}

// TO DO - add more checkpoints
// 1. If user does not have any repos
// 2. If user cannot be found
// 3. No commits available for that repo

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="width-100">Start by searching a Github User, to see their repos and commits!</h1>
      </header>
      <div className="container">
      <div className="row m-4">
        <div class="col-xs-12">
          <form>
        <div className="input-group">
            <label for="username" className="p-2">Github User: </label>
            <input id="username" type="text" className="form-control" value={userSearch} onChange={handleInputChange} placeholder="Search by username" aria-label="Search a Github user" />
            <button className="btn btn-bd-primary" type="button" id="search-users" onClick={handleSearch}>Search</button>
            {/* <button className="btn btn-outline-primary" type="button" onClick={clearAll}>Clear</button> */}
          </div>
        </form>
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12 col-sm-6">
          {/* Retrieved commits data will be dumped here */}
          <div className="repos">
             {/* will show ul list of repos */}
              <RepoList>
                {users.map(repo => {
                  return (
                    <RepoListItem
                      key={repo._id}
                      title={repo.name}
                      description={repo.description}
                      onClick={handleCommits}
                    />
                  );
                })}
              </RepoList>
            
          </div>
        </div>
        <div className="left-nav col-xs-12 col-sm-6">
          {/* Retrieved commits data will be dumped here */}
          <div className="commits">
          {!commits.length ? (
              <p className="text-center">No recent commits to display</p>
            ) : (
              <CommitList>
                {commits.map(commitName => {
                  return (
                    <CommitListItem
                      key={commitName._id}
                      message={commitName.commit.message}
                      // date={commitName.commit.author.date}
                    />
                  );
                })}
              </CommitList>
          )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
  
}

export default App;
