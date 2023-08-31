import React from 'react';
import { Auth } from '../../components/auth/Auth';
import styles from './Header.module.scss';

interface PropType {
  change: boolean;
}

export const Header: React.FC<PropType> = ({ change }) => {
  return (
    <header className={styles.header}>
      <div className={styles.header_inner}>
        <h1
          className={`${styles.header_logo} ${change && styles.header_logo_change}`}
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>
          <svg
            id='outputsvg'
            xmlns='http://www.w3.org/2000/svg'
            width='40'
            height='40'
            viewBox='0 0 3000 2960'>
            <g
              id='l5gtY9QkAemkF0ofcSc0Lw6'
              className={`${styles.header_logo_g} ${change && styles.header_logo_g_change}`}>
              <title>SES_HUB</title>
              <path
                id='pxIdF8R2X'
                d='M1074 2935 c-252 -75 -468 -207 -656 -403 -239 -249 -375 -552 -409 -908 -27 -286 45 -613 191 -868 136 -237 378 -469 614 -588 249 -126 546 -184 812 -159 377 36 697 189 956 459 428 447 535 1103 271 1671 -137 296 -412 574 -704 710 -78 37 -226 90 -291 105 l-26 6 14 -46 c41 -138 39 -392 -6 -549 -11 -38 -18 -71 -15 -73 2 -2 39 -17 82 -32 125 -43 263 -121 333 -186 23 -21 35 -23 195 -29 215 -8 217 -8 213 -43 l-3 -27 -157 2 -156 3 34 -58 c18 -31 37 -63 41 -71 7 -11 65 -19 236 -30 4 -1 7 -15 7 -32 l0 -32 -108 5 -108 5 4 -86 c2 -47 0 -103 -6 -123 -8 -29 -7 -51 6 -95 13 -46 16 -107 16 -298 0 -214 -2 -249 -22 -328 -24 -96 -34 -121 -65 -155 -30 -33 -105 -30 -177 6 -67 33 -217 181 -280 275 -51 77 -28 72 -210 42 -130 -21 -361 -16 -494 11 -69 14 -91 15 -94 6 -2 -7 -34 -52 -71 -100 -133 -171 -257 -262 -357 -262 -27 0 -54 4 -60 8 -16 10 -49 79 -67 140 -39 130 -46 514 -13 655 10 43 11 69 4 95 -6 20 -8 76 -6 123 l4 87 -105 -2 -106 -1 0 25 c0 27 -2 26 187 46 53 5 57 7 68 37 6 18 22 49 35 69 l25 38 -157 -3 -158 -2 -3 27 c-4 33 3 35 221 43 l158 6 71 55 c83 64 222 136 322 165 39 12 72 23 73 24 2 1 -6 32 -17 70 -45 157 -47 411 -6 549 8 25 11 46 8 45 -4 0 -44 -11 -88 -24z'></path>
              <path
                id='pZETnQQUC'
                d='M1049 1713 c-69 -36 -99 -84 -99 -163 0 -80 30 -127 102 -163 46 -23 65 -28 96 -22 117 19 193 151 148 256 -19 46 -75 95 -123 108 -54 15 -63 14 -124 -16z m151 -62 c59 -42 63 -141 8 -193 -25 -23 -39 -28 -80 -28 -44 0 -54 4 -84 34 -28 28 -34 41 -34 78 0 109 105 169 190 109z'></path>
              <path
                id='pVIywwAfG'
                d='M1798 1731 c-49 -16 -90 -53 -114 -105 -30 -64 -30 -88 0 -153 64 -137 237 -146 317 -16 33 53 33 133 0 186 -43 70 -135 109 -203 88z m122 -79 c32 -24 52 -84 44 -129 -4 -19 -20 -47 -36 -63 -24 -24 -38 -30 -74 -30 -63 0 -98 21 -118 71 -49 121 81 227 184 151z'></path>
            </g>
          </svg>

          <div>
            <span>Powered by</span>
            <svg viewBox='0 0 1180 320' xmlns='http://www.w3.org/2000/svg'>
              <path d='m367.44 153.84c0 52.32 33.6 88.8 80.16 88.8s80.16-36.48 80.16-88.8-33.6-88.8-80.16-88.8-80.16 36.48-80.16 88.8zm129.6 0c0 37.44-20.4 61.68-49.44 61.68s-49.44-24.24-49.44-61.68 20.4-61.68 49.44-61.68 49.44 24.24 49.44 61.68z' />
              <path d='m614.27 242.64c35.28 0 55.44-29.76 55.44-65.52s-20.16-65.52-55.44-65.52c-16.32 0-28.32 6.48-36.24 15.84v-13.44h-28.8v169.2h28.8v-56.4c7.92 9.36 19.92 15.84 36.24 15.84zm-36.96-69.12c0-23.76 13.44-36.72 31.2-36.72 20.88 0 32.16 16.32 32.16 40.32s-11.28 40.32-32.16 40.32c-17.76 0-31.2-13.2-31.2-36.48z' />
              <path d='m747.65 242.64c25.2 0 45.12-13.2 54-35.28l-24.72-9.36c-3.84 12.96-15.12 20.16-29.28 20.16-18.48 0-31.44-13.2-33.6-34.8h88.32v-9.6c0-34.56-19.44-62.16-55.92-62.16s-60 28.56-60 65.52c0 38.88 25.2 65.52 61.2 65.52zm-1.44-106.8c18.24 0 26.88 12 27.12 25.92h-57.84c4.32-17.04 15.84-25.92 30.72-25.92z' />
              <path d='m823.98 240h28.8v-73.92c0-18 13.2-27.6 26.16-27.6 15.84 0 22.08 11.28 22.08 26.88v74.64h28.8v-83.04c0-27.12-15.84-45.36-42.24-45.36-16.32 0-27.6 7.44-34.8 15.84v-13.44h-28.8z' />
              <path d='m1014.17 67.68-65.28 172.32h30.48l14.64-39.36h74.4l14.88 39.36h30.96l-65.28-172.32zm16.8 34.08 27.36 72h-54.24z' />
              <path d='m1163.69 68.18h-30.72v172.32h30.72z' />
              <path d='m297.06 130.97c7.26-21.79 4.76-45.66-6.85-65.48-17.46-30.4-52.56-46.04-86.84-38.68-15.25-17.18-37.16-26.95-60.13-26.81-35.04-.08-66.13 22.48-76.91 55.82-22.51 4.61-41.94 18.7-53.31 38.67-17.59 30.32-13.58 68.54 9.92 94.54-7.26 21.79-4.76 45.66 6.85 65.48 17.46 30.4 52.56 46.04 86.84 38.68 15.24 17.18 37.16 26.95 60.13 26.8 35.06.09 66.16-22.49 76.94-55.86 22.51-4.61 41.94-18.7 53.31-38.67 17.57-30.32 13.55-68.51-9.94-94.51zm-120.28 168.11c-14.03.02-27.62-4.89-38.39-13.88.49-.26 1.34-.73 1.89-1.07l63.72-36.8c3.26-1.85 5.26-5.32 5.24-9.07v-89.83l26.93 15.55c.29.14.48.42.52.74v74.39c-.04 33.08-26.83 59.9-59.91 59.97zm-128.84-55.03c-7.03-12.14-9.56-26.37-7.15-40.18.47.28 1.3.79 1.89 1.13l63.72 36.8c3.23 1.89 7.23 1.89 10.47 0l77.79-44.92v31.1c.02.32-.13.63-.38.83l-64.41 37.19c-28.69 16.52-65.33 6.7-81.92-21.95zm-16.77-139.09c7-12.16 18.05-21.46 31.21-26.29 0 .55-.03 1.52-.03 2.2v73.61c-.02 3.74 1.98 7.21 5.23 9.06l77.79 44.91-26.93 15.55c-.27.18-.61.21-.91.08l-64.42-37.22c-28.63-16.58-38.45-53.21-21.95-81.89zm221.26 51.49-77.79-44.92 26.93-15.54c.27-.18.61-.21.91-.08l64.42 37.19c28.68 16.57 38.51 53.26 21.94 81.94-7.01 12.14-18.05 21.44-31.2 26.28v-75.81c.03-3.74-1.96-7.2-5.2-9.06zm26.8-40.34c-.47-.29-1.3-.79-1.89-1.13l-63.72-36.8c-3.23-1.89-7.23-1.89-10.47 0l-77.79 44.92v-31.1c-.02-.32.13-.63.38-.83l64.41-37.16c28.69-16.55 65.37-6.7 81.91 22 6.99 12.12 9.52 26.31 7.15 40.1zm-168.51 55.43-26.94-15.55c-.29-.14-.48-.42-.52-.74v-74.39c.02-33.12 26.89-59.96 60.01-59.94 14.01 0 27.57 4.92 38.34 13.88-.49.26-1.33.73-1.89 1.07l-63.72 36.8c-3.26 1.85-5.26 5.31-5.24 9.06l-.04 89.79zm14.63-31.54 34.65-20.01 34.65 20v40.01l-34.65 20-34.65-20z' />
            </svg>
          </div>
        </h1>

        <div className={styles.header_auth}>
          <Auth signup change={change} />
          <Auth change={change} />
        </div>
      </div>
    </header>
  );
};
