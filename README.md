# leafer-x-echarts

[![npm version](https://img.shields.io/npm/v/leafer-x-echarts.svg)](https://www.npmjs.com/package/leafer-x-echarts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![LeaferX Plugin](https://img.shields.io/badge/LeaferX-Plugin-blue.svg)](https://github.com/leaferjs/leafer-x)

A **LeaferX plugin** that renders **[ECharts](https://echarts.apache.org/)** charts as **SVG** inside a Leafer canvas.  
Perfect for adding interactive data visualizations to your Leafer applications.

## ✨ Features

- Render any ECharts option as a scalable SVG image
- Fully reactive – update chart data with `updateOption()`
- Supports ECharts tooltips and legends
- **Note**: Animations are currently disabled (see Roadmap for future support)
- Integrates seamlessly with Leafer UI's event system (draggable, editable, etc.)
- Easy to use – just import and instantiate

## 📦 Installation

```bash
npm install leafer-x-echarts
```

## Example
```ts
import { Leafer } from 'leafer-ui';
import { LeaferECharts, defaultBarChartOption } from 'leafer-x-echarts';

const leafer = new Leafer({ view: 'canvas' });

const chart = new LeaferECharts({
  option: defaultBarChartOption,
  width: 600,
  height: 400,
  draggable: true,
  editable: false,
});

leafer.add(chart);
```

## 🚀 Roadmap & TODO

### Planned Features

- [ ] **Animation Support** - Enable ECharts animations in Leafer canvas
  - Currently animations are disabled due to SSR mode
  - Need to implement real-time SVG updates for smooth animations
  - Potential solution: Use requestAnimationFrame for frame-by-frame updates

- [ ] **Interactive Events** - Better integration with Leafer event system
  - Mouse hover events for tooltips
  - Click events on chart elements
  - Zoom and pan interactions

- [ ] **Performance Optimizations**
  - SVG caching for static charts
  - Partial updates for large datasets
  - WebGL renderer support (in addition to SVG)


### Current Limitations

1. **Animations are disabled** - ECharts runs in SSR mode for SVG generation
2. **Real-time updates require full re-render** - Each `updateOption()` creates new SVG
3. **Large datasets may impact performance** - No built-in virtualization

### Contributing

Feel free to open issues or pull requests for any of these features! Check the [GitHub Issues](https://github.com/sedrew/leafer-x-echarts/issues) for current discussions.
