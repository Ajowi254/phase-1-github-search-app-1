document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#github-form');
    const userList = document.querySelector('#user-list'); // select the user list element
    form.addEventListener('submit', e => {
      e.preventDefault();
      let search = e.target.search.value;
      console.log('searching github');
      searchGithubUsers(search);
    });
  });
  
  function searchGithubUsers(search) {
    fetch(`https://api.github.com/search/users?q=${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json'
      }
    })
      .then(response => response.json())
      .then(data => {
        document.querySelector('#user-list').innerHTML = '';
        document.querySelector('#repos-list').innerHTML = '';
  
        // handle the user data here
        for (const user of data.items) {
          let userCard = document.createElement('li');
          userCard.innerHTML = `
            <div class='content'>
              <h3>${user.login}</h3>
              <p>${user.html_url}</p>
              <img src="${user.avatar_url}" />
            </div>
          `;
          document.querySelector('#user-list').appendChild(userCard);
  
          //add event to the users to show more info about them
          userCard.querySelector('h3').addEventListener('click', e => {
            let username = e.target.innerHTML; //get the username
            getUserRepos(username);
          });
        }
      });
  }
  
  function getUserRepos(username) {
    //make a fetch request with the returned value
    //display the returned results on the DOM
    fetch(`https://api.github.com/users/${username}/repos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json'
      }
    })
      .then(response => response.json())
      .then(repos => {
        repos.forEach(repo => {
          let repoElement = document.createElement('li');
          repoElement.innerHTML = `
            <h4>${repo.name}</h4>
            <p>${repo.html_url}</p>
          `;
          document.querySelector('#repos-list').appendChild(repoElement);
        });
      });
  }
  