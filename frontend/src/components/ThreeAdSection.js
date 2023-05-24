import SplitAd from "./SplitAd";

const ThreeAdSection = () => {
  return (
    <div className="row gx-5 mt-3">
      <div className="col-4">
        <SplitAd imgLocation="" />
      </div>
      <div className="col-4">
        <SplitAd imgLocation="" />
      </div>
      <div className="col-4">
        <SplitAd imgLocation="" />
      </div>
    </div>
  );
};

export default ThreeAdSection;
