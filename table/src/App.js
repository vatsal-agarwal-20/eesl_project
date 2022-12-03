import './App.css';
import DynamicTable from './DynamicTable';
import SmallExample from './newTable';
import NewApp from './NewApp';
import Table2 from './Table2';

import axios from 'axios';
import { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor'
import EditableTable from './EditableTable';
import { Button } from 'semantic-ui-react';
import Editable2 from './Editable2';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await axios.get('http://localhost:8078/subtasks')
      .then((res) => {
        console.log(res.data)
        setData(res.data)
      }
      )
      .catch(err => { console.log(err); })
  };

  const addData = async () => {
    const newData = {
      "Item": "New record",
      "Person": "U10002",
      "Status": null,
      "Date": "2022-11-25T18:30:00.000Z",
      "Description": "Make a footer",
      "TaskID": "T10001",
      "SubtaskID": 30
    }

    await axios.post('http://localhost:8078/subtasks', newData, { headers: { "Content-Type": "application/json" } })
      .then(res => {
        setData([newData, ...data]);
         getData();
      })
      .catch(error => {
        console.log(error);
      })
    
  }

  const updateData = async(data)=>{
    data.Item = "Updated";
    await axios.patch(`http://localhost:8078/subtasks/update/${data.SubtaskID}`)
    .then(res =>{
      getData();
    })
    .catch(err =>{
      console.log(err);
    })
  }

  //   componentDidMount() {
  //     // Simple POST request with a JSON body using fetch
  //     const requestOptions = {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ title: 'React POST Request Example' })
  //     };
  //     fetch('http://localhost:8078/subtasks', requestOptions)
  //         .then(response => response.json())
  //         .then(data => this.setData([res.data, ...data]));
  // }

  // const selectRow = {
  //   mode: "checkbox"
  // }
  const cellEdit = {
    // omit...
    afterSaveCell: (oldValue, newValue, row, column) => { getData(); }
  };

  const columns = [
    {
      dataField: "Item",
      text: "Item"
    },
    {
      dataField: "Status",
      text: "Status",
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
      dataField: "Date",
      text: "Date"
    },
    {
      dataField: "Description",
      text: "Description"
    }
  ]

  // const Edit = async () => {
  //   const response = await axios.get("http://localhost:8078/subtasks/check");
  //   console.log(response, "Response successful");
  // }
  // useEffect(() => {
  //   Edit();
  // }, []);


  return (
    <div className="App">
      <Button className="btn btn-primary" onClick={addData}>Add Data</Button>
      <BootstrapTable striped hover condensed
        keyField='SubtaskID'
        data={data}
        columns={columns}
        cellEdit={cellEditFactory({
          mode: "click",
          blurToSave: true,
        })}
        
      // selectRow={selectRow}
      />

      {/* <SmallExample/>
      <DynamicTable/>
      <NewApp/>

      <Table2/> */}

      <EditableTable />

      {/* <Editable2/> */}
    </div>
  );
}

export default App;
