import {useEffect, useState} from 'react';
import {cancelRender, continueRender, delayRender, staticFile} from 'remotion';

let ready: Promise<void> | undefined;
export const useMVFonts = () => {
  const [handle] = useState(() => delayRender('Load local Japanese and Chinese fonts'));
  useEffect(() => {
    let active = true;
    ready ??= Promise.all([
      new FontFace('MVJP', `url(${staticFile('fonts/MVJP-Subset.otf')})`, {weight: '700'}).load(),
      new FontFace('MVSC', `url(${staticFile('fonts/MVSC-Subset.otf')})`, {weight: '700'}).load(),
    ]).then(fonts => {fonts.forEach(font => document.fonts.add(font));});
    ready.then(() => {if (active) continueRender(handle);}).catch(error => {if (active) cancelRender(error);});
    return () => {active = false;};
  }, [handle]);
};
