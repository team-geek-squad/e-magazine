import HorizontalAd from "../components/HorizontalAd";
import NewspaperView from "../components/NewspaperView";
import YoutubeVideoSection from "../components/YoutubeVideoSection";
import PreviousEditionsSection from "../components/PreviousEditionsSection";

const Home = () => {
  return (
    <div className="container">
      <HorizontalAd />
      <NewspaperView />
      <YoutubeVideoSection />
      <PreviousEditionsSection />
      <HorizontalAd />
    </div>
  );
};

export default Home;
