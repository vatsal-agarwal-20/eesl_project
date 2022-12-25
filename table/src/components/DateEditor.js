import React, { useState } from 'react';

function QualityRanger(props) {
    
    // static defaultProps = {
    //   value: "2022-01-01"
    // }
    // getValue() {
    //   return this.range.value;
    // }
    
      const [ value, setValue]  = useState(props.value);
      return (
        console.log("dateeditor value") ,
        console.log(value, typeof value) ,
        <input
          
          key="range"
        //   ref={ node => this.range = node }
          type="date"
          value={value}
          onChange={(e) => setValue(e.target.value) }
        />
        // <button
        //   key="submit"
        //   className="btn btn-default"
        //   onClick={ () => onUpdate(this.getValue()) }
        // >
        //   done
        // </button>
      )
    
  }

  export default QualityRanger