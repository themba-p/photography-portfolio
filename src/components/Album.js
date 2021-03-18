import React, { useState } from "react";
import anime from "animejs/lib/anime.es.js";
import { StyleSheet, css } from "aphrodite/no-important";

export default function Album(props) {
  // const MacklinDisplay = {
  //   fontFamily: "MacklinDisplay",
  //   fontStyle: "normal",
  //   fontWeight: "500",
  //   src: "url('./fonts/MacklinDisplay-Medium.otf') format('opentype')"
  // };

  const styles = StyleSheet.create({
    container: {
      ":hover": {
        cursor: "pointer"
      },
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      transition: "opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      width: "250px"
    },
    infoWrapper: {
      alignItems: "center",
      display: "flex",
      height: "24px",
      justifyContent: "center",
      marginTop: "16px",
      overflow: "hidden"
    },
    titleContainer: {
      height: "100%",
      position: "relative"
    },
    title: {
      fontFamily: "Macklin Display",
      fontSize: 24,
      fontWeight: 500
    },
    titleAfter: {
      transform: "translateY(-100%)"
    },
    letter: {
      display: "inline-block",
      lineHeight: "1em"
    },
    arrowIcon: {
      height: "100%",
      marginTop: "-4px",
      transition:
        "stroke 0.25s linear, transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
    },
    arrowIconDefault: {
      stroke: "#fff",
      transform: "translate(0, 0)"
    },
    arrowIconHover: {
      stroke: "var(--primary-color)",
      transform: "translate(4px, -2px)"
    }
  });

  const albumStyle1 = StyleSheet.create({
    container: {
      display: "flex",
      height: 250,
      justifyContent: "center",
      width: 250
    },
    imagesContainer: {
      height: "225px",
      marginTop: "24px",
      position: "relative",
      width: "150px"
    },
    imgWrapper: {
      borderRadius: "24px",
      height: "100%",
      left: 0,
      overflow: "hidden",
      position: "absolute",
      top: 0,
      transition: "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      width: "100%",

      ":hover": {
        zIndex: 1
      }
    },
    img: {
      ":hover": {
        transform: "scale(1)"
      },
      height: "100%",
      objectFit: "cover",
      transform: "scale(1.1)",
      transition: "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      width: "100%"
    },

    //Default image states
    lastChildDefault: {
      transform: "rotate(-10deg) translate3d(-14px, -10px, 0)"
    },
    middleChildDefault: {
      transform: "rotate(0deg) translate3d(0, -20px, 0)"
    },
    firstChildDefault: {
      transform: "rotate(10deg) translate3d(10px, -30px, 0)"
    },

    //Container hover state
    lastChildContainerHover: {
      ":hover": {
        transform: "rotate(-5deg) translate3d(-30px, -16px, 0)"
      },
      transform: "rotate(-10deg) translate3d(-24px, -12px, 0)"
    },
    middleChildContainerHover: {
      ":hover": {
        transform: "rotate(5deg) translate3d(12px, -24px, 0)"
      },
      transform: "rotate(3deg) translate3d(0, -24px, 0)"
    },
    firstChildContainerHover: {
      ":hover": {
        transform: "rotate(5deg) translate3d(32px, -32px, 0)"
      },
      transform: "rotate(10deg) translate3d(20px, -40px, 0)"
    }
  });
  const albumStyle2 = StyleSheet.create({
    container: {
      display: "flex",
      height: 400,
      justifyContent: "center",
      width: 400
      // marginLeft: "-74px",
    },
    imagesContainer: {
      height: "360px",
      marginTop: "48px",
      position: "relative",
      width: "240px"
    },
    imgWrapper: {
      borderRadius: "24px",
      height: "100%",
      left: 0,
      overflow: "hidden",
      position: "absolute",
      top: 0,
      transition: "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      width: "100%",

      ":hover": {
        zIndex: 1
      }
    },
    img: {
      ":hover": {
        transform: "scale(1)"
      },
      height: "100%",
      objectFit: "cover",
      transform: "scale(1.1)",
      transition: "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      width: "100%"
    },

    //Default image states
    lastChildDefault: {
      transform: "rotate(-10deg) translate3d(-22px, -18px, 0)"
    },
    middleChildDefault: {
      transform: "rotate(0deg) translate3d(0, -34px, 0)"
    },
    firstChildDefault: {
      transform: "rotate(10deg) translate3d(10px, -48px, 0)"
    },

    //Container hover state
    lastChildContainerHover: {
      ":hover": {
        transform: "rotate(-5deg) translate3d(-30px, -16px, 0)"
      },
      transform: "rotate(-10deg) translate3d(-24px, -12px, 0)"
    },
    middleChildContainerHover: {
      ":hover": {
        transform: "rotate(5deg) translate3d(12px, -24px, 0)"
      },
      transform: "rotate(3deg) translate3d(0, -24px, 0)"
    },
    firstChildContainerHover: {
      ":hover": {
        transform: "rotate(5deg) translate3d(32px, -32px, 0)"
      },
      transform: "rotate(10deg) translate3d(20px, -40px, 0)"
    }
  });

  const albumStyle = props.isFullscreenView ? albumStyle2 : albumStyle1;

  //album children normal, hover states
  const [firstChildState, setFirstChildState] = useState(
    albumStyle.firstChildDefault
  );
  const [nthChildState, setnthChildState] = useState(
    albumStyle.middleChildDefault
  );
  const [lastChildState, setLastChildState] = useState(
    albumStyle.lastChildDefault
  );

  const titleRefs = [];
  const titleAfterRefs = [];

  const [arrowIconClass, setArrowIconClass] = useState([
    styles.arrowIcon,
    styles.arrowIconDefault
  ]);

  const arrowIcon = (
    <svg
      className={css(arrowIconClass)}
      width="20"
      height="20"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.1667 6.33333L5.83334 14.6667"
        // stroke="#E66136"
        strokeWidth="1.5"
      />
      <path
        d="M6.66666 6.33333H14.1667V13.8333"
        // stroke="#E66136"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );

  const imagesUris = props.previewUris;
  const title = props.title;

  const animateMouseEnter = () => {
    anime({
      targets: titleRefs.map((r) => r.current),
      translateY: [0, -30],
      easing: "cubicBezier(0.25, 0.46, 0.45, 0.94)",
      duration: 750,
      delay: (el, i) => 10 * i
    });

    anime({
      targets: titleAfterRefs.map((r) => r.current),
      translateY: [30, 0],
      easing: "cubicBezier(0.25, 0.46, 0.45, 0.94)",
      duration: 550,
      delay: (el, i) => 10 * i
    });

    handleContainerMouseEnter();
  };

  const animateTitle = () => {
    console.log("shit");
    anime({
      targets: titleRefs.map((r) => r.current),
      translateY: [0, -30],
      easing: "cubicBezier(0.25, 0.46, 0.45, 0.94)",
      duration: 750,
      delay: (el, i) => 10 * i
    });

    anime({
      targets: titleAfterRefs.map((r) => r.current),
      translateY: [30, 0],
      easing: "cubicBezier(0.25, 0.46, 0.45, 0.94)",
      duration: 550,
      delay: (el, i) => 10 * i
    });
  };

  const handleContainerMouseEnter = () => {
    setFirstChildState(albumStyle.firstChildContainerHover);
    setnthChildState(albumStyle.middleChildContainerHover);
    setLastChildState(albumStyle.lastChildContainerHover);
    setArrowIconClass([styles.arrowIcon, styles.arrowIconHover]);
    anime({
      targets: containerRef.current,
      scale: 1.1,
      translateY: "-20px",
      easing: "cubicBezier(0.25, 0.46, 0.45, 0.94)",
      duration: 450
    });
  };

  const handleContainerMouseLeave = () => {
    setFirstChildState(albumStyle.firstChildDefault);
    setnthChildState(albumStyle.middleChildDefault);
    setLastChildState(albumStyle.lastChildDefault);
    setArrowIconClass([styles.arrowIcon, styles.arrowIconDefault]);

    anime({
      targets: containerRef.current,
      scale: 1,
      translateY: "0",
      easing: "cubicBezier(0.25, 0.46, 0.45, 0.94)",
      duration: 450
    });
  };

  const formatTitle = (refArr, str) => {
    let arr = [];
    for (let i = 0; i < str.length; i++) {
      let al = str[i];
      let ref = React.createRef();
      if (al === " ") {
        al = "\u00A0";
      }
      arr.push(
        <span key={"t" + i} ref={ref} className={css(styles.letter)}>
          {al}
        </span>
      );
      refArr.push(ref);
    }
    return arr;
  };
  const containerRef = React.createRef();

  return (
    <div
      className={css(styles.container)}
      onMouseEnter={() => animateMouseEnter()}
      onMouseLeave={() => handleContainerMouseLeave()}
    >
      <div
        className={css(albumStyle.container)}
        onMouseEnter={() => props.ImagesMouseOver(true)}
        onMouseLeave={() => props.ImagesMouseOver(false)}
      >
        <div className={css(albumStyle.imagesContainer)} ref={containerRef}>
          <div className={css(albumStyle.imgWrapper, firstChildState)}>
            <img className={css(albumStyle.img)} src={imagesUris[0]} alt="" />
          </div>
          <div className={css(albumStyle.imgWrapper, nthChildState)}>
            <img className={css(albumStyle.img)} src={imagesUris[1]} alt="" />
          </div>
          <div className={css(albumStyle.imgWrapper, lastChildState)}>
            <img className={css(albumStyle.img)} src={imagesUris[2]} alt="" />
          </div>
        </div>
      </div>
      {!props.isFullscreenView ? (
        <div className={css(styles.infoWrapper)}>
          <div className={css(styles.titleContainer)}>
            <h3 className={css(styles.title)}>
              {formatTitle(titleRefs, title)}
            </h3>
            <h3 className={css(styles.title, styles.titleAfter)}>
              {formatTitle(titleAfterRefs, title)}
            </h3>
          </div>
          {arrowIcon}
        </div>
      ) : null}
    </div>
  );
}
