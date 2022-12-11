import axios from 'axios';
import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor'
import { Button } from 'semantic-ui-react';
import Example from './OffCanvas';
import Navbar from './Navbar';

function Tasks(props){
    // console.log("props data");
    // console.log(props.projectId);
    // console.log(props.taskData);
    const [data, setData] = useState([]);
    // let dataLength = data.length
    // if (dataLength>0) console.log("Data id", data[0].TaskID);
  
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
      getData(props.projectId);
    }, []);
    
    const getData = async (id) => {
      // const filterData= data.filter(rowElement => rowElement.ProjectID === props.projectId)
      
      // console.log('filteredData', filterData);
      await axios.get(`http://localhost:8078/tasks/${id}`)
        .then((res) => {
          console.log(res.data)
          setData(res.data)
        }
        )
        .catch(err => { console.log(err); })
    };
    

    const addData = async (newData) => {
      // const newData = {
      //   "TaskName": "New Task",
      //   "AssignedTo": 1,
      //   "Status": null,
      //   "StartDate": "2022-11-25",
      //   "DueDate": "2022-12-10",
      //   "ProjectID": 1,
      //   "TaskID": 0
      // }
      // newData["ProjectID"]=2;
      // newData["TaskID"]=0;
      newData["ProjectID"]=props.projectId;

      console.log("Add Data value");
      console.log(newData);
  
      await axios.post('http://localhost:8078/tasks', newData, { headers: { "Content-Type": "application/json" } })
        .then(res => {
          setData([newData, ...data]);
          getData(newData.ProjectID);
        })
        .catch(error => {
          console.log(error);
        })
  
    }
  
  
    const updateData = async (rowId, result, column) => {
      // data.Item = "Updated";
      console.log("Updated result");
      console.log(result);
      let cell = column.dataField;
      console.log('cell', cell);
  
      await axios.post("http://localhost:8078/tasks/update", result, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          console.log("Patch call called");
          console.log("Updated data", data);
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
          result = {};
          getData(result.ProjectID);
        })
        .catch(err => {
          console.log(err);
        })
    }
    const deleteData= async(id)=>{
      await axios.delete(`http://localhost:8078/tasks/delete/${id}`)
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
    //     fetch('http://localhost:8078/tasks', requestOptions)
    //         .then(response => response.json())
    //         .then(data => this.setData([res.data, ...data]));
    // }
  
    // const selectRow = {
    //   mode: "checkbox"
    // }
  
    
    const columns = [
      {
        dataField: "TaskName",
        text: "Task Name",
        sort: false,
        // formatter: (cell,row,rowIndex)=>{
        //   if(cell)
        //   {
        //   console.log(row);
        //   console.log(rowIndex);
        //   }
        // }
      },
      {
        dataField: "Status",
        text: "Status",
        sort: false,
        editor: {
          type: Type.SELECT,
          options: [
            {
              value: "Working On it",
              label: "Working On It"
            },
            {
              value: "Stuck",
              label: "Stuck"
            }
            ,
            {
              value: "Completed",
              label: "Completed"
            }
          ]
        }
      },
      {
        dataField: "AssigndTo",
        text: "Assigned To",
        formatter: (cell, row) => Type[cell],
        sort: false,
      },
      {
        dataField: "StartDate",
        text: "Start Date",
        formatter: (cell) => {
          let dateObj = cell;
          if (typeof cell !== 'object') {
            dateObj = new Date(cell);
          }
          if (cell == null) {
            return
          }
          return `${('0' + dateObj.getDate()).slice(-2)}/${('0' + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()}`;
        },
        editor:{
            type: Type.DATE
        },
        sort: false,
      },
      {
        dataField: "DueDate",
        text: "Due Date",
        formatter: (cell) => {
          let dateObj = cell;
          if (typeof cell !== 'object') {
            dateObj = new Date(cell);
          }
          if (cell == null) {
            return
          }
          return `${('0' + dateObj.getDate()).slice(-2)}/${('0' + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()}`;
        },
        editor:{
            type: Type.DATE
        },
        sort: false,
      },
      {
        dataField: "remove",
        text: <Example addData={addData} projID={props.projectId}/> ,
        editable:false,
        formatter: () => {
          return (
            <button
              className="btn btn-danger btn-xs"
              onClick={() => deleteData()}
              style={{"width":"40%", "height":"35px", "padding":"0","marginLeft":"30%"}}
            >
              Delete
            </button>
          );
        }
      }
    ]
  
    const result = data.find((item) => {
      return item.TaskID === rowId
    })
    console.log('result', result);
  
    // const change = (result, rowId, cell) => {
    //   console.log("Change function called");
    //   console.log("Change function data:", data[rowId]);
    //   data[rowId] = result;
    //   console.log("New Data is: ", data);
    // }
  
    // const replaceData=data.map((item)=>{
    //   if (item.TaskID === rowId) { 
    //     data[item.TaskID]=result;
    //   }
    // })
    // console.log('Replaced Data', replaceData);
  
    // const Edit = async () => {
    //   const response = await axios.get("http://localhost:8078/tasks/check");
    //   console.log(response, "Response successful");
    // }
    // useEffect(() => {
    //   Edit();
    // }, []);
  
  
    return (
      <div className="App">
        
        <Button className="btn btn-primary" onClick={addData}>Add Data</Button>
        <BootstrapTable striped hover condensed
          keyField='TaskID'
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
              setRowId(row.TaskID);
              console.log(rowId);
              updateData(row.TaskID, result, column);
              setRowData(row);
              // return {async:true}
            },
            // beforeSaveCell: (oldValue, newValue, row, column) => { 
            //   // console.log('beforeSave',oldValue);
            //   // console.log('beforeSave',newValue);
            //   // console.log('beforeSave',row);
            //   // console.log('beforeSave',column);
            //   setValue(newValue);
            //   setRowId(row.TaskID);
            //   console.log(rowId);
            //   updateData(row.TaskID, result);
            //   setRowData(row);
            // },
          })}
  
  
        // selectRow={selectRow}
        />
  
        {/* <SmallExample/>
        <DynamicTable/>
        <NewApp/>
  
        <Table2/> */}
  
        {/* <EditableTable /> */}
  
        {/* <Editable2/> */}
  
        {/* <Example /> */}
        {/* <BasicForm/> */}
        {/* <Navbar/> */}

        
      </div>
    );
  }
  
  export default Tasks;

