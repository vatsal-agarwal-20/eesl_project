import React, { Component } from 'react'
import axios from 'axios';
class Editable2 extends Component {

    constructor(props)
    {
        super(props);

        this.state={
            data:[]
        }

    }

    onChangeInput = (e, SubtaskID) => {
      const {name,value} = e.target
      console.log('name', name)
      console.log('value', value)
      console.log('employeeID', SubtaskID)

      const editData = this.data.map((item) => 
      item.SubtaskID === this.data.SubtaskID &&
      name ? {...item, [name]:value} : item
      )
      console.log('editData', editData)

      this.setState({data:editData})

  }

  changeHandler=(event)=>{
    this.setState({[event.target.name]: event.target.value})
  };

  handleAddition = (e) =>{
    e.preventDefault();
    console.log(this.state);
    axios.post("http://localhost:8078/subtasks",this.state)
    .then(res=>{
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }


    componentDidMount(){
        axios.get("http://localhost:8078/subtasks")
        .then(res =>{
            this.setState({data:res.data});
            console.log(res);
        })
        .catch( err=>{
            console.log(err);
        })
    }

  render() {
    const {data} = this.state
    return (
      <div>
        <button onClick={this.handleAddition}>Add Row</button>
          <table>
            <thead>
              <th>Item</th>
              <th>Status</th>
              <th>Date</th>
              <th>Description</th>
            </thead>
            <tbody>
              {
                data.map(element=>(
              <tr key={element.SubtaskID}>
                <td>
                <input 
                        value= {element.Item}
                        type="text"
                        onChange={(e)=> this.onChangeInput(e,element.SubtaskID)}
                        placeholder="Type Item"/>
                </td>
                <td>
                <input 
                        value= {element.Status}
                        type="text"
                        onChange={(e)=> this.onChangeInput(e,element.SubtaskID)}
                        placeholder="Type Item"/>
                </td>
                <td>
                <input 
                        value= {element.Date}
                        type="text"
                        onChange={(e)=> this.onChangeInput(e,element.SubtaskID)}
                        placeholder="Type Item"/>
                </td>
                <td>
                <input 
                        value= {element.Description}
                        type="text"
                        onChange={this.changeHandler}
                        placeholder="Type Item"/>
                </td>
              </tr>
             )) }
            </tbody>
          </table>
        
        </div>
        
    )
  }
}

export default Editable2