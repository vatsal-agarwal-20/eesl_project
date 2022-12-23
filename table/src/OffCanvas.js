import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Controller, useForm } from 'react-hook-form';


function Form1({addData, projID}) {

  const [taskName, setTaskName]=useState("")
  const [status, setStatus]= useState("None")
  const [assignedTo, setAssignedTo]= useState(0)
  const [startDate, setStartDate]= useState()
  const [dueDate, setDueDate]= useState()

  console.log("taskname", taskName);
  const {control, handleSubmit}= useForm({
    defaultValues:{
      taskName:"",
      Status:"None",
      AssignedTo: 0,
      StartDate: "2022-01-01",
      DueDate: "2022-12-31"
    }
  });
  
  const formSubmit=(e)=>{
    e.preventDefault();
    
    const newData = {
      "TaskName": taskName,
        "AssignedTo": assignedTo,
        "Status": status,
        "StartDate": startDate,
        "DueDate": dueDate,
        "ProjectID": projID,
        "TaskID": 0,
        "isActive": 1
    }

    addData(newData);
    console.log("Form new data", newData);
    // console.log(data);
    // const {taskName,Status,AssignedTo,StartDate,DueDate}=data;
    // const newData = {
    //   "TaskName": taskName,
    //     "AssignedTo": AssignedTo,
    //     "Status": Status,
    //     "StartDate": StartDate,
    //     "DueDate": DueDate,
    //     "ProjectID": 1,
    //     "TaskID": 0
    // }
    // console.log("Working");
  }

  return (
    <Form onSubmit={(e)=>(formSubmit(e))}>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Task Name</Form.Label>
        {/* <Controller
        name="taskName"
        value={taskName}
        
        control={control}
        rules={{required:true}}
        render = {({field})=>(
          <Form.Control type="text" {...field} placeholder="Enter task" onChange={(e)=>setTaskName(e.target.value)}/>
        )}
        /> */}
            <br/>  <input style={{"width":"80%", "height":"30px","borderColor":"#DADBDB"}} className="form-element" type="text" onChange={(e)=>setTaskName(e.target.value)} value={taskName}/>
      </Form.Group>
      {/* <label>Task Name</label> */}

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Status</Form.Label>
        {/* <Controller
        name="Status"
        value={status}
        onChange={(e)=>setStatus(e.target.value)}
        control={control}
        rules={{required:true}}
        render = {({field})=>(
          <FloatingLabel controlId="floatingSelect" {...field} label="What's the Status ? " >
          <Form.Select aria-label="Floating label select example">
            <option value="1">Working On It</option>
            <option value="2">Stuck</option>
            <option value="3">Completed</option>
          </Form.Select>
        </FloatingLabel>
    
          )}
        /> */}
        <br/>
        <select style={{"width":"80%", "height":"30px","borderColor":"#DADBDB"}} onChange={(e)=>setStatus(e.target.value)}>
        <option value="None">None</option>
        <option value="Working On It">Working On It</option>
        <option value="Stuck">Stuck</option>
        <option value="Completed">Completed</option>
        </select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Assigned To</Form.Label>
        {/* <Controller
        name="AssignedTo"
        value={assignedTo}
        onChange={(e)=>setAssignedTo(e.target.value)}
        control={control}
        rules={{required:true}}
        render = {({field})=>(
          <Form.Control type="number" {...field} placeholder="Assigned To.." />
        )}
        /> */}
        <br/>
                      <input style={{"width":"80%", "height":"30px","borderColor":"#DADBDB"}} className="form-element" type="number" onChange={(e)=>setAssignedTo(e.target.value)}
                       value={assignedTo}/>
        
      </Form.Group>

      <Form.Group className="mb-3"  controlId="formBasicDatePicker">
      <Form.Label>Start Date</Form.Label>
      {/* <Controller
        name="StartDate"
        control={control}
        rules={{required:true}}
        render = {({field})=>(
          <input type="date" {...field} className="form-control" name="date-field" />
          )}
        /> */}
                  <input type="date" className="form-control form-element"  value={startDate}
                  onChange={(e)=>setStartDate(e.target.value)} />
      {/* <input class="form-control" id="date" name="date" placeholder="MM/DD/YYY" /> */}
      </Form.Group>
      <Form.Group className="mb-3"  controlId="formBasicDatePicker">
      <Form.Label>Due Date</Form.Label>
      {/* <Controller
        name="DueDate"
        control={control}
        rules={{required:true}}
        render = {({field})=>(
          <input type="date" {...field} className="form-control" name="date-field" />
          )}
        /> */}
                          <input type="date" className="form-control form-element" value={dueDate}
                  onChange={(e)=>setDueDate(e.target.value)} />
      {/* <input class="form-control" id="date" name="date" placeholder="MM/DD/YYY" /> */}
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}


function OffCanvasExample({ name,addData,projID, ...props  }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="success" onClick={handleShow} className="btn btn-md" style={{"width":"100%", "height":"35px", "padding":"0"}}>
        Add Task
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Enter New Task Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form1 addData={addData}/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function Example({addData, projID}) {
  return (
    <>
      
        <OffCanvasExample placement={'end'} addData={addData}/>
      
    </>
  );
}

export default Example;