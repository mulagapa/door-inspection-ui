
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FloatingLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useRef } from 'react';

const DoorSeal = (props) => {
    const [select, setSelected] = useState(() => "Select Seal");
    const [update, setUpdate] = useState(true)
    const [optionList, setOptionList] = useState([])
    const sealref = useRef(null);


    const fetchData = () => {
        axios
            .get('http://127.0.0.1:9000/api/lockshop/doorseal', {
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
        console.log("props.seal_id ", props.seal_id)
        axios
            .get('http://127.0.0.1:9000/api/lockshop/doorseal', {
                params: {
                    "id": props.seal_id
                }
            })
            .then((response) => {
                const { data } = response;
                if (response.status === 200) {
                    setSelected(data.result.data.type)
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
    }, [props.seal_id])

    const addBuilding = (e) => {
        e.preventDefault()
        let sealName = sealref.current.value

        axios.post('http://127.0.0.1:9000/api/lockshop/doorseal', {
            "type": sealName,
        }).then(response => {
            sealref.current.value = "";
            setUpdate(true)
        })

    }

    const handleChange = (event) => {
        setSelected(event.target.value)
        for (let id in optionList) {
            if (optionList[id]["type"] === event.target.value)
                props.handler(optionList[id]["id"])
        }
    }

    return (
        <>
            <FloatingLabel label="Seal System">
                <Form.Select value={select} onChange={handleChange}>
                    {
                        (optionList !== undefined) ?
                            optionList.map((item) => (
                                <option key={item.id} value={item.type}>
                                    {item.type}
                                </option>
                            )) : <></>
                    }
                </Form.Select>
            </FloatingLabel>
        </>
    );
}

export default DoorSeal
