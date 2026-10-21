# 小初 · 那称之为世界 / Xiaochu World MV

基于 **Remotion + React + TypeScript** 的日系赛璐璐风格 MV 工程。为花譜（KAF）《それを世界と言うんだね》制作的粉丝作品，包含可独立修改的镜头、图像模型生成的人物与场景、日中双语 MG 字幕。

![小初角色与视觉方向](assets/concepts/xiaochu-text-only-v4.png)

## 内容

- 1920×1080、30 FPS，7625 帧，约 4 分 14 秒，34 个镜头。
- 54 组日中双语字幕：日文逐字入场、遮罩/短弧线及逐词强调，中文同步整句显示。
- 8 张透明人物关键姿态/近景，3 张背景，4 张早期概念图，及对应生成提示词。
- 视差、镜头缓推、纸页/花瓣/星光、纸飞机、世界连线、Three.js / React Three Fiber 纸片和转场。
- 工程默认可无声预览。歌曲音频、原曲视频、含音乐成片、模型权重和工具缓存不在仓库内。

## 安装与预览

需要 Node.js 22 和 npm。安装使用锁文件，缓存保存在仓库内 `.cache/npm`。

```bash
git clone https://github.com/tooxtox/xiaochu-world-mv.git
cd xiaochu-world-mv
npm ci
npm run typecheck
npm run studio
```

打开 http://localhost:3000/FullMV-JA-ZH 。首次渲染时 Remotion 可能下载浏览器；需要在容量充足的磁盘安装工程。

## 加入自己的音频

把有权使用的完整音轨放到 `public/audio/song.wav`，复制 `props.example.json` 为 `props.local.json`。在 Studio 右侧 Props 中将 `audioSrc` 从 `null` 改为 `audio/song.wav`。画面与字幕时间轴不会因为文件路径变化而自动重新对齐；替换为其他版本歌曲时需校对。

```bash
npm run render:full -- --props=props.local.json
# 支持 NVIDIA 硬件编码的环境：
npm run render:nvenc -- --props=props.local.json
```

默认导出无声视频：`npm run render:full`。输出位于 `out/`，已忽略。两种渲染命令都采用并发 2；`render:full` 用通用 H.264 软件编码，`render:nvenc` 要求硬件编码可用。浏览器 3D 默认 swangle，以兼容本项目测试过的 Headless Shell。

## 修改入口

| 文件/目录 | 用途 |
| --- | --- |
| `src/compositions/fullStoryboard.ts` | 分镜起止、场景、姿态、景别 |
| `src/compositions/FullMV.tsx` | 全曲合成、音频 Props、转场 |
| `src/scenes/FullWorlds.tsx` | 场景与环境运动 |
| `src/effects/` | 3D 纸片与间奏图形 |
| `src/typography/BilingualLyrics.tsx` | 双语 MG |
| `src/full-data.json` | 帧级歌词、逐词时间与节奏包络 |
| `public/characters/` / `public/backgrounds/` | MV 实际使用的生成图片 |
| `assets/concepts/` / `assets/prompts/` | 历史概念图与生成提示词 |
| [分镜索引](docs/storyboard.md) | 34 个镜头的时间与内容 |
| [素材索引](ASSETS.md) | 人物、背景与提示词对应关系 |

人物素材是完整透明关键姿态；当前采用姿态切换、镜头与轻微整体保持动作，尚无身体部件分层、骨骼绑定或完整行走循环。旧的 SVG 人物原型源码保留作历史记录，当前完整 MV 不使用它。字体为包含当前工程字符的精简子集；新增歌词时需补充字体字符，详见 `public/fonts/README.md`。

## 验证

```bash
npm run audit
npm run typecheck
npm run still
```

原本机的完整成片已完成 7625 帧导出、全片解码及头/中/尾音轨偏移检查。公开副本另外验证默认无音频渲染和素材完整性。

## 许可

原创代码、文档、提示词与项目生成插画按 [MIT](LICENSE) 开放；字体使用 SIL OFL 1.1。歌曲及歌词等第三方内容不因本仓库而变更许可。详见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
