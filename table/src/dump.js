// // import './App.css';
// // import DynamicTable from './DynamicTable';
// // import SmallExample from './newTable';
// // import NewApp from './NewApp';
// // import Table2 from './Table2';

// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import BootstrapTable from 'react-bootstrap-table-next';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import cellEditFactory, { Type } from 'react-bootstrap-table2-editor'
// import EditableTable from './EditableTable';
// import { Button } from 'semantic-ui-react';
// import Editable2 from './Editable2';
// import Example from './OffCanvas';
// import BasicForm from './Form';
// import Navbar from './Navbar';
// import Projects from './Projects';
// import Tasks from './Tasks';
// import TextField from './TextField';

// function App() {
//   // const [data, setData] = useState([]);
//   // console.log("Data length", data.length);
//   // if (data.length>0) console.log("Data id", data[0].SubtaskID);

//   // const [value, setValue] = useState("");
//   // const [rowId, setRowId] = useState();
//   // const [rowData, setRowData] = useState({});
//   // const [column, setColumn] = useState({});

//   // console.log('rowId', rowId);
//   // console.log('value', value);
//   // console.log('Column value', column);
//   // console.log("Updated data row", data[rowId]);
//   // let cell = column.dataField;
//   // console.log('cell', cell);
//   // // if (cell) console.log('Column data', data[rowId][cell]);

//   // useEffect(() => {
//   //   getData();
//   // }, []);
//   // const getData = async () => {
//   //   await axios.get('http://localhost:8078/subtasks')
//   //     .then((res) => {
//   //       console.log(res.data)
//   //       setData(res.data)
//   //     }
//   //     )
//   //     .catch(err => { console.log(err); })
//   // };

//   // const addData = async () => {
//   //   const newData = {
//   //     "Item": "New record",
//   //     "Person": "U10002",
//   //     "Status": null,
//   //     "Date": "2022-11-25T18:30:00.000Z",
//   //     "Description": "Make a footer",
//   //     "TaskID": "T10001",
//   //     "SubtaskID": 30
//   //   }

//   //   await axios.post('http://localhost:8078/subtasks', newData, { headers: { "Content-Type": "application/json" } })
//   //     .then(res => {
//   //       setData([newData, ...data]);
//   //       getData();
//   //     })
//   //     .catch(error => {
//   //       console.log(error);
//   //     })

//   // }


//   // const updateData = async (rowId, result, column) => {
//   //   // data.Item = "Updated";
//   //   console.log("Updated result");
//   //   console.log(result);
//   //   let cell = column.dataField;
//   //   console.log('cell', cell);

//   //   await axios.post("http://localhost:8078/subtasks/update", result, {
//   //     headers: {
//   //       'Content-Type': 'application/json'
//   //     }
//   //   })
//   //     .then(res => {
//   //       console.log("Patch call called");
//   //       console.log("Updated data", data);
//   //       // if (data[rowId] !== result) change(result, rowId, cell);
//   //       data[rowId][cell] = value;
//   //       console.log("Again updated ", data);
//   //       // const updatedData= result.find(e=>{
//   //       //   e.column.dataField === cell ? data[rowId][cell]=result.cell : setData(data);
//   //       //   return data;
//   //       // })
//   //       // console.log("UPDATED DATA", updatedData);
//   //       setValue("");
//   //       setColumn({})
//   //       setRowId();
//   //       setRowData({});
//   //       result = {};
//   //       getData();
//   //     })
//   //     .catch(err => {
//   //       console.log(err);
//   //     })
//   // }
//   // const deleteData= async(id)=>{
//   //   await axios.delete(`http://localhost:8078/subtasks/delete/${id}`)
//   //   .then(res=>{
//   //     getData();
//   //   })
//   //   .catch(err=>{
//   //     console.log(err);
//   //   })
//   // }
//   // // const updateData = async (rowId, result, column) => {

//   // // }

//   // //   componentDidMount() {
//   // //     // Simple POST request with a JSON body using fetch
//   // //     const requestOptions = {
//   // //         method: 'POST',
//   // //         headers: { 'Content-Type': 'application/json' },
//   // //         body: JSON.stringify({ title: 'React POST Request Example' })
//   // //     };
//   // //     fetch('http://localhost:8078/subtasks', requestOptions)
//   // //         .then(response => response.json())
//   // //         .then(data => this.setData([res.data, ...data]));
//   // // }

//   // // const selectRow = {
//   // //   mode: "checkbox"
//   // // }

//   // const count= async()=>{
//   //   await axios.get("http")
//   // }
//   // const columns = [
//   //   {
//   //     dataField: "Item",
//   //     text: "Item",
//   //     sort: false,
//   //     // formatter: (cell,row,rowIndex)=>{
//   //     //   if(cell)
//   //     //   {
//   //     //   console.log(row);
//   //     //   console.log(rowIndex);
//   //     //   }
//   //     // }
//   //   },
//   //   {
//   //     dataField: "Status",
//   //     text: "Status",
//   //     sort: false,
//   //     editor: {
//   //       type: Type.SELECT,
//   //       options: [
//   //         {
//   //           value: "Working On it",
//   //           label: "Working On It"
//   //         },
//   //         {
//   //           value: "Stuck",
//   //           label: "Stuck"
//   //         }
//   //         ,
//   //         {
//   //           value: "Completed",
//   //           label: "Completed"
//   //         }
//   //       ]
//   //     }
//   //   },
//   //   {
//   //     dataField: "Date",
//   //     text: "Date",
//   //     sort: false,
//   //   },
//   //   {
//   //     dataField: "Description",
//   //     text: "Description",
//   //     sort: false,
//   //   },
//   //   {
//   //     dataField: "remove",
//   //     text: "" ,
//   //     editable:false,
//   //     formatter: () => {
//   //       return (
//   //         <button
//   //           className="btn btn-danger btn-xs"
//   //           onClick={() => deleteData()}
//   //         >
//   //           Delete
//   //         </button>
//   //       );
//   //     }
//   //   }
//   // ]

//   // const result = data.find((item) => {
//   //   return item.SubtaskID === rowId
//   // })
//   // console.log('result', result);

//   // const change = (result, rowId, cell) => {
//   //   console.log("Change function called");
//   //   console.log("Change function data:", data[rowId]);
//   //   data[rowId] = result;
//   //   console.log("New Data is: ", data);
//   // }

//   // // const replaceData=data.map((item)=>{
//   // //   if (item.SubtaskID === rowId) { 
//   // //     data[item.SubtaskID]=result;
//   // //   }
//   // // })
//   // // console.log('Replaced Data', replaceData);

//   // // const Edit = async () => {
//   // //   const response = await axios.get("http://localhost:8078/subtasks/check");
//   // //   console.log(response, "Response successful");
//   // // }
//   // // useEffect(() => {
//   // //   Edit();
//   // // }, []);


//   return (
//     <div className="App">
//       {/* <Button className="btn btn-primary" onClick={addData}>Add Data</Button>
//       <BootstrapTable striped hover condensed
//         keyField='SubtaskID'
//         data={data}
//         columns={columns}
//         deleteRow={true}
//         cellEdit={cellEditFactory({
//           mode: "click",
//           blurToSave: true,
          
//           afterSaveCell: (oldValue, newValue, row, column) => {
//             // console.log(oldValue);
//             // console.log(newValue);
//             // console.log(row);
//             console.log(column);
//             setColumn(column);
//             setValue(newValue);
//             setRowId(row.SubtaskID);
//             console.log(rowId);
//             updateData(row.SubtaskID, result, column);
//             setRowData(row);
//             // return {async:true}
//           },
//           // beforeSaveCell: (oldValue, newValue, row, column) => { 
//           //   // console.log('beforeSave',oldValue);
//           //   // console.log('beforeSave',newValue);
//           //   // console.log('beforeSave',row);
//           //   // console.log('beforeSave',column);
//           //   setValue(newValue);
//           //   setRowId(row.SubtaskID);
//           //   console.log(rowId);
//           //   updateData(row.SubtaskID, result);
//           //   setRowData(row);
//           // },
//         })}


//       // selectRow={selectRow}
//       /> */}

//       {/* <SmallExample/>
//       <DynamicTable/>
//       <NewApp/>

//       <Table2/> */}

//       {/* <EditableTable /> */}

//       {/* <Editable2/> */}

//       {/* <Example /> */}
//       {/* <BasicForm/> */}
//       {/* <Navbar/> */}
//       <Projects/>
//       {/* <Tasks/>
//       <TextField/> */}
//     </div>
//   );
// }

// export default App;


// /*
// for(int i=0;i<project.length;i++)
// {
//   < Project Textbox/>
//   for(int j=0;j<arr[i].task_length;j++)
//   {
//     <Tasks/>
//   }
// }
// */