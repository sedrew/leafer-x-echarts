import { LeaferECharts } from '../../src/index';
import { defaultBarChartOption } from '../../src/mockChartOption';
import { svgToPng } from '../setup';

describe('LeaferECharts - Unit Tests', () => {
  describe('Constructor', () => {
    test('should create instance with default options', () => {
      const chart = new LeaferECharts();
      
      expect(chart).toBeInstanceOf(LeaferECharts);
      expect(chart.width).toBe(400);
      expect(chart.height).toBe(400);
      expect(chart.draggable).toBe(true);
      expect(chart.editable).toBe(false);
      expect(chart.option).toEqual({});
      expect(chart.url).toContain('data:image/svg+xml;base64');
    });

    test('should create instance with custom options', () => {
      const chart = new LeaferECharts({
        option: defaultBarChartOption,
        width: 600,
        height: 300,
        draggable: false,
        editable: true,
      });
      
      expect(chart.width).toBe(600);
      expect(chart.height).toBe(300);
      expect(chart.draggable).toBe(false);
      expect(chart.editable).toBe(true);
      expect(chart.option).toEqual(defaultBarChartOption);
    });

    test('should handle empty option object', () => {
      const chart = new LeaferECharts({ option: {} });
      expect(chart.option).toEqual({});
      expect(chart.url).toContain('data:image/svg+xml;base64');
    });
  });

  describe('renderSVG static method', () => {
    test('should generate SVG string for bar chart', () => {
      const svg = LeaferECharts.renderSVG(defaultBarChartOption, 400, 400);
      
      expect(typeof svg).toBe('string');
      expect(svg).toContain('<svg');
      expect(svg).toContain('</svg>');
      expect(svg).toContain('width="400"');
      expect(svg).toContain('height="400"');
    });

    test('should generate SVG with different dimensions', () => {
      const svg = LeaferECharts.renderSVG(defaultBarChartOption, 800, 200);
      
      expect(svg).toContain('width="800"');
      expect(svg).toContain('height="200"');
    });

    test('should handle empty option', () => {
      const svg = LeaferECharts.renderSVG({}, 400, 400);
      
      expect(svg).toContain('<svg');
      expect(svg).toContain('</svg>');
    });
  });

  describe('updateOption method', () => {
    test('should update chart option and URL', () => {
      const chart = new LeaferECharts({ option: defaultBarChartOption });
      const originalUrl = chart.url;
      
      const newOption = {
        ...defaultBarChartOption,
        title: { text: 'Updated Chart' }
      };
      
      chart.updateOption(newOption);
      
      expect(chart.option).toEqual(newOption);
      expect(chart.url).not.toBe(originalUrl);
      expect(chart.url).toContain('data:image/svg+xml;base64');
    });

    test('should update with empty option', () => {
      const chart = new LeaferECharts({ option: defaultBarChartOption });
      
      chart.updateOption({});
      
      expect(chart.option).toEqual({});
      expect(chart.url).toContain('data:image/svg+xml;base64');
    });

    test('should preserve dimensions when updating', () => {
      const chart = new LeaferECharts({
        option: defaultBarChartOption,
        width: 500,
        height: 500,
      });
      
      const newOption = { ...defaultBarChartOption, series: [] };
      chart.updateOption(newOption);
      
      expect(chart.width).toBe(500);
      expect(chart.height).toBe(500);
    });
  });

  describe('Integration with ECharts', () => {
    test('should generate valid SVG structure', () => {
      const svg = LeaferECharts.renderSVG(defaultBarChartOption, 400, 400);
      
      // Basic SVG validation
      expect(svg.startsWith('<svg')).toBe(true);
      expect(svg.endsWith('</svg>')).toBe(true);
      expect(svg).toMatch(/<svg[^>]*width="400"[^>]*>/);
      expect(svg).toMatch(/<svg[^>]*height="400"[^>]*>/);
      
      // Should contain some chart elements (path is guaranteed, g may not be present)
      expect(svg).toContain('<path');
      // <g> may or may not be present depending on ECharts version
    });

    test('should handle animations in SSR mode', () => {
      const svg = LeaferECharts.renderSVG({
        ...defaultBarChartOption,
        animation: true,
        animationDuration: 1000,
      }, 400, 400);
      
      // SVG should still be generated even with animation options
      expect(typeof svg).toBe('string');
      expect(svg).toContain('<svg');
      expect(svg).toContain('</svg>');
    });
  });
});