import 'bootstrap/dist/css/bootstrap.min.css';
import './GenerateForm.css';
import axios from 'axios';
import {useState} from 'react';
import ReactDOM from "react-dom";
import { QRCodeCanvas } from "qrcode.react";


const GenerateForm = () => {

    const [nome, setNome]=useState()
    const [linkedin_url, setLinkedinUrl]=useState()
    const [github_url, setGithubUrl]=useState()
    const [form_resp, setFormResp]=useState()
    const postCard = ()=>{
        const data={"name":nome,"linkedin_url":linkedin_url,"github_url":github_url};
        axios.post("http://127.0.0.1:8000/generate",data)
        .then((response)=> {
            setFormResp(response.data);
        }).catch((error)=>{
            console.log(error);
        }).finally(()=> {
            console.log("API FIM");
          });
      };

    const downloadQRCode = () => {
        // Generate download with use canvas and stream
        const canvas = document.getElementById("qr-gen");
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${form_resp}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };
    return (
        
        <form >
            <div class="title"><h5>QR Code Image Generator</h5></div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Name</span>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} id="nome" name="nome" class="form-control" />
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon2">Linkedin URL</span>
                <input type="text" value={linkedin_url} onChange={(e) => setLinkedinUrl(e.target.value)} class="form-control" id="linkedin_url" name="linkedin_url" />
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon3">Github URL</span>
                <input type="text" value={github_url} onChange={(e) => setGithubUrl(e.target.value)} class="form-control" id="github_url" name="github_url"/>
            </div>
            <div class="d-grid gap-2 col-6 mx-auto">
                <button class="btn btn-outline-primary" onClick={postCard} type="button">Generate Image</button>
            </div>
            {form_resp &&
                <div class="card" id="card-to-qr-code" >
                
                <QRCodeCanvas
                    id="qr-gen"
                    value={form_resp}
                    size={150}
                    level={"H"}
                    includeMargin={true} 
                />
                <p>
                    Click for{" "}
                    <button type="button" onClick={downloadQRCode}>
                        Download QR Code
                    </button>
                </p>
                </div>
            }
        </form>
    );
};
export default GenerateForm;