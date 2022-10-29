
import { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useRef } from 'react';

const DoorTransom = (props) => {
    const [select, setSelected] = useState(() => "Select transom");
    const [update, setUpdate] = useState(true)
    const [optionList, setOptionList] = useState([])
    const transomref = useRef(null);


    const fetchData = () => {
        axios
            .get('http://127.0.0.1:8000/api/lockshop/doortransom', {
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
        .get('http://127.0.0.1:8000/api/lockshop/doortransom', {
            params: {
                "id": props.transom_id
            }
        })
        .then((response) => {
            const { data } = response;
            if (response.status === 200) {
                setSelected (data.result.data.material)
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
    }, [update])

    const addBuilding = (e) => {
        e.preventDefault()
        let transommaterial = transomref.current.value
        
        axios.post('http://127.0.0.1:8000/api/lockshop/doortransom', {
            "material": transommaterial,
        }).then(response => {
            transomref.current.value = "";
            setUpdate(true)
        })

    }

    const handleChange = (bId) => {

        // if (floor === true) {
        //props.setFloorActive(bId)
        // setFloor(false)
        // setFloor(false)
        // }

    }
    useEffect(() => {
        //console.log('optionList:', optionList)
    }, [optionList])
    return (
        <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic"  >
                {select}
            </Dropdown.Toggle>
            <Dropdown.Menu
                disabled={false}
            >
                {
                    (optionList !== undefined) ?
                        optionList.map((item) => (
                            <Dropdown.Item key={item.id} value={item.material} onClick={(e) => {
                                setSelected(item.material)
                                // setFloor(true)
                                handleChange(item.id)
                            }} >
                                {item.material}
                            </Dropdown.Item>
                        ))
                        :
                        <></>
                }
                <Dropdown.Divider />
                <Form>
                </Form>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default DoorTransom
