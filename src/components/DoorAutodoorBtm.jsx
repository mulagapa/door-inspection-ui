
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FloatingLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useRef } from 'react';

const DoorAutodoorBottom = (props) => {
    const [select, setSelected] = useState(() => "Select Auto Door Bottom");
    const [update, setUpdate] = useState(true)
    const [optionList, setOptionList] = useState([])
    const autodrbtmeref = useRef(null);


    const fetchData = () => {
        axios
            .get('http://127.0.0.1:5000/api/lockshop/doorautodrbtm', {
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
        .get('http://127.0.0.1:5000/api/lockshop/doorautodrbtm', {
            params: {
                "id": props.auto_dr_btm_id
            }
        })
        .then((response) => {
            const { data } = response;
            if (response.status === 200) {
                setSelected (data.result.data.name)
            } else {
                setSelected ("None")
            }
        })
        .catch((error) => console.log(error));
    };

    useEffect(() => {
        // fetchData();
        fetchDataId ();
        if (update === true) {
            fetchData();
            setUpdate(false);
        }
    }, [props.auto_dr_btm_id])

    const addBuilding = (e) => {
        e.preventDefault()
        let autoDrBtmName = autodrbtmeref.current.value
        
        axios.post('http://127.0.0.1:5000/api/lockshop/doorautodrbtm', {
            "name": autoDrBtmName,
        }).then(response => {
            autodrbtmeref.current.value = "";
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
            <FloatingLabel label="Auto Door Bottom">
                <Form.Select value={select} onChange={handleChange}>
                    {
                    (optionList !== undefined) ?
                        optionList.map((item) => (
                            <option key={item.id} value={item.type}>
                                {item.type}
                            </option>
                        )):<></>
                    }
                </Form.Select>
            </FloatingLabel>
        </>
    );
}

export default DoorAutodoorBottom
