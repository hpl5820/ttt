import React,{useEffect,useState} from 'react'

export default function right() {
  let [A,setA] = useState(1)
  useEffect(()=>{
    // let i=setInterval(()=>{
    //   setA(()=>{
    //     console.log(A)
    //     return A++

    //   })
    // },1000)
    console.log(1234)
    return ()=>{
      console.log("over")
      // clearInterval(i)
    }
  },[])
  return (
    <div>
      123123
    </div>
  )
}
