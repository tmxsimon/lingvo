type ShapeProps = {
  type?: "circle" | "square" | "triangle";
  className?: string;
};

const shapeClasses = {
  circle: "rounded-full",
  square: "rounded-base",
  triangle: "clip-triangle",
};

const Shape = ({ type = "circle", className = "bg-brand-300" }: ShapeProps) => {
  return (
    <div className={`${className} -z-10 size-28 ${shapeClasses[type]}`}></div>
  );
};

export default Shape;
