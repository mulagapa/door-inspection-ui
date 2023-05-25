
import { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button, FloatingLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useRef } from 'react';

const DoorSweep = (props) => {
    const [select, setSelected] = useState(() => "Select Sweep");
    const [update, setUpdate] = useState(true)
    const [optionList, setOptionList] = useState([])
    const sweeperef = useRef(null);


    const fetchData = () => {
        axios
            .get('http://127.0.0.1:9000/api/lockshop/doorsweep', {
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
            .get('http://127.0.0.1:9000/api/lockshop/doorsweep', {
                params: {
                    "id": props.sweep_id
                }
            })
            .then((response) => {
                const { data } = response;
                if (response.status === 200) {
                    setSelected(data.result.data.name)
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
    }, [props.sweep_id])

    const addBuilding = (e) => {
        e.preventDefault()
        let sweepName = sweeperef.current.value

        axios.post('http://127.0.0.1:9000/api/lockshop/doorsweep', {
            "name": sweepName,
        }).then(response => {
            sweeperef.current.value = "";
            setUpdate(true)
        })

    }

    const handleChange = (event) => {
        setSelected(event.target.value)
        for (let id in optionList) {
            if (optionList[id]["name"] === event.target.value)
                props.handler(optionList[id]["id"])
        }
    }

    return (
        <>
            <FloatingLabel label="Sweep">
                <Form.Select value={select} onChange={handleChange}>
                    {
                        (optionList !== undefined) ?
                            optionList.map((item) => (
                                <option key={item.id} value={item.name}>
                                    {item.name}
                                </option>
                            )) : <></>
                    }
                </Form.Select>
            </FloatingLabel>
        </>
    );
}

export default DoorSweep
