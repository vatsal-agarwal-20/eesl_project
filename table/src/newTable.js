import Table from 'react-bootstrap/Table';
import React, { useState, useRef } from 'react';
import Editable from './Editable';

function SmallExample() {
//     const initialValue = "value";
//   const [, setValue] = useState(initialValue);
//   const handleChange = (value) => {
//     setValue(value);
//   };
const inputRef = useRef();
const [task, setTask] = useState("");
  return (
    <Table className='table' bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Item</th>
          <th>Person</th>
          <th>Status</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td contentEditable="true" suppressContentEditableWarning={true}>Rober</td>
          <td>@cool</td>
        </tr>
        <tr>
          <td>2</td>
          <td contentEditable="true" suppressContentEditableWarning={true}>Jacob</td>
          <td>
          <Editable
      text={task}
      placeholder="Write a task name"
      childRef={inputRef}
      type="input"
    >
      <input
        ref={inputRef}
        type="text"
        name="task"
        placeholder="Write a task name"
        value={task}
        onChange={e => setTask(e.target.value)}
      />
    </Editable>
          </td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td><Editable
      text={task}
      placeholder="Write a task name"
      childRef={inputRef}
      type="input"
    >
      <input
        ref={inputRef}
        type="text"
        name="task"
        placeholder="Write a task name"
        value={task}
        onChange={e => setTask(e.target.value)}
      />
    </Editable></td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default SmallExample;