import { LeaferECharts } from '../../src/index';
import { defaultBarChartOption } from '../../src/mockChartOption';
import { svgToPng } from '../setup';

describe('LeaferECharts - Snapshot Tests', () => {
  describe('SVG Snapshot Tests', () => {
    test('bar chart SVG snapshot', () => {
      const svg = LeaferECharts.renderSVG(defaultBarChartOption, 400, 400);
      
      // Basic SVG validation
      expect(svg).toMatchSnapshot();
      
      // Additional assertions
      expect(svg).toContain('<svg');
      expect(svg).toContain('</svg>');
      expect(svg).toContain('width="400"');
      expect(svg).toContain('height="400"');
    });

    test('line chart SVG snapshot', () => {
      const lineChartOption: any = {
        xAxis: {
          type: 'category' as const,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value' as const
        },
        series: [{
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line' as const
        }]
      };
      
      const svg = LeaferECharts.renderSVG(lineChartOption, 400, 400);
      expect(svg).toMatchSnapshot();
    });

    test('pie chart SVG snapshot', () => {
      const pieChartOption: any = {
        tooltip: {
          trigger: 'item' as const
        },
        series: [
          {
            name: 'Access From',
            type: 'pie' as const,
            radius: '50%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      
      const svg = LeaferECharts.renderSVG(pieChartOption, 400, 400);
      expect(svg).toMatchSnapshot();
    });

    test('different dimensions SVG snapshot', () => {
      const svg1 = LeaferECharts.renderSVG(defaultBarChartOption, 800, 200);
      const svg2 = LeaferECharts.renderSVG(defaultBarChartOption, 200, 800);
      
      expect(svg1).toMatchSnapshot();
      expect(svg2).toMatchSnapshot();
      
      // Verify dimensions
      expect(svg1).toContain('width="800"');
      expect(svg1).toContain('height="200"');
      expect(svg2).toContain('width="200"');
      expect(svg2).toContain('height="800"');
    });
  });

  describe('Image Snapshot Tests (PNG)', () => {
    test('bar chart PNG snapshot', async () => {
      const svg = LeaferECharts.renderSVG(defaultBarChartOption, 400, 400);
      const pngBuffer = await svgToPng(svg, 400, 400);
      
      // Compare with snapshot
      expect(pngBuffer).toMatchImageSnapshot({
        failureThreshold: 0.01,
        failureThresholdType: 'percent'
      });
    });

    test('line chart PNG snapshot', async () => {
      const lineChartOption: any = {
        xAxis: {
          type: 'category' as const,
          data: ['A', 'B', 'C', 'D', 'E']
        },
        yAxis: {
          type: 'value' as const
        },
        series: [{
          data: [10, 20, 30, 40, 50],
          type: 'line' as const,
          smooth: true
        }]
      };
      
      const svg = LeaferECharts.renderSVG(lineChartOption, 400, 400);
      const pngBuffer = await svgToPng(svg, 400, 400);
      
      expect(pngBuffer).toMatchImageSnapshot({
        failureThreshold: 0.01,
        failureThresholdType: 'percent'
      });
    });

    test('chart with title and legend PNG snapshot', async () => {
      const chartWithTitle: any = {
        title: {
          text: 'Sales Chart',
          left: 'center' as const
        },
        legend: {
          data: ['Sales'],
          top: 'bottom' as const
        },
        xAxis: {
          type: 'category' as const,
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
        },
        yAxis: {
          type: 'value' as const
        },
        series: [{
          name: 'Sales',
          data: [120, 200, 150, 80, 70],
          type: 'bar' as const
        }]
      };
      
      const svg = LeaferECharts.renderSVG(chartWithTitle, 600, 400);
      const pngBuffer = await svgToPng(svg, 600, 400);
      
      expect(pngBuffer).toMatchImageSnapshot({
        failureThreshold: 0.01,
        failureThresholdType: 'percent'
      });
    });
  });

  describe('Update Snapshot Tests', () => {
    test('should generate different snapshots for different options', async () => {
      const option1: any = {
        ...defaultBarChartOption,
        title: { text: 'Chart 1' }
      };
      
      // Создаем безопасную копию series
      const seriesData = Array.isArray(defaultBarChartOption.series) 
        ? defaultBarChartOption.series[0]
        : { type: 'bar', data: [] };
      
      const option2: any = {
        ...defaultBarChartOption,
        title: { text: 'Chart 2' },
        series: [{
          ...seriesData,
          data: [100, 200, 300, 400, 500, 600, 700]
        }]
      };
      
      const svg1 = LeaferECharts.renderSVG(option1, 400, 400);
      const svg2 = LeaferECharts.renderSVG(option2, 400, 400);
      
      // SVG snapshots should be different
      expect(svg1).toMatchSnapshot();
      expect(svg2).toMatchSnapshot();
      expect(svg1).not.toBe(svg2);
      
      // PNG snapshots should also be different
      const png1 = await svgToPng(svg1, 400, 400);
      const png2 = await svgToPng(svg2, 400, 400);
      
      expect(png1).toMatchImageSnapshot({
        failureThreshold: 0.01,
        failureThresholdType: 'percent',
        customSnapshotIdentifier: 'bar-chart-option1'
      });
      
      expect(png2).toMatchImageSnapshot({
        failureThreshold: 0.01,
        failureThresholdType: 'percent',
        customSnapshotIdentifier: 'bar-chart-option2'
      });
    });
  });
});