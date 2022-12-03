import React,{useState} from 'react'
import './EditableTable.css'


const data= [
    {
        employeeID: '1',
        name: 'Vatsal',
        email: 'vats@gmail.com',
        position: 'frontend developer',
    },
    {
        employeeID: '2',
        name: 'Ansh',
        email: 'ansh@gmail.com',
        position: 'HR executive',
    },
    {
        employeeID: '3',
        name: 'Aryan',
        email: 'aryan@gmail.com',
        position: 'backend developer',
    },
    {
        employeeID: '4',
        name: 'Ram',
        email: 'ram@gmail.com',
        position: 'full stack developer',
    }
]

const EditableTable = () => {

    const [employeeData, setEmployeeData]= useState(data);

    const onChangeInput = (e, employeeID) => {
        const {name,value} = e.target
        console.log('name', name)
        console.log('value', value)
        console.log('employeeID', employeeID)

        const editData = employeeData.map((item) => 
        item.employeeID === employeeID &&
        name ? {...item, [name]:value} : item
        )
        console.log('editData', editData)

        setEmployeeData(editData)

    }

  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Position</th>
                </tr>
            </thead>
            <tbody>
                {employeeData.map(({employeeID,name,email,position}) =>(
                    <tr key={employeeID}>
                        <td>
                        <input 
                        name= "name"
                        value= {name}
                        type="text"
                        onChange={(e)=> onChangeInput(e,employeeID)}
                        placeholder="Type Name"/>    
                        </td>
                        <td>
                        <input 
                        name= "email"
                        value= {email}
                        type="text"
                        onChange={(e)=> onChangeInput(e,employeeID)}
                        placeholder="Type Email"/>
                        </td>
                        <td>
                        <input 
                        name= "position"
                        value= {position}
                        type="text"
                        onChange={(e)=> onChangeInput(e,employeeID)}
                        placeholder="Type Position"/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default EditableTable