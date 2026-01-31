const gradientStep = 20;

const Temperature = ({ value }: { value: number }) => {
  var viaStop = value;

  if (viaStop !== 0) {
    if (viaStop < 100 - gradientStep) {
      viaStop += gradientStep;
    } else {
      viaStop = 100;
    }
  }
  return (
    <div
      className="border-brand-neutral-200 rounded-base h-8 w-128 border"
      style={{
        background: `linear-gradient(to right, var(--color-brand-300) ${value}%, var(--color-brand-100) ${viaStop}%)`,
      }}
    ></div>
  );
};

export default Temperature;
