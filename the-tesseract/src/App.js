import logo from './logo.svg';
import './App.css';
import Tesseract from 'tesseract.js';
import { useDropzone} from 'react-dropzone';
import { useState } from 'react';

function App() {    
    const [cardInfo, setCardInfo] = useState(null);
    const { getRootProps, getInputProps, open } = useDropzone({
        accept: "image/*",
        onDrop: (file) => {
            const reader = new FileReader();
            Tesseract.recognize(file[0], 'eng', { logger: m => console.log(m) })
                .catch(err => console.error(err))
                .then(({ data: { text } }) => {
                    console.log(text);
                    setCardInfo(text);
                })
        }
      });


    return (
        <div className="App">
        <header className="App-header">
            <div
                {...getRootProps({ className: "dropzone" })}
                onClick={(e) => e.stopPropagation}
            >
                <div>
                <p>Tesseract POC</p>
                <br/>
                <button type="button" onClick={open}>
                    Open File Dialog
                </button>
                </div>
                {cardInfo && <CardDetails cardInfo={cardInfo} />}
            </div>
        </header>
        </div>
    );
}

function CardDetails(props) { 
    const {cardInfo} = props;
    return (<>
        {cardInfo.split("\n").map(item => <p>{item}</p>)}
    </>)
}

export default App;
