import React from "react";
import { StyleSheet, css } from "aphrodite/no-important";
import "./styles.css";
import AlbumList from "./components/AlbumList";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerTransform: 0,
      headerBackground: {
        opacity: 0,
        transform: 0
      },
      cursor: {
        x: -100,
        y: -100
      },
      isCursorFocused: false,
      isFullscreenView: false
    };

    this.handleImagesMouseOver = this.handleImagesMouseOver.bind(this);
  }

  handleImagesMouseOver(isFocused) {
    this.setState({ isCursorFocused: isFocused });
  }

  initCursor = () => {
    let clientX;
    let clientY;
    document.addEventListener("mousemove", (e) => {
      clientX = e.clientX - 32 / 2;
      clientY = e.clientY - 32 / 2;
    });

    const render = () => {
      this.setState({ cursor: { x: clientX, y: clientY } });
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  };

  componentDidMount() {
    this.initCursor();
    window.addEventListener("scroll", () => {
      if (document.documentElement.scrollTop >= 50) {
        this.setState({
          headerTransform: -20,
          headerBackground: { opacity: 1, transform: -10 }
        });
      } else if (document.documentElement.scrollTop < 100) {
        this.setState({
          headerTransform: 0,
          headerBackground: { opacity: 0, transform: 0 }
        });
      }
    });
  }

  render() {
    const albums = [
      {
        title: "Afropunk 2019",
        previewUris: [
          "https://images.squarespace-cdn.com/content/v1/5de64509046bfb2883158be7/1578412705747-V6L9ZMR81DR5F8KBFNAZ/ke17ZwdGBToddI8pDm48kGTOFuUq_RtNUMY1u9ARqW17gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1URcLscfC6PFdqp46h8ynRoQ80vLOjryN4z0Y46uBr1_PI1jjjqXrn4UFN6K2MRO3hQ/1-5.jpg?format=750w",
          "https://images.squarespace-cdn.com/content/v1/5de64509046bfb2883158be7/1578412701759-7794L268JA4YFGTKLKB9/ke17ZwdGBToddI8pDm48kCDwsXFWRSkI_cNfThN70IF7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1US3-1ITFV_pj-KDILy85-JEMGSEUekNJaqsZVb7mIkeVVMfZ_fU2mqhXiOYZfVnqnQ/1-10.jpg?format=750w",
          "https://images.squarespace-cdn.com/content/v1/5de64509046bfb2883158be7/1578412867540-RF8Y0SHB9A34GXM4C90F/ke17ZwdGBToddI8pDm48kDZEoNm-_pBvgOWuJnF8jYx7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UcrmL5YyG5UZq4u35mb4jO4xf2jt6zuCQFUDOlx8SI_GvdSfbxHJuolZmbE9-K_NDg/1-33.jpg?format=750w"
        ]
      },
      {
        title: "Wanda Lapheto",
        previewUris: [
          "https://images.squarespace-cdn.com/content/v1/5de64509046bfb2883158be7/1578569101643-DP6LCH3V83VQ604W2M07/ke17ZwdGBToddI8pDm48kKhiWhQ0o_xXEpBsL8r8nwt7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0gmXcXvEVFTLbYX9CdVcGe5RLG9W0vLkUvZYfH6QfgN_HtxwObIkSTM_jbkt1T-AbA/1-4.jpg?format=500w",
          "https://images.squarespace-cdn.com/content/v1/5de64509046bfb2883158be7/1578569112244-OKRLXXAKI114X0D1SIQ5/ke17ZwdGBToddI8pDm48kG7sD9XDCcSbSSPBAEAu3bV7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0p4Wyba38KfG317vYluk45_f1Zr7KEsSkgc_ReyRbLPxx7od9KU3giD4oesJaZKT6A/1-6.jpg?format=500w",
          "https://images.squarespace-cdn.com/content/v1/5de64509046bfb2883158be7/1578569110874-YS34D7ZQ3KLJ595076UY/ke17ZwdGBToddI8pDm48kJtdZy8UCq7eVoTOANlzdwF7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0oycmklwMHPwSb2Cr-KYzbq0SLzMdn6ISn1iJzdRNXcak95Hc4j66pEglBheq9xdTQ/1-5.jpg?format=500w"
        ]
      },
      {
        title: "S Mag Editorial",
        previewUris: [
          "https://images.squarespace-cdn.com/content/v1/5de64509046bfb2883158be7/1578566588402-AY4N7L6G2XRT56OM6P1Q/ke17ZwdGBToddI8pDm48kIzNWfZh9v0nvEHU3WAJ1tF7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0ooWhOa5cxQSJsU3rXf8luXAp4RuSF8fCIvAJcvjt_IcZoixb7Wm7IaIkEuLM8C6Ew/S+Mag-5.jpg?format=500w",
          "https://images.squarespace-cdn.com/content/v1/5de64509046bfb2883158be7/1578566559305-BXZGND6U4XGXIO0H9E0O/ke17ZwdGBToddI8pDm48kJx1dffM5XEzku2PcltQNyF7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0hGaawTDWlunVGEFKwsEdnFEPBzLZDmAkZBVqdIKUbMcnUUnBgR-Z4zEehg67J4_kg/S+Mag-3.jpg?format=500w",
          "https://images.squarespace-cdn.com/content/v1/5de64509046bfb2883158be7/1578566537868-P9L58XT7119YY4MK0Z9I/ke17ZwdGBToddI8pDm48kIzNWfZh9v0nvEHU3WAJ1tF7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0ooWhOa5cxQSJsU3rXf8luXAp4RuSF8fCIvAJcvjt_IcZoixb7Wm7IaIkEuLM8C6Ew/S+Mag-2.jpg?format=500w"
        ]
      },
      {
        title: "Filah Lah Lah",
        previewUris: [
          "https://images.squarespace-cdn.com/content/v1/5de64509046bfb2883158be7/1603261818867-XKQXKQUBDLXS0ZD7OU2P/ke17ZwdGBToddI8pDm48kDxfJicHUcqpQGEx7gyeWxd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0g9xiYCO_4ze-uEG5pWlE5PDmMMlyS0JTuNKqZftaQaNeZvK-2RFwOmAT9B6xZRC-g/Rea.+2020-20.jpg?format=750w",
          "https://images.squarespace-cdn.com/content/v1/5de64509046bfb2883158be7/1603261857265-7VEPNGSJ2G7PCJDKPMOB/ke17ZwdGBToddI8pDm48kJmIrWxNqy7Rdj31IbVqUSx7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0k5fwC0WRNFJBIXiBeNI5fIgTFyETlYwilTDnF6D741c9OR-IOxr7yBatwoViUOJYg/Rea.+2020-24.jpg?format=750w",
          "https://images.squarespace-cdn.com/content/v1/5de64509046bfb2883158be7/1603261801685-8KTK6VOVHOCB503E5B6T/ke17ZwdGBToddI8pDm48kPPJlLwfF1ZKCaao6uPxYBJ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0k6sq9GEl9ZUDkp1sRKcAyKq73LBCgj7GHSm2wXSrBl1oXcWlnrWoBiy1_RNtaPhhA/Rea.+2020-18.jpg?format=750w"
        ]
      },
      {
        title: "Bantu Space Odyssey",
        previewUris: [
          "https://images.squarespace-cdn.com/content/v1/5de64509046bfb2883158be7/1578563884357-CTP30UCF6HQ5Z8LRA2LL/ke17ZwdGBToddI8pDm48kMXRibDYMhUiookWqwUxEZ97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0luUmcNM2NMBIHLdYyXL-Jww_XBra4mrrAHD6FMA3bNKOBm5vyMDUBjVQdcIrt03OQ/1-8.jpg?format=500w",
          "https://images.squarespace-cdn.com/content/v1/5de64509046bfb2883158be7/1578563844015-YOHPI56G5FG2DQCIUFB8/ke17ZwdGBToddI8pDm48kMXRibDYMhUiookWqwUxEZ97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0luUmcNM2NMBIHLdYyXL-Jww_XBra4mrrAHD6FMA3bNKOBm5vyMDUBjVQdcIrt03OQ/1-6.jpg?format=500w",
          "https://images.squarespace-cdn.com/content/v1/5de64509046bfb2883158be7/1578563996925-3SNAWO43W8QYKBZYVGK4/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/1-13.jpg?format=750w"
        ]
      }
    ];

    const styles = StyleSheet.create({
      cursor: {
        borderRadius: "50%",
        pointerEvents: "none",
        position: "absolute",
        transition:
          "transform .2s ease, opacity .25s, background .4s linear, width .25s linear, height .25s linear",
        mixBlendMode: "difference",
        zIndex: "100",
        willChange: "transform width height",
        transform: `translate3d(${this.state.cursor.x}px, ${this.state.cursor.y}px, 0)`
      },
      cursorFocused: {
        background: "#fff",
        border: "0 solid #fff",
        height: "16px",
        width: "16px"
      },
      cursorUnfocused: {
        background: "transparent",
        border: "2px solid #fff",
        height: "32px",
        width: "32px"
      },
      headerBackground: {
        background: "#0C0C0C",
        height: "64px",
        left: 0,
        opacity: `${this.state.headerBackground.opacity}`,
        position: "fixed",
        top: "0",
        transform: `translateY(${this.state.headerBackground.transform}px)`,
        transition:
          "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity .35s linear",
        transitionDelay: "100ms",
        width: "100vw",
        zIndex: "100"
      },
      header: {
        "@media (min-width: 700px)": {
          padding: "0 64px"
        },
        display: "flex",
        height: "64px",
        justifyContent: "space-between",
        paddingRight: "24px",
        position: "fixed",
        zIndex: "100",
        width: "100%",
        transition: "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        transform: `translateY(${this.state.headerTransform}px)`
      },
      headerTitle: {
        "@media screen and (min-width: 700px)": {
          alignItems: "center",
          flexDirection: "row"
        },
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "column",
        paddingTop: "12px"
      },
      logo: {
        color: "#fff",
        fontFamily: "Avenir Next World",
        fontSize: "14px",
        fontWeight: "900",
        letterSpacing: "1px",
        textDecoration: "none",
        textTransform: "uppercase",
        marginRight: "4px",
        textAlign: "left"
      },
      subTitle: {
        color: "var(--primary-color)",
        fontFamily: "Macklin Display",
        fontWeight: "500",
        fontStyle: "italic"
      },
      headerNav: {
        alignItems: "center",
        display: "flex",
        height: "48px"
      },
      aboutNav: {
        "@media (min-width: 700px)": {
          display: "block"
        },
        color: "#fff",
        display: "none",
        fontFamily: "Avenir Next World",
        fontSize: "14px",
        fontVariantCaps: "all-small-caps",
        fontWeight: "500",
        letterSpacing: "3px",
        padding: "0 24px",
        position: "relative",
        textTransform: "uppercase",
        width: "auto"
      },

      textButton: {
        alignItems: "center",
        background: "none",
        border: "none",
        display: "flex",
        cursor: "pointer",
        height: "48px",
        justifyContent: "center",
        outline: "none",
        width: "48px"
      }
    });

    const menuIcon = (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 21H36"
          stroke="#F3F3F3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 27H36"
          stroke="#F3F3F3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    return (
      <div className="App">
        <div
          className={
            this.state.isCursorFocused
              ? css(styles.cursor, styles.cursorFocused)
              : css(styles.cursor, styles.cursorUnfocused)
          }
        ></div>
        <div className={css(styles.headerBackground)}></div>
        <header className={css(styles.header)}>
          <div className={css(styles.headerTitle)}>
            <a className={css(styles.logo)} href="home">
              Kgomotso Neto
            </a>
            <p className={css(styles.subTitle)}>/Work</p>
          </div>
          <div className={css(styles.headerNav)}>
            <button className={css(styles.textButton, styles.aboutNav)}>
              about
            </button>
            <button className={css(styles.textButton)}>{menuIcon}</button>
          </div>
        </header>
        <AlbumList
          isFullscreenView={this.state.isFullscreenView}
          items={albums}
          ImagesMouseOver={(isFocused) => this.handleImagesMouseOver(isFocused)}
        />
      </div>
    );
  }
}
