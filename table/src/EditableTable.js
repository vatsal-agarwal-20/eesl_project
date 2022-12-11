import React, { useState, useEffect } from 'react'
import './EditableTable.css'
import axios from 'axios'



// const data= [
//     {
//         employeeID: '1',
//         name: 'Vatsal',
//         email: 'vats@gmail.com',
//         position: 'frontend developer',
//     },
//     {
//         employeeID: '2',
//         name: 'Ansh',
//         email: 'ansh@gmail.com',
//         position: 'HR executive',
//     },
//     {
//         employeeID: '3',
//         name: 'Aryan',
//         email: 'aryan@gmail.com',
//         position: 'backend developer',
//     },
//     {
//         employeeID: '4',
//         name: 'Ram',
//         email: 'ram@gmail.com',
//         position: 'full stack developer',
//     }
// ]

const EditableTable = () => {

  const [employeeData, setEmployeeData] = useState([]);

  const [element, setElement] = useState({
    Item:"",
    Status:"",
    Date:"",
    Description:""
  });
  

  useEffect(() => {

    getData();
  }, []);
  const getData = async () => {
    await axios.get('http://localhost:8078/subtasks')
      .then((res) => {
        console.log(res.data)
        setEmployeeData(res.data)
      }
      )
      .catch(err => { console.log(err); })
  };
  
  const updateData = async (result) => {
    debugger;

    console.log("Updating");
    console.log(employeeData);
    await axios.patch(`http://localhost:8078/subtasks/update/${result.SubtaskID}`, result, { headers: { "Content-Type": "application/json" } })
      .then(res => {
        getData();
      })
      .catch(err => {
        console.log(err);
      })
  }

  const onChangeInput = (e, employeeID) => {
    let { name, value } = e.target
    
    console.log('name', name)
    console.log('value', value)
    console.log('employeeID', employeeID)

    let result= employeeData.find(obj =>{
      return obj.SubtaskID === employeeID;
    })
    console.log('result', result);

    setElement((result)=>{
      if(name === "Item")
      {
        return {
          Item: value,
          Status: employeeData[result].Status,
          Date: result.Date,
          Description: result.Description
        }
      }
      else if(name === "Status")
      {
        return {
          Item: result.Item,
          Status: value,
          Date: result.Date,
          Description: result.Description
        }
      }
      else if(name === "Date")
      {
        return {
          Item: result.Item,
          Status: result.Status,
          Date: value,
          Description: result.Description
        }
      }
      else if(name === "Description")
      {
        return {
          Item: result.Item,
          Status: result.Status,
          Date: result.Date,
          Description: value
        }
      }
    });
    console.log("New element: ", element);
    
    // employeeData[result].name=value;
    // setEmployeeData(employeeData);
    // console.log("result is:",employeeData);

    // console.log('result',result);
    // result.name=value;
    // setElement(result);

    // console.log('element',element);

    // const newResult = element.map(function(event){
    //   event.value = value;
    //   return event;
    // })
    // console.log('newResult',newResult);

    const editData = employeeData.map((item) =>
      item.employeeID === employeeID &&
        name ? updateData(result) : item
    )
    // { ...item, [name]: value }
    console.log('editData', editData)

    
    // console.log('result',result);
    //value update
    // updateData(result);
    //updated value from db aa jae


    setEmployeeData(editData);
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Status</th>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((element) => (
            <tr key={element.SubtaskID}>
              <td>
                <input
                  name="Item"
                  value={element.Item}
                  type="text"
                  onChange={(e) => onChangeInput(e, element.SubtaskID)}
                  placeholder="Type Item"
                   />
              </td>
              <td>
                <input
                  name="Status"
                  value={element.Status}
                  type="text"
                  onChange={(e) => onChangeInput(e, element.SubtaskID)}
                  placeholder="Type Status" />
              </td>
              <td>
                <input
                  name="Date"
                  value={element.Date}
                  type="date"
                  onChange={(e) => onChangeInput(e, element.SubtaskID)}
                  placeholder="Type Date" />
              </td>
              <td>
                <input
                  name="Description"
                  value={element.Description}
                  type="text"
                  onChange={(e) => onChangeInput(e, element.SubtaskID)}
                  placeholder="Type Description" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EditableTable