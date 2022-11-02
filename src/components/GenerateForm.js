import 'bootstrap/dist/css/bootstrap.min.css';
import './GenerateForm.css';
import axios from 'axios';
import {useState} from 'react';
import { QRCodeCanvas } from "qrcode.react";


const GenerateForm = () => {

    // create importants enveriments
    const [nome, setNome]=useState()
    const [linkedin_url, setLinkedinUrl]=useState()
    const [github_url, setGithubUrl]=useState()
    const [form_resp, setFormResp]=useState()
    const [loading, setLoading]=useState()
    const [validForm=true, setValidForm]=useState()
    var validate_repository=true;
    const [sms_error, setSmsError]=useState()
    //
    // Post Method 
    const postCard = ()=>{
        
        if(validate()){
            //Past form in Json format
            const data={"name":nome,"linkedin_url":linkedin_url,"github_url":github_url};
            // Begin loading
            setLoading(1)
            // Set Response to null
            setFormResp(null)
            // Send Data 
            axios.post("http://127.0.0.1:8000/generate",data)
            .then((response)=> {
                cleanForm()
                setFormResp(response.data);
            }).catch((error)=>{
                console.log(error);
            }).finally(()=> {
                console.log("API FIM");
            });
        }
        
      };
    const cleanForm = ()=>{
        setNome("")
        setLinkedinUrl("")
        setGithubUrl("")
        setLoading(0);
    }
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
    const validate=()=>{
        // validate null value
        VerifyIsNull("nome") 
        VerifyIsNull("linkedin_url") 
        VerifyIsNull("github_url")  
        // validate url format
        validURL("linkedin_url") 
        validURL("github_url")  
        setValidForm(validate_repository)
        return validate_repository  
    }
    
    const VerifyIsNull=(name_element)=>{
       const element=document.getElementById("form")[name_element]
        if(element.value===""||element.value===null){
            validate_repository=false;
            setSmsError("Error: "+element.getAttribute("label")+" can`t be null")
            return false
        }
    }
    function validURL(name_element) {
        const element=document.getElementById("form")[name_element]
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        
        if(!pattern.test(element.value)){
            validate_repository=false;
            setSmsError("Error: "+element.getAttribute("label")+" is not a valid URL format")
            return false
        }
      }
    return (
        
        <form id="form">
            <div class="title"><h5>QR Code Image Generator</h5></div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Name</span>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} id="nome" label="Nome" name="nome" class="form-control" />
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon2">Linkedin URL</span>
                <input type="text" value={linkedin_url} onChange={(e) => setLinkedinUrl(e.target.value)} class="form-control" label="Linkedin URL" id="linkedin_url" name="linkedin_url" />
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon3">Github URL</span>
                <input type="text" value={github_url} onChange={(e) => setGithubUrl(e.target.value)} class="form-control" label="Github URL" id="github_url" name="github_url"/>
            </div>
            <div class="d-grid gap-2 col-6 mx-auto ">
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
            {loading===1 &&
                <div class="col-md-3" id="card-to-qr-code" >
                    <img src={require('../img/loddin-qrcode.gif')} width={150} alt='loading'/>
                    <sm>Please wait...</sm>
                </div>
                
            }
            {validForm===false &&
              <div class="col-md-12" >
                <br></br>{validForm}
                <div class="alert alert-danger" role="alert">
                    {sms_error}
                </div>
              </div>  
                
            }
            
        </form>
    );
};
export default GenerateForm;