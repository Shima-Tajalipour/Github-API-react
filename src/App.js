import React, { Component } from 'react'
import axios from 'axios';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      user:"",
      list:{},
      repos_url:[]
    }
  }
  componentDidMount=()=>(
    axios.get(`https://api.github.com/users/aboudmourad?client_id=04a99f2234e34d49d316&client_secret=8a5bc686c653faf7fd60b6278e6f1174d115e63c&sort=created`)
    .then((res)=>{
      this.setState({
        list:res.data,
        repos_url:[]
      })
    }).catch((error)=>{
      console.log(error)
    })
  )

  onChange=(event)=>{
    this.setState({
      [event.target.name]:event.target.value
    })
    }

  onClick=()=>{
    axios.get(`https://api.github.com/users/${this.state.user}?client_id=04a99f2234e34d49d316&client_secret=8a5bc686c653faf7fd60b6278e6f1174d115e63c&sort=created`)
    .then((res)=>{
      console.log(res)
      this.setState({
        list:res.data,
        repos_url:[]
      })
    }).catch((error)=>{
      console.log(error)
    })
  }
    repos=(e)=>{
      axios.get(this.state.list.repos_url)
      .then((res)=>{
        this.setState({
          repos_url:res.data
        })
      }).catch((error)=>{
        console.log(error)
      })
    }
  render() {
    return (
      <div style={{margin:"50px"}}>
        <div className="card mb-3" style={{maxWidth:"1000px"}}>
          <div className="row g-0">
          <div className="col-md-4">
            <img src={this.state.list.avatar_url} alt="avatar" style={{width:"300px"}}/>
          </div>
            <div className="col-md-8">
              <div className="card-body">
                <div className="input-group mb-3">
                  <input type="text" name="user" onChange={this.onChange} value={this.state.user} className="form-control" placeholder="username"/>
                  <button className="btn btn-outline-secondary" type="button" onClick={this.onClick}>UserName</button>               
                </div>
                <br/>
                <ul className="list-group">
                  <li className="list-group-item">FullName: {this.state.list.name}</li>
                  <li className="list-group-item">UserName: {this.state.list.login}</li>
                  <li className="list-group-item">Location: {this.state.list.location}</li>
                  <li className="list-group-item">Email Address: {this.state.list.email}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <ul>
          <div className="d-grid gap-2">
            <button className="btn btn-info" type="button" onClick={e=>this.repos(e)}>Show Repositories</button>
          </div>
          <h3>User Repositories: </h3>
          {this.state.repos_url.map((value,index)=>{
            return(
              <li className="list-group-item" key={index}>{value.name}</li>
            )
          })}
        </ul>
      </div>
    )
  }
}