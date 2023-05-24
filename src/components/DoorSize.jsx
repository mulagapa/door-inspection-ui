
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FloatingLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useRef } from 'react';

const DoorSize = (props) => {
    const [select, setSelected] = useState(() => "Select Door Size");
    const [update, setUpdate] = useState(true)
    const [optionList, setOptionList] = useState([])
    const sizeref = useRef(null);


    const fetchData = () => {
        axios
            .get('http://127.0.0.1:9000/api/lockshop/doorsize', {
            })
            .then((response) => {
                const { data } = response;
                if (response.status === 200) {
                    setOptionList(prev => {
                        return [...data.result.data]
                    }
                    )
                } else {
                    setOptionList(['test'])
                }
            })
            .catch((error) => console.log(error));
    };

    const fetchDataId = () => {
        axios
            .get('http://127.0.0.1:9000/api/lockshop/doorsize', {
                params: {
                    "id": props.size_id
                }
            })
            .then((response) => {
                const { data } = response;
                if (response.status === 200) {
                    setSelected(data.result.data.size)
                } else {
                    setSelected("None")
                }
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        // fetchData();
        fetchDataId();
        if (update === true) {
            fetchData();
            setUpdate(false);
        }
    })

    const addDoorSize = (e) => {
        e.preventDefault()
        let doorsize = sizeref.current.value

        axios.post('http://127.0.0.1:9000/api/lockshop/doorsize', {
            "size": doorsize,
        }).then(response => {
            sizeref.current.value = "";
            setUpdate(true)
        })

    }

    const handleChange = (event) => {
        setSelected(event.target.value)
        for (let id in optionList) {
            if (optionList[id]["size"] === event.target.value)
                props.handler(optionList[id]["id"])
        }
    }
    useEffect(() => {
        console.log('optionList:', optionList)
    }, [optionList])
    return (
        <>
            <FloatingLabel label="Door Size">
                <Form.Select value={select} onChange={handleChange}>
                    {
                        (optionList !== undefined) ?
                            optionList.map((item) => (
                                <option key={item.id} value={item.size}>
                                    {item.size}
                                </option>
                            )) : <></>
                    }
                </Form.Select>
            </FloatingLabel>
        </>
    );
}

export default DoorSize
