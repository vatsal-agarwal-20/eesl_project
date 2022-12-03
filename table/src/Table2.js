import React from 'react'

function Table2() {
  return (
    <div className='table2'>
        <table>
            <thead>
            <tr>
                <th>Item</th>
                <th>Person</th>
                <th>Status</th>
                <th>Date</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td contentEditable="true" suppressContentEditableWarning={true}>UI</td>
                <td contentEditable="true" suppressContentEditableWarning={true}>Vatsal</td>
                <td contentEditable="true" suppressContentEditableWarning={true}>Status</td>
                <td contentEditable="true" suppressContentEditableWarning={true}>Date</td>
                <td contentEditable="true" suppressContentEditableWarning={true}>Description</td>
            </tr>
            <tr>
                <td contentEditable="true" suppressContentEditableWarning={true}>Api</td>
                <td contentEditable="true" suppressContentEditableWarning={true}>Ajay</td>
                <td contentEditable="true" suppressContentEditableWarning={true}>Status</td>
                <td contentEditable="true" suppressContentEditableWarning={true}>Date</td>
                <td contentEditable="true" suppressContentEditableWarning={true}>Description</td>
            </tr>
            <tr>
                <td contentEditable="true" suppressContentEditableWarning={true}>Backend</td>
                <td contentEditable="true" suppressContentEditableWarning={true}>Aryan</td>
                <td contentEditable="true" suppressContentEditableWarning={true}>Status</td>
                <td contentEditable="true" suppressContentEditableWarning={true}>Date</td>
                <td contentEditable="true" suppressContentEditableWarning={true}>Description</td>
            </tr>
            </tbody>
        </table>
    </div>
  )
}

export default Table2