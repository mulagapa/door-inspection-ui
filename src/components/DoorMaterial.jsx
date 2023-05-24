
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FloatingLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useRef } from 'react';

const DoorMaterial = (props) => {
    const [select, setSelected] = useState(() => "Select Door Material");
    const [update, setUpdate] = useState(true)
    const [optionList, setOptionList] = useState([])
    const materialref = useRef(null);


    const fetchData = () => {
        axios
            .get('http://127.0.0.1:9000/api/lockshop/doormaterial', {
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
            .get('http://127.0.0.1:9000/api/lockshop/doormaterial', {
                params: {
                    "id": props.door_material_id
                }
            })
            .then((response) => {
                const { data } = response;
                if (response.status === 200) {
                    setSelected(data.result.data.material)
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

    const addMaterial = (e) => {
        e.preventDefault()
        let doormaterial = materialref.current.value

        axios.post('http://127.0.0.1:9000/api/lockshop/doormaterial', {
            "material": doormaterial,
        }).then(response => {
            materialref.current.value = "";
            setUpdate(true)
        })

    }

    const handleChange = (event) => {
        setSelected(event.target.value)
        for (let id in optionList) {
            if (optionList[id]["material"] === event.target.value)
                props.handler(optionList[id]["id"])
        }
    }
    useEffect(() => {
        console.log('optionList:', optionList)
    }, [optionList])
    return (
        <>
            <FloatingLabel label="Door Material">
                <Form.Select value={select} onChange={handleChange}>
                    {
                        (optionList !== undefined) ?
                            optionList.map((item) => (
                                <option key={item.id} value={item.material}>
                                    {item.material}
                                </option>
                            )) : <></>
                    }
                </Form.Select>
            </FloatingLabel>
        </>
    );
}

export default DoorMaterial
