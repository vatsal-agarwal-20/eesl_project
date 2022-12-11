import axios from 'axios';
import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor'
import { Button } from 'semantic-ui-react';
// import Example from './OffCanvas';
// import Navbar from './Navbar';
import Tasks from './Tasks';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


function TextField({updateData,deleteData ,...props}) {
  const [projectName,setProjectName]=useState(props.name)
  
  const changeVal=(e)=>{
    updateData(e.target.value,props.id)
    setProjectName(e.target.value);
  }
    return (
      <div>
          <InputGroup size="lg" id={props.projectId}>
          <InputGroup.Text id="inputGroup-sizing-lg">Project Name</InputGroup.Text>
          {/* <Form.Control
            aria-label="Project Name"
            aria-describedby="inputGroup-sizing-sm"
            type="text"
            defaultValue={props.name}
            // onChange={}
          /> */}
          <input type="text" style={{"width":"50%", "borderColor":"#DADBDB","marginLeft":"2px", "height":"50px"}} value={projectName} onChange={(e)=>changeVal(e)} />
          <button className='btn btn-primary' style={{"marginLeft":"87%", "backgroundColor":"#06CAFF","padding":"0.5%"}} onClick={(e)=>deleteData(e,props.id)}> Delete Project</button> 
        </InputGroup>
        <br/>
        <Tasks projectId={props.id} taskData={props.data}/>
        <br/>
        <br/>
        <br/>
      </div>
    )
  }
//   function ProjectList(props)
//   {
//     const projectData=props.data;
//     const listItems = projectData.map((item)=>
//     <li key={item.ProjectID.toString()}>
//         <TextField name={item.ProjectName} id={item.ProjectID}/>
//     </li>
//     );

//     return (
//         <ul>{listItems}</ul>
//     )
//   }

function App(){
    const [data, setData] = useState([]);
    let dataLength = data.length
    if (dataLength>0) console.log("Data id", data[0].ProjectID);
  
    const [value, setValue] = useState("");
    const [rowId, setRowId] = useState();
    const [rowData, setRowData] = useState({});
    const [column, setColumn] = useState({});
  
    console.log('rowId', rowId);
    console.log('value', value);
    console.log('Column value', column);
    console.log("Updated data row", data[rowId]);
    let cell = column.dataField;
    console.log('cell', cell);
    // if (cell) console.log('Column data', data[rowId][cell]);
  
    
    useEffect(() => {
      getData();
    }, []);
    const getData = async () => {
      await axios.get('http://localhost:8078/projects')
        .then((res) => {
          console.log(res.data)
          setData(res.data)
        }
        )
        .catch(err => { console.log(err); })
    };
  
    const addData = async () => {
      console.log('add data length', dataLength);
      const newData = {
        "ProjectName": "New Project",
        "StartDate": "2022-01-01",
        "DueDate": "2022-12-31",
        "Status": "Working On It",
        "ColorCode":"Yellow",
        "CreatedBy": 1,
        "isActive":1
      }
  
      await axios.post('http://localhost:8078/projects', newData, { headers: { "Content-Type": "application/json" } })
        .then(res => {
          setData([newData, ...data]);
          getData();
        })
        .catch(error => {
          console.log(error);
        })
  
    }
  
  
    const updateData = async (newName, currID) => {
      console.log("New Name for project");
      console.log(newName);
      console.log("current id", currID);
      
      const res= data.find((item)=>
        item.ProjectID === currID
      )
      console.log("update res");
      console.log(res);
      console.log("update res name");
      console.log(res["ProjectName"]);
      res["ProjectName"]=newName;
      // // rowId, result, column
      // // data.Item = "Updated";
      // console.log("Updated result");
      // console.log(result);
      // let cell = column.dataField;
      // console.log('cell', cell);
  
      await axios.post("http://localhost:8078/projects/update", res, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(resp => {
          console.log("Patch call called");
          // console.log("Updated data", data);
          // if (data[rowId] !== result) change(result, rowId, cell);
          // data[rowId][cell] = value;
          // console.log("Again updated ", data);
          // const updatedData= result.find(e=>{
          //   e.column.dataField === cell ? data[rowId][cell]=result.cell : setData(data);
          //   return data;
          // })
          // console.log("UPDATED DATA", updatedData);
          setValue("");
          setColumn({})
          setRowId();
          setRowData({});
          // result = {};
          getData();
        })
        .catch(err => {
          console.log(err);
        })
    }
    const deleteData= async(e,id)=>{
      e.preventDefault();
      const delID={
        "ProjectID":id
      }
      await axios.post("http://localhost:8078/projects/delete", delID)
      .then(res=>{
        getData();
      })
      .catch(err=>{
        console.log(err);
      })
    }
    // const updateData = async (rowId, result, column) => {
  
    // }
  
    //   componentDidMount() {
    //     // Simple POST request with a JSON body using fetch
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ title: 'React POST Request Example' })
    //     };
    //     fetch('http://localhost:8078/projects', requestOptions)
    //         .then(response => response.json())
    //         .then(data => this.setData([res.data, ...data]));
    // }
  
    // const selectRow = {
    //   mode: "checkbox"
    // }
  
    
    // const columns = [
    //   {
    //     dataField: "Item",
    //     text: "Item",
    //     sort: false,
    //     // formatter: (cell,row,rowIndex)=>{
    //     //   if(cell)
    //     //   {
    //     //   console.log(row);
    //     //   console.log(rowIndex);
    //     //   }
    //     // }
    //   },
    //   {
    //     dataField: "Status",
    //     text: "Status",
    //     sort: false,
    //     editor: {
    //       type: Type.SELECT,
    //       options: [
    //         {
    //           value: "Working On it",
    //           label: "Working On It"
    //         },
    //         {
    //           value: "Stuck",
    //           label: "Stuck"
    //         }
    //         ,
    //         {
    //           value: "Completed",
    //           label: "Completed"
    //         }
    //       ]
    //     }
    //   },
    //   {
    //     dataField: "Date",
    //     text: "Date",
    //     sort: false,
    //   },
    //   {
    //     dataField: "Description",
    //     text: "Description",
    //     sort: false,
    //   },
    //   {
    //     dataField: "remove",
    //     text: "" ,
    //     editable:false,
    //     formatter: () => {
    //       return (
    //         <button
    //           className="btn btn-danger btn-xs"
    //           onClick={() => deleteData()}
    //         >
    //           Delete
    //         </button>
    //       );
    //     }
    //   }
    // ]
  
    // const result = data.find((item) => {
    //   return item.ProjectID === rowId
    // })
    // console.log('result', result);
  
    // const change = (result, rowId, cell) => {
    //   console.log("Change function called");
    //   console.log("Change function data:", data[rowId]);
    //   data[rowId] = result;
    //   console.log("New Data is: ", data);
    // }
  
    // const replaceData=data.map((item)=>{
    //   if (item.ProjectID === rowId) { 
    //     data[item.ProjectID]=result;
    //   }
    // })
    // console.log('Replaced Data', replaceData);
  
    // const Edit = async () => {
    //   const response = await axios.get("http://localhost:8078/projects/check");
    //   console.log(response, "Response successful");
    // }
    // useEffect(() => {
    //   Edit();
    // }, []);
  
    const projectTable = data.map((item,id)=>{
      console.log('map item',item);
      return <div key={id}>
        <TextField data={item} name={item.ProjectName} id={item.ProjectID} index={id} updateData={updateData} deleteData={deleteData}/>
      </div>
    })
  
    return (
      <div className="App">
        <Button className="btn btn-primary" onClick={addData}>New Project</Button>

        {/* <div className='table-page'>
            {
                data.map((item,i)=>{
                    
                    return <TextField data={item} name={item.ProjectName} id={item.ProjectID} key={i}/>
                    
                })
            }
        </div> */}
        <>
        {projectTable}
        </>
        
        {/* <BootstrapTable striped hover condensed
          keyField='ProjectID'
          data={data}
          columns={columns}
          deleteRow={true}
          cellEdit={cellEditFactory({
            mode: "click",
            blurToSave: true,
            
            afterSaveCell: (oldValue, newValue, row, column) => {
              // console.log(oldValue);
              // console.log(newValue);
              // console.log(row);
              console.log(column);
              setColumn(column);
              setValue(newValue);
              setRowId(row.ProjectID);
              console.log(rowId);
              updateData(row.ProjectID, result, column);
              setRowData(row);
              // return {async:true}
            },
            // beforeSaveCell: (oldValue, newValue, row, column) => { 
            //   // console.log('beforeSave',oldValue);
            //   // console.log('beforeSave',newValue);
            //   // console.log('beforeSave',row);
            //   // console.log('beforeSave',column);
            //   setValue(newValue);
            //   setRowId(row.ProjectID);
            //   console.log(rowId);
            //   updateData(row.ProjectID, result);
            //   setRowData(row);
            // },
          })}
  
  
        // selectRow={selectRow}
        /> */}
  
        {/* <SmallExample/>
        <DynamicTable/>
        <NewApp/>
  
        <Table2/> */}
  
        {/* <EditableTable /> */}
  
        {/* <Editable2/> */}
  
        {/* <Example /> */}
        {/* <BasicForm/> */}
        {/* <Navbar/> */}

        {/* <Tasks ProjectID={data.ProjectID}/> */}
        {/* <ProjectList data={data}/> */}
      </div>
    );
  }
  
  export default App;

