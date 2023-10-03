import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import './board.css';



const Board = () => {
  const canvasRef = useRef(null);
  const colorsRef = useRef(null);
  const socketRef = useRef();

  const navigate = useNavigate()

  useEffect(() => {

    // --------------- getContext() method returns a drawing context on the canvas-----

    const canvas = canvasRef.current;
    const test = colorsRef.current;
    const context = canvas.getContext('2d');

    // ----------------------- Colors --------------------------------------------------
    // const current = {
    //   color: 'black',
    // };
    // let drawing = false;
    const colors = document.getElementsByClassName('color');
    const backButton = document.querySelector('.backButton');
    console.log(colors, 'the colors');
    console.log(test);
    // set the current color
    const current = {
      color: 'black',
    };

    // helper that will update the current color
    const onColorUpdate = (e) => {
      const [first,second] = e.target.className.split(' ')
    //   current.color = e.target.className.split(' ')[1];
    console.log("first-",first)
      current.color = second
    };

    backButton.addEventListener('click',  () => {
      navigate(-1)
    });

  

    

    // loop through the color elements and add the click event listeners
    for (let i = 0; i < colors.length; i+=1) {
      colors[i].addEventListener('click', onColorUpdate, false);
    }
    let drawing = false;




    // ------------------------------- create the drawing ----------------------------

    const drawLine = (x0, y0, x1, y1, color, emit) => {
      context.beginPath();
      if(current.color==="white"){
        console.log("white aditya");
         context.globalCompositeOperation="destination-out";
         context.arc(x0,y0,8,0,3.14*5,false);
         context.fill();


      }
      else{
      context.globalCompositeOperation="source-over";
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.strokeStyle = color;
      context.lineWidth = 2;
      context.stroke();
      context.closePath();

      }
      

      // if (!emit) { return; }
      const w = canvas.width;
      const h = canvas.height;

      // socketRef.current.emit('drawing', {
      //   x0: x0 / w,
      //   y0: y0 / h,
      //   x1: x1 / w,
      //   y1: y1 / h,
      //   color,
      // });
    };

    // ---------------- mouse movement --------------------------------------

    const onMouseDown = (e) => {
        // console.log("here mouse down",e)
      drawing = true;
      current.x = e.clientX || e.touches[0].clientX;
      current.y = e.clientY || e.touches[0].clientY;
    };

    const onMouseMove = (e) => {
        // console.log("here mouse move",e)
      if (!drawing) { return; }
      drawLine(current.x, current.y, e.clientX || e.touches[0]?.clientX, e.clientY || e.touches[0]?.clientY, current.color, true);
      current.x = e.clientX || e.touches[0].clientX;
      current.y = e.clientY || e.touches[0].clientY;
    };

    const onMouseUp = (e) => {
        // console.log("here mouse up",e)
      if (!drawing) { return; }
      drawing = false;
      drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color, true);
    };

    // ----------- limit the number of events per second -----------------------

    const throttle = (...args) => {
        let previousCall = new Date().getTime();
        return function() {
          const time = new Date().getTime();
  
          if ((time - previousCall) >= args[1]) {
            previousCall = time;
          //   callback.apply(null, arguments);
          args[0](...args)
          
          }
        };
      };

    // -----------------add event listeners to our canvas ----------------------
       

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mouseout', onMouseUp, false);

    // canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);
    canvas.addEventListener('mousemove',onMouseMove, false);
    canvas.addEventListener('click',handleErase, false);


    // Touch support for mobile devices
    canvas.addEventListener('touchstart', onMouseDown, false);
    canvas.addEventListener('touchend', onMouseUp, false);
    canvas.addEventListener('touchcancel', onMouseUp, false);
    canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);

    // -------------- make the canvas fill its parent component -----------------

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', onResize, false);
    onResize();

    // ----------------------- socket.io connection ----------------------------
    // const onDrawingEvent = (data) => {
    //   const w = canvas.width;
    //   const h = canvas.height;
    //   drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    // }

    // socketRef.current = io.connect('ws://localhost:8900');
    // socketRef.current.on('drawing', onDrawingEvent);
  }, []);

  // ------------- The Canvas and color elements --------------------------
  const handleErase=()=>{
    console.log("hiiii");
  }

  return (
    <div id='whiteboard' style={{overflowY:'scroll',height:'100%', width:"100%"}}>


      <canvas ref={canvasRef} className="whiteboard" />



      <div ref={colorsRef} className="colors">
        {/* <div className="color black" onClick={()=>setColor({color: 'black'})}/>
        <div className="color red" onClick={()=>setColor({color: 'red'})}/> */}
        <div className="color black" />
        <div className="color red" />
        <div className="color green" />
        <div className="color blue" />
        <div className="color yellow" />
        <div className=" backButton"/>
        <div className="color white box" />
        


      </div>

      

    </div>


  );


};

export default Board;

