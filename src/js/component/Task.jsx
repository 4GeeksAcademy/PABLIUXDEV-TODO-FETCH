import React, {useState, useEffect} from 'react'



const Task = (props) => {
    const [isHovered, setIsHovered] = useState(false)
    return (
    <div className="d-flex border p bg-light text-dark justify-content-between"
        onMouseEnter={()=> {
            setIsHovered(true);
        }}
        onMouseLeave={()=>{
            setIsHovered(false)
        }}>

        <p className='mx-2'>{props.task}</p>
        {(isHovered) && <span className='mx-2' onClick={()=>{
                props.onRemove()
        }}>X</span>}
        
    </div>
    )
}

export default Task;