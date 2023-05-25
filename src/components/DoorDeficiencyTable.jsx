
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button, FloatingLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useRef } from 'react';
import { autocompleteClasses } from '@mui/material';

const DoorDeficienciesTable = (props) => {
    const [selectDeficiency, setSelecteDeficiency] = useState(1);
    const [update, setUpdate] = useState(true)
    const [optionList, setOptionList] = useState([])
    const [optionDeficiencyList, setOptionDeficiencyList] = useState([])
    const Deficienciesref = useRef(null);
    const tableRef = useRef(null);

    const tableStyle = {
        table: {
            borderCollapse: 'collapse',
            width: '100%',
            marginTop: '20px',
            border: '1px solid black',
        },

        th: {
            textAlign: 'center',
            padding: '8px',
            backgroundColor: '#555',
            color: 'white',
            border: '1px solid black',
        },

        td: {
            textAlign: 'center',
            padding: '8px',
            backgroundColor: 'white',
            border: '1px solid black',
        },

        'tr:nth-child(even)': {
            backgroundColor: '#f2f2f2',
        },
    };


    const fetchDeficiencyData = () => {
        axios
            .get('http://127.0.0.1:9000/api/lockshop/doordeficiencies', {
            })
            .then((response) => {
                const { data } = response;
                console.log('data is : ', data);
                if (response.status === 200) {
                    setOptionDeficiencyList(data.result.data)
                } else {
                    setOptionDeficiencyList([])
                }
            })
            .catch((error) => console.log(error));
    };

    const fetchDataId = () => {
        console.log('fetch door deficiency map has been called here : door_no = ', props.door_no)
        axios
            .get('http://127.0.0.1:9000/api/lockshop/doordeficiencymap', {
                params: {
                    "door_no": props.door_no
                }
            })
            .then((response) => {
                const { data } = response;
                if (response.status === 200) {
                    setOptionList(data.result.data)
                } else {
                    setOptionList([])
                }
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        setUpdate(true);
    }, [props])

    useEffect(() => {
        console.log('It is getting called when door is updated\n');
        if (update === true) {
            fetchDeficiencyData();
            fetchDataId();
            setUpdate(false);
        }
    }, [update])

    useEffect(() => {
        if (tableRef.current) {
            tableRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [optionList]);



    function removeDeficiency(id) {
        axios
            .delete('http://127.0.0.1:9000/api/lockshop/doordeficiencymap', {
                params: {
                    "id": id
                }
            }).then((response) => {
                console.log('error successfully removed.')
                fetchDataId();
            })
            .catch((error) => console.log(error));
    }

    const handleAddDeficiency = (event) => {
        event.preventDefault();
        console.log('chosen deficiency to add :', selectDeficiency);
        console.log('door number is :', props.door_no)
        axios.post('http://127.0.0.1:9000/api/lockshop/doordeficiencymap', {
            params: {
                "door_no": props.door_no,
                "deficiency_id": selectDeficiency
            }
        }).then((response) => {
            console.log('Deficiency added successfully');
            fetchDataId();
        })
            .catch((error) => {
                console.log('Deficiency could not be added', error);
                alert('Deficiency could not be added!');
            })
    }

    return (
        <>
            <div className="container">

                <form onSubmit={handleAddDeficiency}>
                    <select value={selectDeficiency} onChange={(event) => setSelecteDeficiency(event.target.value)}>
                        {
                            (optionDeficiencyList !== undefined) ?
                                optionDeficiencyList.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.description}
                                    </option>
                                )) : <></>
                        }
                    </select>
                    <button type="submit" style={{ marginLeft: '20px' }}>Add Deficiency</button>
                </form>

                {
                    optionList.length > 0 ? (
                        <table style={tableStyle.table} ref={tableRef}>
                            <thead>
                                <tr>
                                    <th style={tableStyle.th}>Index</th>
                                    <th style={tableStyle.th}>Deficiency Description</th>
                                    <th style={tableStyle.th}>Deficiency Type</th>
                                    <th style={tableStyle.th}> Action </th>
                                </tr>
                            </thead>
                            <tbody>
                                {optionList.map((row, index) => (
                                    <tr>
                                        <td style={tableStyle.td}>{index + 1}</td>
                                        <td style={tableStyle.td}>{row['deficiency_description']}</td>
                                        <td style={tableStyle.td}>{row['deficiency_type']}</td>
                                        <td style={tableStyle.td}><button onClick={() => removeDeficiency(row['id'])}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                        : null
                }
            </div>
        </>
    );

}

export default DoorDeficienciesTable
