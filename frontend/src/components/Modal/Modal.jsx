import modalClasses from './Modal.module.css'
import { useState } from 'react';

const Modal = props => {
    const okayButtonHandler = event => {
        props.onClose();
    }
    
    const backDropClickHandler = event => {
        props.onClose();
    }

    return (
        <div onClick={backDropClickHandler} className={modalClasses['modal-backdrop']} style={{display: `${props.show}`}}>
            <div>
                <div className={modalClasses.header}>
                    <h2>{props.title}</h2>
                </div>
                <hr />
                <div className={modalClasses.content}>
                    <p>
                        {props.content}
                    </p>
                </div>
                <hr />
                <div className={modalClasses.footer}>
                    <button onClick={okayButtonHandler}>Okay</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;