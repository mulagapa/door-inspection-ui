
import { useEffect, useState } from 'react';
import { FloatingLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'

const DoorMullion = (props) => {
    const [select, setSelected] = useState(() => "Select Door Mullion");
    const [optionList, setOptionList] = useState([])

    const handleChange = (event) => {
        console.log("Atrributes value : ", event.target.value)
        var value_to_be_set = false
        if(event.target.value === "true"){
            value_to_be_set = true
        }else{
            value_to_be_set = false
        }
        setSelected (value_to_be_set)
        props.handler (value_to_be_set)
    }
    useEffect(() => {
        setOptionList([{
            'key':false,
            'val':'NA'
        },{
            'key':true,
            'val':'Yes'
        }])
        setSelected(props.mullion)
    }, [props.mullion])

    useEffect(() => {
        console.log('optionList:', optionList)
    }, [optionList])
    return (
        <>
            <FloatingLabel label="Mullion">
                <Form.Select value={select} onChange={handleChange}>
                    {
                    (optionList !== undefined) ?
                        optionList.map((item) => (
                            <option key={item.key} value={item.key}>
                                {item.val}
                            </option>
                        )):<></>
                    }
                </Form.Select>
            </FloatingLabel>
        </>
    );
}

export default DoorMullion
