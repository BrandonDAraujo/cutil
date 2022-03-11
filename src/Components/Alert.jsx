import React, {useState, useEffect, useRef} from 'react'
import '../css/alert.css'
import {Transition} from 'react-transition-group'

function Alert({
    duration = 5500,
    alert
}) {
    const nodeRef = useRef(null)
    const [isActive, setIsActive] = useState(false)
    const defaultStyle = {
        transition: `all ${duration/10}ms ease-in-out`,
        transform: "translateY(-50%)",
        opacity: 0,
      }
      
      const transitionStyles = {
        entering: { opacity: 1, transform: "translateY(0)"},
        entered:  { opacity: 1},
        exiting:  { opacity: 0 },
        exited:  { opacity: 0 },
      };

    useEffect(() =>{
        if(alert.message){
            setIsActive(true)
            setTimeout(() => {
                setIsActive(false)
            }, duration);
        }
    }, [alert, duration])
    return (
        <Transition nodeRef={nodeRef} in={isActive} timeout={duration}>
        {state => (
          <div ref={nodeRef} className="alert" style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}>
            {alert.message}
          </div>
        )}
      </Transition>
    )
}

export default Alert