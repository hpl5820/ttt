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
  const [boxArrowStyle, setBoxArrowStyle] = useState(null);
  let rect;
  let offsetLeft = useRef(0);
  let offsetTop = useRef(0);
  let originX = null;
  let originY = null;
  let currentX = null;
  let currentY = null;
  const handleMouseDown = (e) => {
    offsetLeft.current = e.clientX - boxRef.current.offsetLeft;
    offsetTop.current = e.clientY - boxRef.current.offsetTop;
    originX = boxRef.current.offsetWidth;
    originY = boxRef.current.offsetHeight;
    console.log("鼠标：", e.clientX, "盒子", boxRef.current.offsetLeft);

    // 四角
    if (offsetLeft.current < 5 && offsetTop.current < 5) {
      console.log("左上");
      setBoxArrowStyle("rightBottom");
    } else if (
      offsetLeft.current + 5 >= boxRef.current.clientWidth &&
      offsetTop.current + 5 >= boxRef.current.clientHeight
    ) {
      console.log("右下");

      setBoxArrowStyle("leftTop");
    } else if (
      offsetLeft.current < 5 &&
      offsetTop.current + 5 >= boxRef.current.clientHeight
    ) {
      console.log("左下");
      setBoxArrowStyle("rightTop");
    } else if (
      offsetTop.current < 5 &&
      offsetLeft.current + 5 >= boxRef.current.clientWidth
    ) {
      console.log("右上", originX, originY);
      setBoxArrowStyle("leftBottom");
    } else {
      setIsDragging(true); // 鼠标按下时设置拖拽状态为true
      // setBoxArrowStyle("center");
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
      currentX = rect.right - e.clientX;
      currentY = rect.bottom - e.clientY;
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
    boxRef.current.style.transform = `scale(${currentX / originX}, ${currentY / originY})`;
  };

  const handleMouseUp = (e) => {
    if(isDragging){
      setBoxArrowStyle("center");
    }
    setIsDragging(false); // 鼠标松开时设置拖拽状态为false
    originX = null;
    
  };

  useEffect(() => {
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
      style={{ transformOrigin: boxArrow[boxArrowStyle] }}
      onMouseDown={handleMouseDown}
      className="outer box"
    >
      <div className="inner"></div>
    </div>
  );
}
