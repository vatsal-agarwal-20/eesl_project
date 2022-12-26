import axios from 'axios';
import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor'
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { Button } from 'react-bootstrap';
import Example from './OffCanvas';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';
import moment from 'moment';

function Tasks(props) {


  // console.log("props data");
  // console.log(props.projectId);
  // console.log(props.taskData);
  const [data, setData] = useState([]);
  // let dataLength = data.length
  // if (dataLength>0) console.log("Data id", data[0].TaskID);

  // const [value, setValue] = useState("");
  // const [rowId, setRowId] = useState();
  // const [rowData, setRowData] = useState({});
  // const [column, setColumn] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [deleteRow, setDeleteRow] = useState({});
  // const [deleteRow, setDeleteRow]= useState({})

  // console.log('rowId', rowId);
  // console.log('value', value);
  // console.log('Column value', column);
  // console.log("Updated data row", data[rowId]);
  // let cell = column.dataField;
  // console.log('cell', cell);
  // if (cell) console.log('Column data', data[rowId][cell]);

  useEffect(() => {
    getData(props.projectId);
  }, []);

  const getData = async (id) => {
    // const filterData= data.filter(rowElement => rowElement.ProjectID === props.projectId)

    // console.log('filteredData', filterData);
    // console.log("get call id");
    // console.log(id);
    // console.log("get call props id");
    // console.log(props.projectId);

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
    newData["ProjectID"] = props.projectId;

    // console.log("Add Data value");
    // console.log(newData);

    await axios.post('http://localhost:8078/tasks', newData, { headers: { "Content-Type": "application/json" } })
      .then(res => {
        setData([newData, ...data]);
        getData(newData.ProjectID);
      })
      .catch(error => {
        console.log(error);
      })

  }


  const updateData = async (rowId, column, newValue) => {
    let result = data.find((item) => {
      return item.TaskID === rowId
    })
    // data.Item = "Updated";
    // console.log("Updated result");
    // console.log(result);
    let cell = column.dataField;
    // console.log('cell', cell);
    // console.log(typeof cell);
    result[cell] = newValue;
    // console.log("again updated result");
    // console.log(result);

    await axios.post("http://localhost:8078/tasks/update", result, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        // console.log("Patch call called");
        // console.log("Updated data", data);
        // if (data[rowId] !== result) change(result, rowId, cell);
        // data[rowId][cell] = value;
        // console.log("Again updated ", data);
        // const updatedData= result.find(e=>{
        //   e.column.dataField === cell ? data[rowId][cell]=result.cell : setData(data);
        //   return data;
        // })
        // console.log("UPDATED DATA", updatedData);
        
        getData(result.ProjectID);
        // setValue("");
        // setColumn({})
        // setRowId();
        // setRowData({});
        // result = {};
      })
      .catch(err => {
        console.log(err);
        if (err.message === 'Request failed with status code 500') {
          alert("Invalid value");
        }
      })
  }
  const deleteData = async (e, deleteRowData) => {

    e.preventDefault();
    // console.log("Delete data called");
    // console.log(deleteRowData);
    const delID = {
      "TaskID": deleteRowData.TaskID
    }
    await axios.post("http://localhost:8078/tasks/delete", delID)
      .then(res => {
        setModalShow(false);
        setDeleteRow({});
        getData(deleteRowData.ProjectID);
      })
      .catch(err => {
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
  // const getStatus = async (id) => {
  //   // const filterData= data.filter(rowElement => rowElement.ProjectID === props.projectId)

  //   // console.log('filteredData', filterData);
  //   await axios.get(`http://localhost:8078/tasks/status/${id}`)
  //     .then((res) => {
  //       console.log("Status data");
  //       console.log(res.data)
  //       // setData(res.data)
  //     }
  //     )
  //     .catch(err => { console.log(err); })
  // };

  // const checkProgress=(data)=>{
  //   let c=0;
  //   data.map((item) => item["Status"] === 'Completed' ? c + 100 : c+0);
  // }

  // const percentageReturn = (data,length) =>{
  //   return checkProgress(data)/length;
  //   // console.log(checkProgress(data));
  // }

  const columns = [
    {
      dataField: "TaskName",
      text: "Task Name",
      sort: false,
      footer: '',
      // filter: textFilter(),

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
      footer: (cell) => {
        // const now= percentageReturn(data,data.length);
        // const now=60;

        // console.log("footer return");
        // console.log(data);
        // console.log(data.length);
        // return getStatus(rowData.ProjectID);
        // console.log("cell");
        // console.log(cell);
        let count = 0;
        for (const item of cell) {
          if (item === "Completed") count++;
        }
        let now = Math.round((count * 100) / data.length);
        // console.log("now value");
        // console.log(now);
        if (isNaN(now)) now = 0;
        return <ProgressBar animated variant='success' now={now} label={`${now}%`} />;
      },
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
      },

    },
    {
      dataField: "AssignedTo",
      text: "Assigned To",
      type: "number",
      sort: false,
    },
    {
      dataField: "StartDate",
      text: "Start Date",
      type: "date",
      csvType: { Date },
      formatter: (cell) => {
        // console.log("Date cell");
        // console.log(typeof cell);
        // let dateObj = new Date(cell);
        // console.log("date object change");
        // console.log(dateObj);
        // let ISToffSet = 330; //IST is 5:30; i.e. 60*5+30 = 330 in minutes 
        // let offset= ISToffSet*60*1000;
        // let ISTTime = new Date(dateObj.getTime()+offset);
        // if (typeof cell !== 'object') {
        //   dateObj = new Date(cell);

        // }
        // console.log("returned date in frontend");
        // console.log(`${('0' + ISTTime.getDate()).slice(-2)}/${('0' + (ISTTime.getMonth() + 1)).slice(-2)}/${ISTTime.getFullYear()}`);
        let m = moment();
        m = moment(cell).format('DD/MMM/YYYY');
        // console.log("moment date");
        // console.log(m);
        return m;
      },

      // editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
      //   console.log("editorRenderer value"),
      //   console.log(value),
      //   console.log(editorProps),
      //   console.log(rowIndex),
      //   console.log(columnIndex),
      //   <QualityRanger value={ value } />
      // ),

      editor: {
        type: Type.DATE
      },
      // formatter: (cell) => {
      //   let dateObj = cell;
      //   if (typeof cell !== 'object') {
      //     dateObj = new Date(cell);
      //   }
      //   if (cell == null) {
      //     return
      //   }
      //   return `${('0' + dateObj.getDate()).slice(-2)}/${('0' + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()}`;
      // },
      sort: false,
    },
    {
      dataField: "DueDate",
      text: "Due Date",
      type: "date",
      csvType: { Date },
      formatter: (cell) => {
        let m = moment();
        m = moment(cell).format('DD/MMM/YYYY');
        // console.log("moment date");
        // console.log(m);
        return m;
        // let dateObj = cell;
        // if (typeof cell !== 'object') {
        //   dateObj = new Date(cell);
        // }
        // if (cell == null) {
        //   return
        // }
        // return `${('0' + dateObj.getDate()).slice(-2)}/${('0' + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()}`;
      },

      editor: {
        type: Type.DATE
      },
      sort: false,
    },
    {
      dataField: "remove",
      isDummyField: true,
      text: "Delete",
      csvExport: false,
      searchable: false,
      headerFormatter: () => {
        return <Example addData={addData} projID={props.projectId} />
      },
      editable: false,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {

          // StaticModal();
          setModalShow(true);
          setDeleteRow(row);
          // deleteData(row);
          // console.log("Delete button onClick");
          // console.log(e);
          // console.log(column);
          // console.log(columnIndex);
          // console.log(row);
          // console.log(rowIndex);
        }
      },
      headerStyle: () => {
        return { width: '8%' }
      },
      // style: {backgroundColor: '#d9534f'},
      formatter: () => {
        return (
          <button
            className="btn btn-xs"
            // onClick={(e)=>deleteData(e)} // () => deleteData()
            style={{
              "width": "100%", "height": "30px", "padding": "0", "backgroundColor": '#d9534f',
              "outline": "none"
            }}
          >
            Delete
          </button>
        );
      }
    }
  ]

  // const showModal = (e) => {
  //   e.preventDefault();
  //   return <StaticModal />
  // }

  // const result = data.find((item) => {
  //   return item.TaskID === rowId
  // })
  // console.log('result', result);

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
  const MyExportCSV = (props) => {
    const handleClick = () => {
      props.onExport();
    };
    return (
      <div>
        <button className="btn btn-success" onClick={handleClick}>Click me to export CSV</button>
      </div>
    );
  };
  const { SearchBar, ClearSearchButton } = Search;
  // const { ExportCSVButton } = CSVExport;

  return (
    <div className="App">
      {/* <Button className="btn btn-primary" >Add Data</Button> */}
      <ToolkitProvider
        keyField="TaskID"
        data={data}
        columns={columns}
        search
        exportCSV
      >
        {
          props => (
            <div>
              {/* <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton> */}
              <MyExportCSV {...props.csvProps} />
              <br />
              {/* <h3>Input something at below input field:</h3> */}
              <div style={{ display: "flex", flexDirection: "row-reverse", marginRight: "1.5%", padding: '0' }}>
                <ClearSearchButton {...props.searchProps} style={{ padding: "0" }} />
                <SearchBar {...props.searchProps} style={{ width: "100%", marginBottom: "10%" }} />
              </div>
              {/* <br /> */}
              <BootstrapTable {...props.baseProps}
                // filter={filterFactory()}
                // search
                // filterPosition= "bottom"
                pagination={paginationFactory()}

                cellEdit={cellEditFactory({
                  mode: "click",
                  blurToSave: true,

                  afterSaveCell: (oldValue, newValue, row, column) => {
                    // console.log(oldValue);
                    // console.log(newValue);
                    // console.log(row);
                    // console.log("after save column", column);
                    // setColumn(column);
                    // setValue(newValue);
                    // setRowId(row.TaskID);
                    // console.log(newValue);


                    // setRowData(row);
                    updateData(row.TaskID, column, newValue);
                    // return {async:true}
                  },
                  // onStartEdit: (row, column, rowIndex, columnIndex) => {
                  //   // console.log("On start edit values");
                  //   // console.log(row);
                  //   // let dateObj=new Date(row["StartDate"]);
                  //   // let ISToffSet = 330; //IST is 5:30; i.e. 60*5+30 = 330 in minutes 
                  //   // let offset= ISToffSet*60*1000;
                  //   // let ISTTime = new Date(dateObj.getTime()+offset);
                  //   // row["StartDate"]= `${('0' + ISTTime.getDate()).slice(-2)}/${('0' + (ISTTime.getMonth() + 1)).slice(-2)}/${ISTTime.getFullYear()}`;
                  //   // setRowData(row);
                  //   // console.log("New time");
                  //   // console.log(row["StartDate"]);
                  //   // let m = moment(); 
                  //   // let n= moment();
                  //   // m=moment(row["StartDate"]).format('DD/MMM/YYYY');
                  //   // n=moment(row["DueDate"]).format('DD/MMM/YYYY');
                  //   // console.log("moment date");
                  //   // console.log(m);
                  //   // console.log(n);
                  //   // row["StartDate"]=m;
                  //   // row["DueDate"]=n;
                  //   // setRowData(row);

                  //   // console.log(column);
                  //   // console.log(rowIndex);
                  //   // console.log(columnIndex);
                  // }
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
              />
            </div>
          )
        }
      </ToolkitProvider>


      <div className='modal-container'>
        {
          modalShow
            ?
            <div
              className="modal show"
              style={{ display: 'block' }}
            >
              <Modal.Dialog>
                <Modal.Header>
                  <Modal.Title>Confirm Deleting Task</Modal.Title>
                  <button className='btn btn-danger'
                    style={{ width: '20px', height: '20px', padding: '0' }}
                    onClick={() => setModalShow(false)}>X</button>
                </Modal.Header>

                <Modal.Body>
                  <p>Are you sure you want to delete the selected task ?</p>
                </Modal.Body>

                <Modal.Footer>
                  <Button variant="danger" onClick={() => setModalShow(false)}>No</Button>
                  <Button variant="success" onClick={(e) => deleteData(e, deleteRow)}>Yes</Button>
                </Modal.Footer>
              </Modal.Dialog>
            </div>
            : ''
        }
      </div>

      {/* <BootstrapTable striped hover condensed
        keyField='TaskID'
        data={data}
        columns={columns}
        filter={filterFactory()}
        // search
        // filterPosition= "bottom"

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
            updateData(row.TaskID, column);
            setRowData(row);
            // return {async:true}
          },
          onStartEdit: (row, column, rowIndex, columnIndex) => {
            console.log("On start edit values");
            console.log(row);
            console.log(column);
            console.log(rowIndex);
            console.log(columnIndex);
          }
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


    </div>
  );
}

export default Tasks;

