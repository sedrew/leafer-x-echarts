# Testing leafer-x-echarts

This document describes the testing infrastructure for the `leafer-x-echarts` library (LeaferX plugin).

## Test Structure

```
tests/
├── unit/                    # Unit tests
│   └── LeaferECharts.test.ts
├── integration/            # Integration tests
│   └── leafer-integration.test.ts
├── visual/                 # Visual tests (snapshots)
│   └── snapshot.test.ts
├── __snapshots__/         # Snapshot files (auto-generated)
└── setup.ts               # Jest setup
```

## Test Types

### 1. Unit Tests
- Testing individual methods of the `LeaferECharts` class
- Testing constructor with various parameters
- Testing the `renderSVG` method
- Testing `updateOption`

### 2. Integration Tests
- Testing interaction with Leafer UI (via mocks)
- Testing multiple instances
- Testing properties (draggable, editable)
- Handling edge cases

### 3. Visual Tests (Snapshot testing)
- Comparing SVG strings
- Comparing PNG images (via sharp)
- Testing different chart types (bar, line, pie)
- Testing different canvas sizes

## Running Tests

### Installing Dependencies
```bash
npm install
```

### Running All Tests
```bash
npm test
```

### Running Specific Test Categories
```bash
# Unit tests only
npm run test:unit

# Integration tests only
npm run test:integration

# Visual tests only
npm run test:visual
```

### Additional Commands
```bash
# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# Update snapshot files
npm run test:update-snapshots
```

## Snapshot Testing

### How It Works
1. Snapshot files are created on the first test run
2. Subsequent runs compare results with snapshot files
3. If there are differences, the test fails

### Updating Snapshots
If you've made changes that should change the output:
```bash
npm run test:update-snapshots
```

### Where Snapshots Are Stored
- SVG snapshots: `tests/__snapshots__/snapshot.test.ts.snap`
- Image snapshots: `tests/__image_snapshots__/` (auto-generated)

## Technologies

- **Jest** - test framework
- **ts-jest** - TypeScript support
- **jest-image-snapshot** - image comparison
- **sharp** - SVG to PNG conversion for visual testing

## Mocks

Since `leafer-ui` requires a browser environment, tests use mocks:
- Mock `Image` class
- Mock `Platform.toURL`
- Mock decorators (`registerUI`, `boundsType`)

## Test Coverage

Current tests cover:

### For ECharts:
- [x] Basic bar chart rendering
- [x] Different chart types (line, pie)
- [x] ECharts options (legends, tooltips, axes)
- [x] Different canvas sizes
- [x] Updating options via `updateOption()`

### For Leafer UI:
- [x] Adding to Leafer canvas
- [x] Draggable and editable properties
- [x] Multiple instances
- [x] Events and interaction
- [x] Edge cases (zero dimensions, large dimensions)

## CI/CD

For CI/CD integration, it's recommended to:
1. Run tests on every commit
2. Check code coverage
3. Update snapshots only with explicit approval

## Debugging Tests

### Viewing Generated SVG
```typescript
const svg = LeaferECharts.renderSVG(option, width, height);
console.log(svg); // Output SVG to console
```

### Saving PNG for Visual Inspection
```typescript
const pngBuffer = await svgToPng(svg, width, height);
require('fs').writeFileSync('test-output.png', pngBuffer);
```

## Adding New Tests

1. Create a file in the appropriate directory
2. Import necessary modules
3. Use `describe` and `test`/`it` blocks
4. For snapshot tests, use `toMatchSnapshot()` or `toMatchImageSnapshot()`

Example new test:
```typescript
test('new chart type', () => {
  const option = { /* chart options */ };
  const svg = LeaferECharts.renderSVG(option, 400, 400);
  expect(svg).toMatchSnapshot();
});
