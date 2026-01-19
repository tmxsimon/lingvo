type ShapeProps = {
  type?: "circle" | "square" | "triangle";
  size?: "small" | "medium" | "large";
  className?: string;
};

const shapeMap = {
  circle: "rounded-full",
  square: "rounded-base",
  triangle: "clip-triangle",
};

const sizeMap = {
  small: "size-20",
  medium: "size-28",
  large: "size-36",
};

const Shape = ({
  type = "circle",
  size = "medium",
  className = "bg-brand-300",
}: ShapeProps) => {
  return (
    <div
      className={`${className} -z-10 ${sizeMap[size]} ${shapeMap[type]}`}
    ></div>
  );
};

export default Shape;
