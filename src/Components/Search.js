import React from "react";

class Search extends React.Component {

  state = {
    username: "",
    nameInput: "",
    userURL: "",
    userAvatar: "",
    userRepoCount: "",
    repoInfo: []
  };


  handleInput = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      username: prevState.nameInput,
      nameInput: ""
    }));

    const userurl = `https://api.github.com/users/${this.state.nameInput}`

    fetch(userurl)
      .then(r => r.json())
      .then(user => {this.setState({
        userURL: user.html_url,
        userAvatar: user.avatar_url,
        userRepoCount: `Repositories: ${user.public_repos}`
      })
      })
      .catch(err => console.warn('Oh dear...', err))


    const url = `https://api.github.com/users/${this.state.nameInput}/repos`

    fetch(url)
        .then(r => r.json())
        .then(repos => {
          let userRepos=[]
          for (const r of repos) {
            let obj = {}
            obj.name=r.name;
            obj.url=r.html_url;
            obj.description=r.description
            obj.stars=r.stargazers_count;
            obj.forks=r.forks_count;
            obj.issues=r.open_issues_count;
            userRepos.push(obj);
          }
          this.setState({repoInfo: userRepos})
        
        })
        .catch(err => console.warn('Oh dear...', err))
  }


  render() {

    return (
      <div id="results">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="nameInput">Enter your username: </label>
          <input type="text" name="nameInput" placeholder="GitHub Username" onChange={this.handleInput} />
          <input type="submit" />
        </form>

        <a href={this.state.userURL} target="_blank"><img src={this.state.userAvatar}/></a>
        <br/>
        <a href={this.state.userURL} target="_blank"><h3>{this.state.username}</h3></a>
        <a href={`${this.state.userURL}/repositories`} target="_blank"><h5>{this.state.userRepoCount}</h5></a>

        <div>
          {this.state.repoInfo.map((item, index) => {
            return (
                <div key={index} id="repoCard">

                  <a href={item.url} target="_blank">
                    <h3>{item.name}  <i className="fas fa-external-link-alt"></i></h3>
                  </a>

                  <p>{item.description}</p>

                  <a href={`${item.url}/network/members`}>
                    <p><i className="fas fa-code-branch icon"></i> - {item.forks} fork(s)</p>
                  </a>

                  <a href={`${item.url}/stargazers`}>
                    <p><i className="fas fa-star icon"></i> - {item.stars} star(s)</p>
                  </a>

                  <a href={`${item.url}/issues`}>
                    <p><i className="fas fa-exclamation-circle icon"></i> - {item.issues} issue(s)</p>
                  </a>


                </div>
            )
          })}
        </div>

      </div>
    );
  }
}

export default Search
