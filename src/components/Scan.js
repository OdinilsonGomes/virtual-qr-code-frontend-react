import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useParams } from "react-router-dom";
import {useState} from 'react';
import './Scan.css';


const Scan = () => {
const {urlName} = useParams();
const [nome, setNome]=useState()
const [linkedin_url, setLinkedinUrl]=useState()
const [github_url, setGithubUrl]=useState()
const [form_resp, setFormResp]=useState()
const getCard = ()=>{
    axios.get("http://127.0.0.1:8000/scan/"+urlName)
    .then((response)=> {
        setFormResp(response.data[0]);
        setNome(form_resp.name)
        setLinkedinUrl(form_resp.linkedin_url)
        setGithubUrl(form_resp.github_url)
    }).catch((error)=>{
        console.log(error);
    }).finally(()=> {
        console.log("API FIM");
      });
  };
  getCard();
  if(nome){
    return(
        <div class="form">
            <h5>Hello, my name is {nome}</h5>
            <p class="my-name font-weight-bold">My history</p>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <a class="btn btn-outline-dark" target="blank" href={linkedin_url} type="button">Github</a>&emsp;
            <a class="btn btn-outline-dark" target="blank" href={github_url} type="button">Linkedin</a>
           
        </div> 
    );
  }else{
    return(
    <div class="form">
        <h5>Hello , unfortunately "{urlName}" was not found</h5>
        <p>Try Generate QR Code for: {urlName}</p>
        <a class="btn btn-outline-dark" target="blank" href="/" type="button">Generate QR Code</a>&emsp;       
    </div> 
    );
  }
    
};
export default Scan;