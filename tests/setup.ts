import sharp from 'sharp';

const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ toMatchImageSnapshot });

export const svgToPng = async (svgString: string, width: number, height: number): Promise<Buffer> => {
  return await sharp(Buffer.from(svgString))
    .resize(width, height)
    .png()
    .toBuffer();
};

jest.mock('leafer-ui', () => {
  return {
    Image: class MockImage {
      width: number;
      height: number;
      draggable: boolean;
      editable: boolean;
      url: string;
      
      constructor(options: any) {
        this.width = options.width || 400;
        this.height = options.height || 400;
        this.draggable = options.draggable ?? true;
        this.editable = options.editable ?? false;
        this.url = options.url || '';
      }
      
      forceRender() {

      }
    },
    Platform: {
      toURL: (data: string, type: string) => {
        return `data:image/${type}+xml;base64,${Buffer.from(data).toString('base64')}`;
      }
    },
    registerUI: () => (target: any) => target,
    boundsType: () => (target: any, propertyKey: string) => {

    }
  };
});


declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchImageSnapshot(options?: any): R;
    }
  }
}