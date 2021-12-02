import React, {useState, useEffect} from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {

  const url = 'https://course-api.com/react-tours-project';
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(false)

  function refreshPage() {
    window.location.reload(false);
  }

    useEffect(() => {
        fetch(url).then(
            res => {
              if (res.ok) {
                return res.json()
              }
              throw res
              
            }).then(data =>{
              setData(data)
              console.log(data)
            }).catch(error => {
              console.error(error)
            }).finally(setLoading(false))
    }, [])

    const handleRemoveItem = (e) => {
      const name = e.target.getAttribute("name")
       setData(data.filter(item => item.id !== name));
     };

    const showMore = () => {
     setShow(true);
    } 
    const showLess = () => {
      setShow(false);
     } 
    if (loading) return <h1 className="loading">Loading...</h1>
   

  return (
    
    <div>
     
      <div className="section">
        {!data.length ? <> <h2 className="loading">No more Tours</h2>
        <button className="refresh" onClick={refreshPage}>refresh</button></> : <>
        <h2 className="title">Our Tours</h2>
      <hr className="underline"/> {data.map(item => 
        <div key={item.id} className="single-tour">
           <img src={item.image}/>
           <div className="section" style={{marginTop: 40, paddingBottom: 20, paddingLeft: 40, paddingRight: 40}}>
              <div className="tour-info"  >
                <h3 >{item.name}</h3>
                <h4 className="tour-price" >${item.price}</h4>

              </div>
              {show == false ? <> <p className="text">
              {item.info}
              </p>
               <a className="show" onClick={showMore}  style={{marginTop:-30,}}>show more</a></> :<> <p>
              {item.info}
              </p>
              <a className=""  onClick={showLess}  style={{marginTop:-30,}}>show less</a></>}

            </div>
            <footer>
              <button name={item.id} className="delete-btn" onClick={handleRemoveItem} style={{marginBottom:30}}>Not Interested</button>
            </footer>

        </div>
        )}</>}
        
        

      </div>

    </div>
    
  )
}
