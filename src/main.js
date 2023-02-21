import "./style.css";

/* Import af Motion One bibliotek */

import { animate, stagger, inView, scroll, timeline } from "motion";
scroll(animate(".progress-bar", { scaleX: [0, 1] }));

const scroller = document.querySelectorAll(".video-scroller");

scroller.forEach((container) => {
  const video = container.querySelector("video");
  video.pause();

  scroll(
    ({ y }) => {
      if (!video.readyState) return;
      video.currentTime = video.duration * y.progress;
    },
    {
      target: container,
      // offset: ["start", `${container.clientHeight - video.clientHeight}px start`],
    }
  );
});

/* STOCK-FOTOS SLIDE-IN VARIOUS SPEED */

inView(".stockanimation", () => {
  animate(".stock1", { x: [-2000, 0] }, { duration: 2 });
  animate(".stock3", { x: [-1000, 0] }, { duration: 2 });
  animate(".stock4", { x: [-500, 0] }, { duration: 2 });
  animate(".stock5", { x: [-2000, 0] }, { duration: 2 });
  animate(".stock6", { x: [2000, 0] }, { duration: 2 });
  animate(".stock7", { x: [1500, 0] }, { duration: 2 });
  animate(".stock8", { x: [1000, 0] }, { duration: 2 });
  animate(".stock9", { x: [500, 0] }, { duration: 2 });
  animate(".stock10", { x: [2000, 0] }, { duration: 2 });
  return () => {
    animate(".stock1", { x: [-2000, 0] }, { duration: 2 });
    animate(".stock3", { x: [-1000, 0] }, { duration: 2 });
    animate(".stock4", { x: [-500, 0] }, { duration: 2 });
    animate(".stock5", { x: [-2000, 0] }, { duration: 2 });
    animate(".stock6", { x: [2000, 0] }, { duration: 2 });
    animate(".stock7", { x: [1500, 0] }, { duration: 2 });
    animate(".stock8", { x: [1000, 0] }, { duration: 2 });
    animate(".stock9", { x: [500, 0] }, { duration: 2 });
    animate(".stock10", { x: [2000, 0] }, { duration: 2 });
  };
});

animate("body", { opacity: [0, 1] }, { duration: 5 });

inView(".textinview", () => {
  animate(".textinview", { x: [-2000, 0] }, { duration: 1 });
});

inView(".inviewnotinview", ({ target }) => {
  animate(target, { rotate: -10 }, { delay: 1, duration: 2 });
  return () => {
    animate(target, { rotate: 0 });
  };
});
