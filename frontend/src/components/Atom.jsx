import React from 'react';

const Atom = () => {
  return (
    <div className="atom">
      <style>
        {`
          .atom {
            position: relative;
            display: flex;
            width: 300px;
            height: 300px;
            align-items: center;
            justify-content: center;
          }
          .atom:before {
            content: "";
            position: absolute;
            width: 20px;
            height: 20px;
            background: transparent;
            box-shadow: inset 0 0 10px #000;
            border-radius: 50%;
          }
          .line {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0.7;
          }
          .line1 {
            --color: #06d6a0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border-bottom: 10px solid var(--color);
            border-top: 10px solid var(--color);
            animation: animate1 2s linear infinite;
            filter: drop-shadow(0 0 10px var(--color));
          }
          @keyframes animate1 {
            0% {
              transform: rotateY(70deg) rotateZ(0deg);
            }
            100% {
              transform: rotateY(70deg) rotateZ(360deg);
            }
          }
          .line2 {
            --color: #e63946;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border-right: 10px solid var(--color);
            border-left: 10px solid var(--color);
            animation: animate2 3s linear infinite;
            filter: drop-shadow(0 0 10px var(--color));
          }
          @keyframes animate2 {
            0% {
              transform: rotateX(80deg) rotateY(25deg) rotateZ(0deg);
            }
            100% {
              transform: rotateX(80deg) rotateY(25deg) rotateZ(360deg);
            }
          }
          .line3 {
            --color: #fca311;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border-right: 10px solid var(--color);
            border-left: 10px solid var(--color);
            animation: animate3 3s linear infinite;
            filter: drop-shadow(0 0 10px var(--color));
          }
          @keyframes animate3 {
            0% {
              transform: rotateX(-80deg) rotateY(25deg) rotateZ(0deg);
            }
            100% {
              transform: rotateX(-80deg) rotateY(25deg) rotateZ(360deg);
            }
          }
        `}
      </style>
      <div className="line line1"></div>
      <div className="line line2"></div>
      <div className="line line3"></div>
    </div>
  );
};

export default Atom;