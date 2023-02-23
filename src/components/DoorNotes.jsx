
import { useEffect, useState } from 'react';
import { FloatingLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'

const DoorNotes = (props) => {
    const [text, setText] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleEditButtonClick = () => {
        setIsEditing(true);
    };
    const handleSaveButtonClick = () => {
        setIsEditing(false);
        props.handler (text)
    };

    useEffect(() => {
        setText(props.notes)
    }, [props.notes])

    return (
        <div style={{ 
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            width: '400px',
            margin: 'auto'
          }}>
            <div style={{ 
              width: '400px',
              padding: '20px',
              borderRadius: '20',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
              textAlign: 'center'
            }}>
              
                {isEditing ? (
                  <div>
                    <h2>Notes</h2>
                    <input type="text" 
                    style={{
                        width: '100%',
                        height: '100%',
                        marginBottom: '5%',
                        paddingBottom: '5%'
                    }}
                    value={text} onChange={handleTextChange} />
                    <button onClick={handleSaveButtonClick}>Save</button>
                  </div>
                ) : (
                  <div>
                    <h2>Notes</h2>
                    <p>{text}</p>
                    <button onClick={handleEditButtonClick}>Edit</button>
                  </div>
                )}
            </div>
          </div>
    );
}

export default DoorNotes
