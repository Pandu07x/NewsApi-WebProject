import axios from "axios"
import { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DateObject from "react-date-object";

export default function Index(){
    const [items,setItems]=useState([])
    const [show, setShow] = useState(false);
    const [city,setCity]=useState("vadodara")
    const [dates,setDate]=useState(new DateObject())
    const [errors,setErrors]=useState("")
    const [temp,setTemp]=useState()
    const [hum,setHum]=useState()
    const [img,setImg]=useState()
    const [text,setText]=useState()
    const [wind,setWind]=useState()
    const [wd,setWd]=useState()
    const [location,setLocation]=useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
    
    useEffect(()=>{
        axios.get(`http://newsapi.org/v2/top-headlines?country=in`,{headers:{
            'x-api-key':"0e5277ff4d4f4cbe94ee3392225093fa"
        }}).then((res)=>{
            console.log(res.data)
            setItems(res.data.articles)
            console.log(dates.format())
        })
    },
    axios.get(`http://api.weatherapi.com/v1/current.json?key=b5fef2042fbb497faeb182122220505&q=${city}&aqi=no`).then((res)=>{

        setErrors("")
        setTemp("Temperature: "+res.data.current.temp_c)
        setHum("Humidity:"+res.data.current.humidity)
        setImg(res.data.current.condition.icon)
        setText(res.data.current.condition.text+" sky")
        setWind("Wind speed: "+res.data.current.wind_kph+" KPH")
        setWd("Wind Direction: "+res.data.current.wind_dir)
        
        
        
        
        
        console.log(temp)
        //setLocation(res.data[1])
        
      }).catch((err)=>{
        if(err.response.status==400){
            setErrors("City NOt found")
            setCity("")
            setHum("")
            setTemp("")
            setText("")
            setImg("")
            setWd("")
            setWind("")
          
        }
      }),
    [])
    const weather=()=>{
      
    }
    return(
        <div>
            
            <div class="pos-f-t">
  <div  id="navbarToggleExternalContent">
    <div class="bg-dark p-4">
      <h4 class="text-white">News World</h4>
      <span class="text-muted" style={{fontSize:"20px"}}>A Base Project to test external API</span><br/>
      
    </div>
  </div>
  
  <nav class="navbar navbar-dark bg-dark justify-content-center ">
  <ul class="nav justify-content-center">
  
  <li class="nav-item">
    <a class="nav-link active" href="#" style={{color:"white"}} onClick={handleShow} >Todays weather</a>
  </li>
 
   <div >
   <a  class="nav-link active justify-content-right" style={{color:"white"}}>Date: {dates.format("dddd DD MMMM ")}</a>
   </div>
 
  
</ul>
  
  
    
    
    
    
      
    
  </nav>
</div>
<br/>
<>
     

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome to Weather Section</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please Enter your City:<br/><input type="text" className="form-control" onChange={((e)=>setCity(e.target.value))} />

        <h2 style={{color:"red"}}>{errors}</h2>
        <h3 align="center">{city}</h3>
        {temp}<br/>
        {hum}<br/>
        {text}<img src={img}></img><br/>
        {wind}&nbsp;&nbsp;&nbsp;{wd}
        
        </Modal.Body>
        
        
        <Modal.Footer>
          
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
    </>
            <div className="container text-center">
                <h1>News Headlines</h1>
                

            </div>
            
            {
                items.map((item,index)=>(
                    <div>
                        <div className="container py-5">
                            <div className="row justify-content-md-center">
                                <div className="col-sm-8">
                                <div class="card" >
  <img class="card-img-top rounded mx-auto d-block" src={item.urlToImage}   />
  <div class="card-body"style={{backgroundColor:"#5f5c604f"}}>
    <h5 class="card-title">{item.title}</h5>
    
    <p class="card-text">{item.description}</p>
    <p style={{marginRight:"-390px"}}>Published on:<b>{item.publishedAt}</b>  </p>
    <p style={{marginRight:"-390px"}}>Author:<b>{item.author}</b>  </p>
    <p style={{marginRight:"-390px"}}>Source:<b>{item.source.name}</b>  </p>
    <a href={item.url}><button className="btn btn-outline-primary">Read More </button></a>
    
    
  </div>
</div> 
&nbsp;
                                </div>
                            </div>
                        </div>

                    </div>
                   
                ))
            }
           
                    
                

        </div>
    )
}