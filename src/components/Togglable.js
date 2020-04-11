import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

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

    Togglable.propTypes = {
        btnlabel :PropTypes.string.isRequired
    }

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