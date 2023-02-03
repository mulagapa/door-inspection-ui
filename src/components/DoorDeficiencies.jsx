
import { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button, FloatingLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useRef } from 'react';

const DoorDeficiencies = (props) => {
    const [select, setSelected] = useState(() => "Select Deficiency");
    const [update, setUpdate] = useState(true)
    const [optionList, setOptionList] = useState([])
    const Deficienciesref = useRef(null);


    const fetchData = () => {
        axios
            .get('http://127.0.0.1:5000/api/lockshop/doordeficiencies', {
            })
            .then((response) => {
                const { data } = response;
                console.log('data is : ',data);
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

    // fetchData();

    const fetchDataId = () => {
        console.log('fetchdata has been called here.')
        axios
        .get('http://127.0.0.1:5000/api/lockshop/doordeficiencies', {
            params: {
                "id": props.deficiencies_id
            }
        })
        .then((response) => {
            const { data } = response;
            if (response.status === 200) {
                setSelected (data.result.data.type)
            } else {
                setSelected ("None")
            }
        })
        .catch((error) => console.log(error));
    };

    useEffect(() => {
        // fetchData();
        // fetchData ();
        if (update === true) {
            fetchData();
            setUpdate(false);
        }
    })

    const addBuilding = (e) => {
        e.preventDefault()
        let DeficienciesName = Deficienciesref.current.value
        
        axios.post('http://127.0.0.1:5000/api/lockshop/doordeficiencies', {
            "type": DeficienciesName,
        }).then(response => {
            Deficienciesref.current.value = "";
            setUpdate(true)
        })

    }

    const handleChange = (event) => {
        setSelected (event.target.value)
        for (let id in optionList) {
            if (optionList[id]["type"] === event.target.value)
                props.handler (optionList[id]["id"])
        }
    }

    
    return (
        <>
            {/* <button onClick={addDeficiency}>Add Deficiency</button> */}
            <FloatingLabel label="Deficiencies">
                <Form.Select value={select} onChange={handleChange}>
                    {
                    (optionList !== undefined) ?
                        optionList.map((item) => (
                            <option key={item.id} value={item.description}>
                                {item.description}
                            </option>
                        )):<></>
                    }
                </Form.Select>
            </FloatingLabel>
        </>
    );
}

export default DoorDeficiencies
