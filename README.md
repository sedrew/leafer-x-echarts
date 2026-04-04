# leafer-x-echarts

[![npm version](https://img.shields.io/npm/v/leafer-x-echarts.svg)](https://www.npmjs.com/package/leafer-x-echarts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A custom Leafer UI element that renders **[ECharts](https://echarts.apache.org/)** charts as **SVG** inside a Leafer canvas.  
Perfect for adding interactive data visualizations to your Leafer applications.

## ✨ Features

- Render any ECharts option as a scalable SVG image
- Fully reactive – update chart data with `updateOption()`
- Supports all ECharts features (tooltips, legends, animations – though animations are disabled in SSR mode)
- Integrates seamlessly with Leafer UI's event system (draggable, editable, etc.)
- Lightweight plugin architecture – register once and use everywhere

## 📦 Installation

```bash
npm install leafer-echarts
```

## Example
```ts
import { Leafer } from 'leafer-ui';
import { LeaferECharts, defaultBarChartOption } from 'leafer-echarts';

const leafer = new Leafer({ view: 'canvas' });

const chart = new LeaferECharts({
  option: defaultBarChartOption,
  width: 600,
  height: 400,
  draggable: true,
  editable: false,
});

leafer.add(chart);