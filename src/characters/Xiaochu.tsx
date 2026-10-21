// Archived vector prototype: not imported by any active composition.
// Current character visuals are model-generated PNGs in GeneratedCharacter.tsx.
import {useId} from 'react';
import {blinkAt} from '../timing/motion';

const ink = '#435164';
const mint = '#c5e0d3';
const mintShadow = '#97bbba';
const skin = '#ffe7de';

export type XiaochuProps = {frame: number; gesture?: number; expression?: 'gentle' | 'smile'; look?: number;};

// Newly drawn vector components. This does not cut or deform the approved flat PNG.
// Each hair lock, eye, head, body, arm and hand has its own drawable geometry.
export const Xiaochu = ({frame, gesture = 0, expression = 'gentle', look = 0}: XiaochuProps) => {
  const uid = useId().replace(/:/g, '');
  const wind = Math.sin(frame / 33) * 3 + Math.sin(frame / 71) * 2;
  const breathing = Math.sin(frame / 24) * 2.5;
  const tilt = Math.sin(frame / 83) * 0.65 + look * 2;
  const blink = blinkAt(frame);
  return <svg viewBox="0 0 720 1100" width="100%" height="100%" fill="none" style={{overflow: 'visible'}} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id={`${uid}-face`}><path d="M199 230 Q203 150 355 154 Q499 162 515 269 L495 359 Q481 410 380 458 Q356 476 332 458 Q245 420 217 367Z" /></clipPath>
      <clipPath id={`${uid}-iris-l`}><path d="M239 300 Q270 274 315 299 Q302 325 277 329 Q253 328 242 316Z" /></clipPath>
      <clipPath id={`${uid}-iris-r`}><path d="M389 299 Q434 273 467 300 L464 316 Q448 330 425 329 Q404 327 391 316Z" /></clipPath>
    </defs>
    <g stroke={ink} strokeWidth={2.8} strokeLinejoin="round" strokeLinecap="round">
      <g transform={`rotate(${wind * 0.35} 357 271)`}>
        <path d="M173 204 Q116 260 124 452 Q116 641 49 887 Q122 854 183 751 L171 1053 Q239 1005 280 861 L315 1036 Q402 914 430 756 L543 1014 Q568 909 552 759 Q616 838 690 848 Q582 658 581 425 Q590 226 492 173Z" fill={mint}/>
        <path d="M178 393 Q161 692 99 836 Q207 721 223 499 L236 882 Q295 721 300 491 L375 937 Q431 733 438 470 L526 934 Q521 695 488 430Z" fill={mintShadow} stroke="none"/>
      </g>
      <g transform={`translate(0 ${breathing})`}>
        <path d="M292 437 L285 541 L238 577 L354 687 L477 574 L420 536 L413 437Z" fill={skin}/>
        <path d="M293 448 L412 444 L413 510 Q358 533 289 488Z" fill="#eac1be" stroke="none"/>
        <path d="M248 540 Q197 548 169 582 Q138 662 151 815 L121 1100 H591 L571 828 Q590 692 552 590 Q533 558 466 542 L358 621Z" fill="#fffaf2"/>
        <path d="M180 646 L199 1008 L164 1100 H240 L242 712Z M522 653 L494 1015 L505 1100 H579 L553 792Z" fill="#d1d6e5" stroke="none"/>
        <path d="M247 538 L212 581 L303 708 L357 655 L413 709 L504 583 L465 539 L358 616Z" fill="#a6c4e0"/>
        <path d="M235 563 L307 672 L357 635 L408 675 L480 565 M229 574 L306 688 L357 648 L410 690 L488 577" stroke="#fffdf3" strokeWidth={5}/>
        <path d="M349 680 Q289 636 252 681 L266 742 Q302 742 348 709 L315 820 L356 794 L383 827 L369 707 Q418 745 451 734 L459 680 Q418 648 370 678Z" fill="#eeb4c5"/>
        <path d="M278 710 L345 692 L273 736Z M380 696 L445 711 L447 729Z M349 716 L329 788 L356 763 L375 803 L368 717Z" fill="#d48fa9" stroke="none"/>
        <rect x={345} y={673} width={29} height={41} rx={8} fill="#f4c8d3"/>
        <path d="M235 795 L245 906 M473 800 L465 899 M302 1000 L343 1022" />
        <g transform={`rotate(${-gesture * 32} 524 612)`}>
          <path d="M528 582 Q558 597 565 655 L594 777 Q589 801 556 807 L519 684 L492 633Z" fill="#fffaf2"/>
          <path d="M553 648 L570 779 L587 782 L565 663Z" fill="#d1d6e5" stroke="none"/>
          <g transform={`rotate(${-gesture * 38} 575 785)`}>
            <path d="M552 785 L569 886 Q578 912 597 910 Q622 901 614 877 L595 777Z" fill={skin}/>
            <path d="M569 883 Q547 866 549 852 Q557 839 568 858 L575 864 L568 813 Q570 800 579 808 L588 848 L584 803 Q589 790 596 803 L603 845 L604 812 Q610 800 615 813 L618 854 L625 832 Q633 825 636 835 L633 881 Q626 909 598 912Z" fill={skin}/>
          </g>
        </g>
        <path d="M175 595 Q145 625 140 696 L126 815 Q134 835 167 832 L196 694 L211 642Z" fill="#fffaf2"/>
        <path d="M135 817 L135 940 Q148 967 169 945 L168 827Z" fill={skin}/>
      </g>
      <g transform={`rotate(${tilt} 357 457) translate(0 ${breathing * 0.4})`}>
        <path d="M176 209 L188 30 Q233 38 296 136 L422 135 Q471 44 535 29 L529 232Z" fill={mint}/>
        <path d="M198 64 L206 185 L270 145Z M512 64 L442 146 L510 195Z" fill="#efc4c9"/>
        <path d="M209 124 L229 131 L221 144 L247 150 L237 166 L270 162 L248 190 L207 179Z M499 125 L481 136 L488 147 L462 158 L478 167 L445 174 L474 191 L509 175Z" fill="#fff7ec" stroke="none"/>
        <path d="M207 289 Q182 270 186 309 Q188 342 221 349 M500 286 Q529 272 524 312 Q520 344 492 351" fill={skin}/>
        <path d="M199 230 Q203 150 355 154 Q499 162 515 269 L495 359 Q481 410 380 458 Q356 476 332 458 Q245 420 217 367Z" fill={skin}/>
        <g clipPath={`url(#${uid}-face)`} stroke="none">
          <path d="M195 227 L500 211 L514 292 Q420 274 356 244 Q289 287 207 300Z" fill="#eac1be"/>
          <ellipse cx={253} cy={354} rx={22} ry={7} fill="#f3bbc1" opacity={0.4}/>
          <ellipse cx={447} cy={354} rx={22} ry={7} fill="#f3bbc1" opacity={0.4}/>
        </g>
        <path d="M238 272 Q276 254 310 273 M394 272 Q432 254 466 273" stroke="#839b9b" strokeWidth={3}/>
        {expression === 'smile' ? <g strokeWidth={5}><path d="M242 309 Q276 286 309 307 M395 308 Q429 286 463 309"/></g> : <>
          <g transform={`translate(0 ${305 * (1 - blink)}) scale(1 ${blink})`}>
            <path d="M239 300 Q270 274 315 299 Q302 325 277 329 Q253 328 242 316Z M389 299 Q434 273 467 300 L464 316 Q448 330 425 329 Q404 327 391 316Z" fill="#fffdf7" strokeWidth={2}/>
            <g clipPath={`url(#${uid}-iris-l)`}>
              <ellipse cx={279 + look * 3} cy={303} rx={24} ry={30} fill="#dc8eae"/>
              <path d="M253 302 H305 V329 H253Z" fill="#f2b2c5" stroke="none"/>
              <ellipse cx={280 + look * 3} cy={301} rx={8} ry={16} fill="#514057" stroke="none"/>
              <circle cx={272 + look * 3} cy={286} r={5.5} fill="white" stroke="none"/>
            </g>
            <g clipPath={`url(#${uid}-iris-r)`}>
              <ellipse cx={428 + look * 3} cy={303} rx={24} ry={30} fill="#dc8eae"/>
              <path d="M400 302 H455 V330 H400Z" fill="#f2b2c5" stroke="none"/>
              <ellipse cx={428 + look * 3} cy={301} rx={8} ry={16} fill="#514057" stroke="none"/>
              <circle cx={420 + look * 3} cy={286} r={5.5} fill="white" stroke="none"/>
            </g>
            <path d="M235 295 Q272 272 315 299 M390 299 Q434 271 472 295" strokeWidth={4.5}/>
          </g>
        </>}
        <path d="M355 345 L352 356" stroke="#d1a8ac" strokeWidth={2}/>
        <path d={expression === 'smile' ? 'M329 395 Q356 414 380 392 Q362 427 340 408Z' : 'M334 398 Q356 411 379 396'} fill={expression === 'smile' ? '#d991a9' : 'none'} strokeWidth={2.8}/>
        <path d="M177 258 Q158 170 220 130 Q277 90 352 119 Q442 88 500 142 Q545 190 528 289 L500 361 L489 252 Q469 273 441 289 L447 228 Q423 264 386 281 L395 215 Q363 259 332 284 L335 215 Q306 271 271 282 L279 210 Q247 277 216 295 L207 230 L203 351 L176 398Z" fill={mint}/>
        <path d="M194 192 Q208 150 261 135 Q222 170 207 231 L202 322 L187 366Z M386 137 Q413 160 408 211 L386 264 L395 212Z M464 159 Q496 181 489 247 L472 269 L477 218Z" fill={mintShadow} stroke="none"/>
        <path d="M352 124 Q351 174 335 216 M445 142 Q451 180 447 228 M279 210 Q300 163 325 143" stroke="#96b7b1" strokeWidth={2}/>
        <g transform={`rotate(${wind} 205 231)`}>
          <path d="M208 231 Q200 397 166 532 Q149 584 118 615 Q175 615 205 562 Q237 479 231 337Z" fill={mint}/>
          <path d="M209 372 Q196 527 159 574 Q184 522 194 434Z" fill={mintShadow} stroke="none"/>
        </g>
        <g transform={`rotate(${-wind * 0.7} 499 241)`}>
          <path d="M496 234 Q502 358 527 441 Q552 500 590 525 Q538 536 506 479 Q472 419 476 308Z" fill={mint}/>
          <path d="M497 319 Q502 441 557 504 Q514 480 493 414Z" fill={mintShadow} stroke="none"/>
        </g>
      </g>
    </g>
  </svg>;
};
