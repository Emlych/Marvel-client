import "./circle.css";
import { gsap } from "gsap";
import { forwardRef, useRef, useImperativeHandle } from "react";

const Circle = forwardRef(({ size, delay }, ref) => {
  const el = useRef();
  useImperativeHandle(
    ref,
    () => {
      return {
        moveTo(x, y) {
          gsap.to(el.current, { x, y, delay });
        },
      };
    },
    [delay]
  );
  return <div className={`circle ${size}`} ref={el}></div>;
});

export default Circle;
