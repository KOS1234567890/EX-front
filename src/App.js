import './App.css';
import axios from 'axios'
import {useEffect,useState} from 'react'

function List({data,setData}){
  const remove =(id)=>{
    axios.delete(`${process.env.REACT_APP_SERVERTEST}/abc/${id}`)
    .then(res=>{
      setData(res.data);
    })
  }
  return(
    <>
    {
      data.map(obj=>(
        <li key={obj.id}>
              {obj.msg}
              <button onClick={()=>{
                remove(obj.id)
              }}>삭제</button>
        </li>

      ))
    }
    </>
  );
}
function Write({setData}){
  const insert = (e)=>{
    e.preventDefault();
    let msg=e.target.msg.value;
    axios.post(`${process.env.REACT_APP_SERVERTEST}/insert`,{msg})
    .then(res=>{
      setData(res.data);
    })
  }
  return(
  <div>
        <form onSubmit={insert}>{/* 입력받는값 */}
          <input id='write1' type='text' placeholder='댓글입력' name='msg'/>
          <input id='res' type='submit' value='저장'/>
        </form>
  </div>
  );
}
function App() {
  const [data,setData]=useState([]);

  const getData = ()=>{
    axios.get(`${process.env.REACT_APP_SERVERTEST}/abc`)
    .then(res=>{
      setData(res.data)
    })
  }
  useEffect(()=>{
    getData();
  },[])
  /* axios.post('http://localhost:3030/insert',{id:1000,name:'신규데이터'})
  .then(res=>{
    console.log(res);
  }) */
  return (
    <article>
      <h2>한줄댓글{}</h2>
        <Write setData={setData}/>
      <ul>
        <List data={data} setData={setData}/>
      </ul>
    </article>
  );
}

export default App;
