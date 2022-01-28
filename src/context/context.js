import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  const [requests, setRequests] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });

  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let { rate } = data;
        let { remaining } = rate;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, "Ooops ! You reached the maximum hourly limit");
        }
      })
      .catch((err) => console.log(err));
  };

  function toggleError(show = false, msg = "") {
    setError({ show, msg });
  }

  const fetchUser = async (user) => {
    setLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      //   toggleError(true, "No such user found")
      console.log(err)
    );

    if (response) {
      setGithubUser(response.data);
    } else {
      toggleError(true, "No such user found");
    }
    setLoading(false);
    checkRequests();
  };

  useEffect(checkRequests, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        fetchUser,
        loading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
