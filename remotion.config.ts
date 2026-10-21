import {Config} from '@remotion/cli/config';

Config.setConcurrency(2);
Config.setCodec('h264');
Config.setPixelFormat('yuv420p');
// Hardware WebGL backends failed in this Headless Shell build; tested CPU fallback.
// NVIDIA NVENC encoding is a separate path, tested with --hardware-acceleration=required.
Config.setChromiumOpenGlRenderer('swangle');
