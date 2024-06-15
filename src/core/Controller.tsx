import html2canvas from 'html2canvas';
import { Root, createRoot } from 'react-dom/client';
import { WrapperComponent } from './WrapperComponent';
import React from 'react';

export class ScreenShotController {
  node: HTMLElement | null = null;

  async capture({ type, quality }: { type?: string; quality?: number } = {}): Promise<
    string | undefined
  > {
    if (!this.node) {
      throw new Error('You should provide correct html node.');
    }
    return await this.captureFromNode(this.node, { type, quality });
  }

  async captureFromComponent({
    component,
    type,
    quality
  }: {
    component: JSX.Element;
    type?: string;
    quality?: number;
  }): Promise<string | undefined> {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-10000px'; // Position outside of view
    container.style.top = '-10000px'; // Position outside of view
    container.style.width = 'auto';
    container.style.height = 'auto';

    document.body.appendChild(container);

    let root: Root;

    await new Promise<void>((resolve) => {
      root = createRoot(container);
      root.render(<WrapperComponent onRender={resolve}>{component}</WrapperComponent>);
    });

    const result = await this.captureFromNode(container, { type, quality });

    root!.unmount();
    document.body.removeChild(container);

    return result;
  }

  async captureAndSave({
    name = 'img',
    extension = 'jpg',
    type,
    quality
  }: {
    name?: string;
    extension?: string;
    type?: string;
    quality?: number;
  } = {}) {
    const image = await this.capture({ type, quality });
    if (image) {
      this.saveImage(image, { name, extension });
    }
  }

  async captureAndSaveFromComponent({
    component,
    name = 'img',
    extension = 'jpg',
    type,
    quality
  }: {
    component: JSX.Element;
    name?: string;
    extension?: string;
    type?: string;
    quality?: number;
  }) {
    const image = await this.captureFromComponent({ component, type, quality });
    if (image) {
      this.saveImage(image, { name, extension });
    }
  }

  private saveImage(image: string, { name, extension }: { name: string; extension: string }) {
    const a = document.createElement('a');
    a.href = image;
    a.download = `${name}.${extension}`;
    a.click();
  }

  private async captureFromNode(
    node: HTMLElement,
    { type, quality }: { type?: string; quality?: number } = {}
  ): Promise<string | undefined> {
    try {
      const canvas = await html2canvas(node);
      const croppedCanvas = document.createElement('canvas');
      const croppedCanvasContext = croppedCanvas.getContext('2d');

      const cropPositionTop = 0;
      const cropPositionLeft = 0;
      const cropWidth = canvas.width;
      const cropHeight = canvas.height;

      croppedCanvas.width = cropWidth;
      croppedCanvas.height = cropHeight;

      croppedCanvasContext?.drawImage(
        canvas,
        cropPositionLeft,
        cropPositionTop,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      const base64Image = croppedCanvas.toDataURL(type, quality);

      return base64Image;
    } catch (error: any) {
      throw error;
    }
  }
}
