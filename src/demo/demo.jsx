import React, { useEffect, useRef, useState } from "react";
import "./demo.less";

export default function Demo() {
  const boxRef = useRef();
  const [isDragging, setIsDragging] = useState(false); // 添加一个状态来跟踪是否正在拖拽
  const boxArrow = {
    leftTop: "left top",
    rightTop: "right top",
    leftBottom: "left bottom",
    rightBottom: "right bottom",
    center: "50% 50%",
  };
  const [boxArrowStyle, setBoxArrowStyle] = useState("center");
  let rect,dot;
  let offsetLeft = useRef(0);
  let offsetTop = useRef(0);
  let originX = null;
  let originY = null;
  let currentX = null;
  let currentY = null;
  const handleMouseDown = (e) => {
    offsetLeft.current = e.clientX - boxRef.current.offsetLeft;
    offsetTop.current = e.clientY - boxRef.current.offsetTop;
    // originX = e.clientX;
    // originY = e.ciientY;
    originX = boxRef.current.offsetWidth;
    originY = boxRef.current.offsetHeight;
    console.log("鼠标：", e.clientX, "盒子", rect.left);
console.log(boxArrowStyle)
    // 四角
    if(boxArrowStyle == "center"){
      setIsDragging(true); // 鼠标按下时设置拖拽状态为true
      setBoxArrowStyle("center");
      console.log("非四角");
    }

    
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      // 如果不是拖拽状态，不执行后续操作
      const x = e.clientX - offsetLeft.current;
      const y = e.clientY - offsetTop.current;
      boxRef.current.style.left = `${x}px`;
      boxRef.current.style.top = `${y}px`;
      return;
    }
    if (typeof originX == "number" && boxArrowStyle === "rightBottom") {
      // currentX = rect.right - e.clientX;
      // currentY = rect.bottom - e.clientY;
      //直接计算长宽
      let temp = dot[2]
      dot[0]={x:e.clientX,y:e.clientY}
      if(e.clientX>temp.x&&e.clientY>temp.y){
        currentX = 0- Math.sqrt((dot[0].x-dot[1].x)**2+(dot[0].y-dot[1].y)**2)
        currentY =0- Math.sqrt((dot[0].x-dot[3].x)**2+(dot[0].y-dot[3].y)**2)
        
      }else{
      currentX = Math.sqrt((dot[0].x-dot[1].x)**2+(dot[0].y-dot[1].y)**2)
      currentY = Math.sqrt((dot[0].x-dot[3].x)**2+(dot[0].y-dot[3].y)**2)
    }
    } else if (typeof originX == "number" && boxArrowStyle === "leftBottom") {
      currentX = e.clientX - boxRef.current.offsetLeft;
      currentY = rect.bottom - e.clientY;
    } else if (typeof originX == "number" && boxArrowStyle === "leftTop") {
      currentX = e.clientX - boxRef.current.offsetLeft;
      currentY = e.clientY - boxRef.current.offsetTop;
    } else if (typeof originX == "number" && boxArrowStyle === "rightTop") {
      currentX = rect.right - e.clientX;
      currentY = e.clientY - rect.top;
    }
    console.log(currentY,originY)
    boxRef.current.style.transform = `scale(${currentX / originX}, ${currentY / originY}) `;
  };

  const handleMouseUp = (e) => {
    setBoxArrowStyle("center");
    setIsDragging(false); // 鼠标松开时设置拖拽状态为false
    originX = null;
    
  };

  useEffect(() => {
    //获取圆心坐标
    dot = document.getElementsByClassName("d")
    dot = [...dot].map((rect)=>{
      rect = rect.getBoundingClientRect()
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      return { x, y };
    })
    console.log(dot)
    let box = boxRef.current;
    if (box) {
      rect = box.getBoundingClientRect();
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp, boxArrowStyle]);
  return (
    <div
      ref={boxRef}
      style={{ transformOrigin: boxArrow[boxArrowStyle],
        rotate:"45deg"
       }}
      onMouseDown={handleMouseDown}
      className="outer box"
    >
      <div className="inner">
        <div className="d1 d" onClick={()=>setBoxArrowStyle(()=>{
          console.log(123)
          return "rightBottom"
        })}></div>
        <div className="d2 d" onClick={()=>setBoxArrowStyle("leftBottom")}></div>
        <div className="d3 d" onClick={()=>setBoxArrowStyle("leftTop")} ></div>
        <div className="d4 d" onClick={()=>setBoxArrowStyle("rightTop")} ></div>
      </div>
    </div>
  );
}
