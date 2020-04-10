import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
    const [visible,setVisible] = useState(false)

    const showWhenVisible = {display: visible ? '' : 'none' }
    const HideWhenVisible = {display: visible ? 'none' : '' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref,() => {
         return {   toggleVisibility
        }}
    )

    return(
        <div>
            <div style= {HideWhenVisible}>
                <button onClick = {toggleVisibility} >{props.btnlabel}</button>
            </div>
            <div style = {showWhenVisible} >
                {props.children}
                <button onClick={toggleVisibility} >Cancel</button>
            </div>
        </div>
    )
})

export default Togglable