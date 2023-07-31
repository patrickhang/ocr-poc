import logo from './logo.svg';
import './App.css';
import Tesseract from 'tesseract.js';
import { useDropzone} from 'react-dropzone';

function App() {    
    const { getRootProps, getInputProps, open } = useDropzone({
        accept: "image/*",
        onDrop: (file) => {
            const reader = new FileReader();
            console.log(file[0].path);
            Tesseract.recognize(file[0], 'eng', { logger: m => console.log(m) })
                .catch(err => console.error(err))
                .then(({ data: { text } }) => {
                    console.log(text);
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
            </div>
        </header>
        </div>
    );
}

export default App;
