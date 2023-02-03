
import { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button, FloatingLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useRef } from 'react';
import { autocompleteClasses } from '@mui/material';

const DoorDeficienciesTable = (props) => {
    const [select, setSelected] = useState(() => "Select Deficiency Map");
    const [update, setUpdate] = useState(true)
    const [optionList, setOptionList] = useState([])
    const [optionDeficiencyList, setOptionDeficiencyList] = useState([])
    const Deficienciesref = useRef(null);

    const table_style = {
        'border' : '1 px solid white',
        'color' : 'white',
        'margin': 'auto'
    }

    const fetchDeficiencyData = () => {
        axios
            .get('http://127.0.0.1:5000/api/lockshop/doordeficiencies', {
            })
            .then((response) => {
                const { data } = response;
                console.log('data is : ',data);
                if (response.status === 200) {
                    setOptionDeficiencyList (data.result.data)
                } else {
                    setOptionDeficiencyList([])
                }
            })
            .catch((error) => console.log(error));
    };

    const fetchDataId = () => {
        console.log('fetch door deficiency map has been called here : door_no = ', props.door_no)
        axios
        .get('http://127.0.0.1:5000/api/lockshop/doordeficiencymap', {
            params: {
                "door_no": props.door_no
            }
        })
        .then((response) => {
            const { data } = response;
            if (response.status === 200) {
                setOptionList (data.result.data)
            } else {
                setOptionList ([])
            }
        })
        .catch((error) => console.log(error));
    };

    useEffect(() => {
        if (update === true) {
            fetchDeficiencyData();
            fetchDataId();
            setUpdate(false);
        }
    })


    function removeDeficiency(id) {
        axios
        .delete('http://127.0.0.1:5000/api/lockshop/doordeficiencymap', {
            params: {
                "id" : id
            }
        }).then((response) => {
            console.log('error successfully removed.')
            fetchDataId();
        })
        .catch((error) => console.log(error));
    }

    function addNewDeficiency() {
        setOptionList()
    }

    
    return (
        <>
            <div className="container">
                <table style={table_style}>
                    <thead>
                        <tr>
                            <th style={table_style}>index</th>
                            <th style={table_style}>Deficiency Description</th>
                            <th style={table_style}>Deficiency Type</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {optionList.map((row, index) => (
                        <tr>
                            <td style={table_style}>{index}</td>
                            <td style={table_style}>{row['deficiency_description']}</td>
                            <td style={table_style}>{row['deficiency_type']}</td>
                            <td style={table_style}><button onClick={() => removeDeficiency(row['id'])}>Delete</button></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick = {() => {}}>Add Deficiency</button>
                <select value={1}>
                {
                    (optionDeficiencyList !== undefined) ?
                        optionDeficiencyList.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.description}
                            </option>
                        )):<></>
                }
                </select>
            </div>
        </>
    );

}

export default DoorDeficienciesTable
