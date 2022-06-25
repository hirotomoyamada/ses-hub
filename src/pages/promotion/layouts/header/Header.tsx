import React from "react";
import { Auth } from "../../components/auth/Auth";
import styles from "./Header.module.scss";

interface PropType {
  change: boolean;
}

export const Header: React.FC<PropType> = ({ change }) => {
  return (
    <header className={styles.header}>
      <div className={styles.header_inner}>
        <button
          onClick={() =>
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
          }
        >
          <h1>
            <svg
              className={`${styles.header_logo} ${
                change && styles.header_logo_change
              }`}
              id="outputsvg"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 3000 2960"
            >
              <g
                id="l5gtY9QkAemkF0ofcSc0Lw6"
                className={`${styles.header_logo_g} ${
                  change && styles.header_logo_g_change
                }`}
              >
                <title>SES_HUB</title>
                <path
                  id="pxIdF8R2X"
                  d="M1074 2935 c-252 -75 -468 -207 -656 -403 -239 -249 -375 -552 -409 -908 -27 -286 45 -613 191 -868 136 -237 378 -469 614 -588 249 -126 546 -184 812 -159 377 36 697 189 956 459 428 447 535 1103 271 1671 -137 296 -412 574 -704 710 -78 37 -226 90 -291 105 l-26 6 14 -46 c41 -138 39 -392 -6 -549 -11 -38 -18 -71 -15 -73 2 -2 39 -17 82 -32 125 -43 263 -121 333 -186 23 -21 35 -23 195 -29 215 -8 217 -8 213 -43 l-3 -27 -157 2 -156 3 34 -58 c18 -31 37 -63 41 -71 7 -11 65 -19 236 -30 4 -1 7 -15 7 -32 l0 -32 -108 5 -108 5 4 -86 c2 -47 0 -103 -6 -123 -8 -29 -7 -51 6 -95 13 -46 16 -107 16 -298 0 -214 -2 -249 -22 -328 -24 -96 -34 -121 -65 -155 -30 -33 -105 -30 -177 6 -67 33 -217 181 -280 275 -51 77 -28 72 -210 42 -130 -21 -361 -16 -494 11 -69 14 -91 15 -94 6 -2 -7 -34 -52 -71 -100 -133 -171 -257 -262 -357 -262 -27 0 -54 4 -60 8 -16 10 -49 79 -67 140 -39 130 -46 514 -13 655 10 43 11 69 4 95 -6 20 -8 76 -6 123 l4 87 -105 -2 -106 -1 0 25 c0 27 -2 26 187 46 53 5 57 7 68 37 6 18 22 49 35 69 l25 38 -157 -3 -158 -2 -3 27 c-4 33 3 35 221 43 l158 6 71 55 c83 64 222 136 322 165 39 12 72 23 73 24 2 1 -6 32 -17 70 -45 157 -47 411 -6 549 8 25 11 46 8 45 -4 0 -44 -11 -88 -24z"
                ></path>
                <path
                  id="pZETnQQUC"
                  d="M1049 1713 c-69 -36 -99 -84 -99 -163 0 -80 30 -127 102 -163 46 -23 65 -28 96 -22 117 19 193 151 148 256 -19 46 -75 95 -123 108 -54 15 -63 14 -124 -16z m151 -62 c59 -42 63 -141 8 -193 -25 -23 -39 -28 -80 -28 -44 0 -54 4 -84 34 -28 28 -34 41 -34 78 0 109 105 169 190 109z"
                ></path>
                <path
                  id="pVIywwAfG"
                  d="M1798 1731 c-49 -16 -90 -53 -114 -105 -30 -64 -30 -88 0 -153 64 -137 237 -146 317 -16 33 53 33 133 0 186 -43 70 -135 109 -203 88z m122 -79 c32 -24 52 -84 44 -129 -4 -19 -20 -47 -36 -63 -24 -24 -38 -30 -74 -30 -63 0 -98 21 -118 71 -49 121 81 227 184 151z"
                ></path>
              </g>
            </svg>
          </h1>
        </button>
        <div className={styles.header_auth}>
          <Auth signup change={change} />
          <Auth change={change} />
        </div>
      </div>
    </header>
  );
};
