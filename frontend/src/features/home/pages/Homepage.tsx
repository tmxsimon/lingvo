import Button from "../../../components/Button";
import Shape from "../../../components/Shape";

const Homepage = () => {
  return (
    <div className="relative">
      <div className="gap-base flex flex-col items-center pt-54">
        <div className="flex items-center justify-center gap-8">
          <div className="w-3/7">
            <h1 className="text-5xl font-bold">Learn with Lingvo</h1>
            <hr className="text-brand-300 mt-base-sm w-1/5 border-3" />
            <p className="mt-base-lg w-5/7 text-2xl">
              Your daily assistant for language learning. Make your study more
              comfortable and effective with everything you need. Start for
              free.
            </p>
            <div className="gap-base mt-base-lg flex">
              <Button
                text="Get Started"
                type="primary"
                theme="brand"
                size="large"
                onClick={() => console.log("Get started clicked")}
              />
              <Button
                text="Pricing"
                type="secondary"
                theme="brand"
                size="large"
                onClick={() => console.log("Pricing clicked")}
              />
            </div>
          </div>
          <div className="bg-brand-300 size-108 shrink-0 rounded-full"></div>
          {/* <img
            className="size-108"
            src="src/assets/images/globe.png"
            alt="globe"
          /> */}
        </div>
      </div>
      <Shape
        type="square"
        className="bg-brand-100 absolute top-25 left-100 -rotate-20"
      />
      <Shape type="circle" className="bg-brand-200 absolute top-120 -left-15" />
      <Shape type="circle" className="bg-brand-100 absolute top-35 -right-15" />
      <Shape type="square" className="bg-brand-100 absolute top-180 left-100" />
      <Shape
        type="circle"
        className="bg-brand-200 absolute top-160 left-220 rotate-20"
      />
      <Shape
        type="square"
        className="bg-brand-200 absolute top-180 right-60 rotate-20"
      />
    </div>
  );
};

export default Homepage;
