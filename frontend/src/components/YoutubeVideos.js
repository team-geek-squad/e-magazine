import classes from "./YoutubeVideos.module.css";

const YoutubeVideos = ({ embedId }) => {
  return (
    <div className={classes.videoDiv}>
      <iframe
        width="280"
        height="200"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        className={classes.video}
      />
    </div>
  );
};

export default YoutubeVideos;
