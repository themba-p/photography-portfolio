import React from "react";
import Album from "./Album";
import { StyleSheet, css } from "aphrodite/no-important";
import anime from "animejs/lib/anime.es.js";

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrowIconClass: [this.linkArrowStyles.icon, this.linkArrowStyles.default],
      titleRefs: [],
      titleAfterRefs: [],
      refs: [],
      ListRef: React.createRef(),
      isFullscreenView: false,
      translateX: 0,
      scrollWidth: 0,
      scrollBy: 0,
      currentIndex: 0,
      currentItem: null,
      isNextEnabled: true,
      isPreviousEnabled: true,

      albumTitleAnimeControl: []
    };

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.toggleAlbumsView = this.toggleAlbumsView.bind(this);
    this.handleEntranceAnimation = this.handleEntranceAnimation.bind(this);
    this.handleCompactEntranceAnimation = this.handleCompactEntranceAnimation.bind(
      this
    );
    this.handleViewProjectHover = this.handleViewProjectHover.bind(this);
  }

  linkArrowStyles = StyleSheet.create({
    icon: {
      height: "100%",
      marginTop: "2px",
      transition:
        "stroke 0.25s linear, transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
    },
    default: {
      stroke: "#fff",
      transform: "translate(0, 0)"
    },
    onHover: {
      stroke: "var(--primary-color)",
      transform: "translate(4px, -2px)"
    }
  });

  componentDidMount() {
    const scrollWidth = this.state.ListRef.current.scrollWidth;
    const scrollBy = scrollWidth / this.props.items.length;

    let r = this.props.items.map((el) => React.createRef());
    this.setState({ refs: r }, () => {
      let j = this.props.items.map((elm) => false);
      this.setState({ albumTitleAnimeControl: j }, () => {
        window.innerWidth > 700
          ? this.handleEntranceAnimation()
          : this.handleCompactEntranceAnimation();
      });
    });

    this.updateScrollData(scrollWidth, scrollBy);
  }

  updateScrollData(scrollWidth, scrollBy) {
    this.setState({ scrollWidth: scrollWidth }, () => {
      this.setState({ scrollBy: scrollBy }, () => {
        this.updateCurrentItem();
        this.updateNavButtonStates();
      });
    });
  }

  formatTitle = (refArr, str) => {
    let arr = [];
    for (let i = 0; i < str.length; i++) {
      let al = str[i];
      let ref = React.createRef();
      if (al === " ") {
        al = "\u00A0";
      }
      arr.push(
        <span key={"t" + i} ref={ref} className={css(this.styles.letter)}>
          {al}
        </span>
      );
      refArr.push(ref);
    }
    return arr;
  };

  toggleAlbumsView = () => {
    this.setState({ isFullscreenView: !this.state.isFullscreenView });
    this.handleEntranceAnimation();
  };

  handleEntranceAnimation = () => {
    anime({
      targets: this.state.refs.map((r) => r.current),
      opacity: [0, 1],
      translateX: ["-100%", 0],
      easing: "cubicBezier(0.25, 0.46, 0.45, 0.94)",
      duration: 550,
      delay: (el, i) => 100 * i
    });
  };

  handleCompactEntranceAnimation = () => {
    anime({
      targets: this.state.refs.map((r) => r.current),
      opacity: [0, 1],
      translateY: [100, 0],
      easing: "cubicBezier(0.25, 0.46, 0.45, 0.94)",
      duration: 450,
      delay: (el, i) => 50 * i
    });
  };

  async updateCurrentItem() {
    let a = this.state.translateX / this.state.scrollBy;

    a *= a < 0 ? -1 : 1;
    this.setState({ currentIndex: a + 1 }, () => {
      const item = this.props.items[a];
      this.setState({ currentItem: item });
    });
  }

  updateNavButtonStates() {
    let nextEnabled = false;
    let previousEnabled = false;
    let index = this.state.currentIndex;
    nextEnabled = index < this.props.items.length - 1 ? true : false;
    previousEnabled = this.state.translateX < 0 ? true : false;

    this.setState({
      isNextEnabled: nextEnabled,
      isPreviousEnabled: previousEnabled
    });
  }

  previous() {
    this.setState(
      { translateX: this.state.translateX + this.state.scrollBy },
      () => {
        anime({
          targets: this.state.refs.map((r) => r.current),
          translateX: this.state.translateX + "px",
          easing: "cubicBezier(0.25, 0.46, 0.45, 0.94)",
          duration: 650,
          delay: (el, i) => 150 * i
        });

        this.updateCurrentItem();
        this.updateNavButtonStates();
      }
    );
  }

  next() {
    this.setState(
      { translateX: this.state.translateX - this.state.scrollBy },
      () => {
        anime({
          targets: this.state.refs.map((r) => r.current),
          translateX: this.state.translateX + "px",
          easing: "cubicBezier(0.25, 0.46, 0.45, 0.94)",
          duration: 650,
          delay: (el, i) => 150 * i
        });

        this.updateCurrentItem();
        this.updateNavButtonStates();
      }
    );
  }

  handleViewProjectHover(arrowStyles) {
    this.setState({ arrowIconClass: arrowStyles });
  }

  render() {
    const styles = StyleSheet.create({
      textButton: {
        alignItems: "center",
        background: "none",
        border: "none",
        display: "flex",
        cursor: "pointer",
        height: "36px",
        justifyContent: "center",
        outline: "none"
      },
      container: {
        alignItems: "center",
        display: "flex",
        height: "100%",
        justifyContent: "space-between",
        position: "relative",
        width: "100%"
      },
      List: {
        "@media (min-width: 700px)": {
          justifyContent: "flex-start",
          flexDirection: "row",
          height: "100%",
          marginTop: 0,
          overflow: "hidden"
        },
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        listStyleType: "none",
        marginTop: this.state.isFullscreenView ? 0 : "80px",
        transition: "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        width: "100%"
      },
      item: {
        "@media (min-width: 700px)": {
          marginRight: this.state.isFullscreenView ? 0 : "24px",
          marginLeft: this.state.isFullscreenView ? "-110px" : 0
        },
        marginBottom: this.state.isFullscreenView ? 0 : "24px"
      },
      albumContainer: {
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        width: this.state.isFullscreenView ? "100vw" : "auto"
      },
      infoWrapper: {
        display: this.state.isFullscreenView ? "block" : "none",
        position: "absolute",
        right: "128px"
      },
      titleContainer: {
        position: "relative"
      },
      title: {
        fontFamily: "Macklin Display",
        fontSize: "48px",
        fontWeight: 500,
        lineHeight: 1.1,
        maxWidth: "200px",
        textAlign: "left",
        wordWrap: "break-word"
      },
      titleAfter: {
        transform: "translateY(-100%)"
      },
      letter: {
        display: "inline-block",
        lineHeight: "1em"
      },
      viewProjectButton: {
        color: "#fff",
        fontFamily: "Avenir Next World",
        fontSize: "14px",
        fontWeight: "500",
        letterSpacing: "2px",
        textTransform: "uppercase",
        whiteSpace: "none"
      },
      viewProjectButtonInner: {
        alignItems: "center",
        display: "flex"
      },
      arrowIcon: {
        height: "100%",
        marginTop: "2px",
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
      },
      counter: {
        display: this.state.isFullscreenView ? "block" : "none",
        fontFamily: "Avenir Next World",
        fontSize: "16px",
        fontWeight: 400,
        left: "128px",
        letterSpacing: "8px",
        position: "absolute"
      }
    });
    const footerStyles = StyleSheet.create({
      footer: {
        "@media (min-width: 700px)": {
          bottom: "0",
          left: "0",
          marginBottom: "16px",
          padding: "0 64px",
          position: "fixed"
        },
        alignItems: "center",
        bottom: 0,
        display: "flex",
        height: "64px",
        justifyContent: "space-between",
        position: "absolute",
        padding: "0 16px",
        width: "100%"
      },
      textButton: {
        ":disabled": {
          opacity: 0.1
        },
        alignItems: "center",
        background: "none",
        border: "none",
        display: "flex",
        cursor: "pointer",
        height: "48px",
        justifyContent: "center",
        outline: "none",
        width: "48px"
      },
      copyright: {
        fontSize: 12,
        fontWeight: "500",
        letterSpacing: "2px",
        opacity: ".87"
      },
      albumsNav: {
        alignItems: "center",
        display: "flex"
      }
    });

    const arrowIcon = (
      <svg
        className={css(this.state.arrowIconClass)}
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

    const items = this.props.items.map((album, i) => {
      return (
        <li
          key={"album_" + i}
          className={css(styles.item)}
          ref={this.state.refs[i]}
        >
          <div className={css(styles.albumContainer)}>
            <Album
              showTitle={this.state.albumTitleAnimeControl[i]}
              previewUris={album.previewUris}
              title={album.title}
              ImagesMouseOver={(isFocused) =>
                this.props.ImagesMouseOver(isFocused)
              }
              isFullscreenView={this.state.isFullscreenView}
            />
          </div>
        </li>
      );
    });

    return (
      <div className={css(styles.container)}>
        <div>
          <h4 className={css(styles.counter)}>
            <span>{this.state.currentIndex}</span>
            <span>/</span>
            <span>{this.props.items.length}</span>
          </h4>
        </div>
        <ul className={css(styles.List)} ref={this.state.ListRef}>
          {items}
        </ul>
        <div className={css(styles.infoWrapper)}>
          <div className={css(styles.titleContainer)}>
            <h3 className={css(styles.title)}>
              {this.state.currentItem && this.state.currentItem.title
                ? this.state.currentItem.title
                : "Loading"}
            </h3>
            {/* <h3 className={css(styles.title, styles.titleAfter)}>
            {formatTitle(titleAfterRefs, "S Mag Editorial")}
          </h3>{" "} */}
          </div>
          <button
            className={css(styles.viewProjectButton, styles.textButton)}
            onMouseEnter={() =>
              this.handleViewProjectHover([
                this.linkArrowStyles.icon,
                this.linkArrowStyles.onHover
              ])
            }
            onMouseLeave={() => {
              this.handleViewProjectHover([
                this.linkArrowStyles.icon,
                this.linkArrowStyles.default
              ]);
            }}
          >
            <div className={css(styles.viewProjectButtonInner)}>
              <span>view project</span>
              {arrowIcon}
            </div>
          </button>
        </div>
        <footer className={css(footerStyles.footer)}>
          <p className={css(footerStyles.copyright)}>
            ©{new Date().getFullYear()}
          </p>
          <nav className={css(footerStyles.albumsNav)}>
            <button
              className={css(footerStyles.textButton)}
              onClick={() => this.previous()}
              disabled={!this.state.isPreviousEnabled}
            >
              {ChevLeftIcon}
            </button>
            <button
              className={css(footerStyles.textButton)}
              onClick={() => this.next()}
              disabled={!this.state.isNextEnabled}
            >
              {ChevRightIcon}
            </button>
          </nav>
          <button
            className={css(footerStyles.textButton)}
            onClick={() => this.toggleAlbumsView()}
          >
            {AlbumsViewIcon}
          </button>
        </footer>
      </div>
    );
  }
}

const ChevLeftIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M15 6L9 12L15 18" stroke="white" strokeWidth="1.5" />
  </svg>
);

const ChevRightIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9 6L15 12L9 18" stroke="white" strokeWidth="1.5" />
  </svg>
);

const AlbumsViewIcon = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
    <circle cx="1.5" cy="6.5" r="1.5" fill="white" />
    <circle cx="1.5" cy="11.5" r="1.5" fill="white" />
    <circle cx="1.5" cy="16.5" r="1.5" fill="white" />
    <circle cx="6.5" cy="1.5" r="1.5" fill="white" />
    <circle cx="6.5" cy="6.5" r="1.5" fill="white" />
    <circle cx="6.5" cy="11.5" r="1.5" fill="white" />
    <circle cx="6.5" cy="16.5" r="1.5" fill="white" />
    <circle cx="11.5" cy="1.5" r="1.5" fill="white" />
    <circle cx="11.5" cy="6.5" r="1.5" fill="white" />
    <circle cx="11.5" cy="11.5" r="1.5" fill="white" />
    <circle cx="11.5" cy="16.5" r="1.5" fill="white" />
    <circle cx="16.5" cy="1.5" r="1.5" fill="white" />
    <circle cx="16.5" cy="6.5" r="1.5" fill="white" />
    <circle cx="16.5" cy="11.5" r="1.5" fill="white" />
    <circle cx="16.5" cy="16.5" r="1.5" fill="white" />
  </svg>
);
