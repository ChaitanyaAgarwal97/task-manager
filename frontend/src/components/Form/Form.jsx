import { useRef } from 'react';
import formClasses from './Form.module.css'

import Button from "../UI/Button"

const Form = props => {
    const titleRef = useRef();
    const descRef = useRef();

    const submitEventHandler = (event) => {
        event.preventDefault();

        const title = titleRef.current.value;
        const desc = descRef.current.value;

        props.onSubmit(title, desc);

        titleRef.current.value = '';
        descRef.current.value = '';
    }

    return (
        <form>
            <label htmlFor="title">Title</label>
            <input type="text" name='title' id='title' ref={titleRef}/>
            
            <label htmlFor="desc">Description</label>
            <textarea name='desc' rows={5} id='desc' ref={descRef}/>

            <Button type="submit" onClick={submitEventHandler}>Add</Button>
        </form>
    )
}

export default Form;