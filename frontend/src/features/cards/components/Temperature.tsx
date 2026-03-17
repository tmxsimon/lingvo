import Icon from "../../../components/Icon";
import IconButton from "../../../components/IconButton";

const gradientStep = 20;

type TemperatureProps = {
  value: number;
  buttonLeftOnClick?: () => void;
  buttonRightOnClick?: () => void;
};

const Temperature = ({
  value,
  buttonLeftOnClick,
  buttonRightOnClick,
}: TemperatureProps) => {
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
      className="rounded-base flex h-full w-128 items-center justify-between"
      style={{
        background: `linear-gradient(to right, var(--color-brand-300) ${value}%, var(--color-brand-100) ${viaStop}%)`,
      }}
    >
      <IconButton
        type="text"
        icon={<Icon name="arrowLeft" className="h-6 w-8 text-white" />}
        hoverEffect={false}
        activeEffect={false}
        onClick={buttonLeftOnClick}
      />
      <IconButton
        type="text"
        icon={<Icon name="arrowRight" className="h-6 w-8 text-white" />}
        hoverEffect={false}
        activeEffect={false}
        onClick={buttonRightOnClick}
      />
    </div>
  );
};

export default Temperature;
