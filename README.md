<h1 align="center">
	React Component Screenshot</br>
	<a href="https://www.npmjs.org/package/react-component-screenshot"><img src="https://img.shields.io/npm/v/react-component-screenshot.svg?style=flat" alt="npm"></a> <a href="https://travis-ci.org/developit/react-component-screenshot"><img src="https://travis-ci.org/developit/react-component-screenshot.svg?branch=master" alt="travis"></a> <a href="https://licenses.dev/npm/react-component-screenshot"><img src="https://licenses.dev/b/npm/react-component-screenshot" alt="licenses" /></a>
</h1>
<p align="center">React component to take <b>screenshot of the component</b>.</p>

---

## ✨ Features

- 📸 **Take Screenshot**: Take screenshot of the component.
- 📦 **Lightweight**: Only 1KB gzipped.
- 🌐 **Cross Browser**: Works in all modern browsers.
- 🛠 **Easy to Use**: Just wrap your component with `Screenshot` component.
- 📜 **Typescript**: Written in typescript.

## 🔧 Installation

```sh
npm install react-component-screenshot
```

Peer dependencies: `react`, `html2canvas`.

```sh
npm install react html2canvas --save
```

## 🚀 Usage

### 📋 Basic Usage

Wrap your component with `ScreenShot` component and pass the `controller` prop.

```tsx
import { ScreenShotController, ScreenShot } from 'react-component-screenshot';

export function Example() {
  // Create a controller
  const controller = new ScreenShotController();

  const takeCapture = () => {
    // Capture and save the screenshot
    controller.captureAndSave({
      name: 'my-awesome-component',
      extension: 'jpg',
      type: 'image/jpeg',
      quality: 1
    });
  };

  // Wrap your component with ScreenShot component and pass the controller
  return (
    <ScreenShot controller={controller}>
      <div className="flex flex-col gap-2">
        <h1>My awesome Component</h1>
        <p>Some content</p>
        <button onClick={takeCapture}>take Capture</button>
      </div>
    </ScreenShot>
  );
}
```

### 🔍 Getting the Image as Base64

If you prefer to obtain the image as a base64 string, it's also very easy. 🚀 Just follow this example:

```tsx
import { ScreenShotController, ScreenShot } from 'react-component-screenshot';

export function Example() {
  // Create a controller
  const controller = new ScreenShotController();

  const takeCapture = () => {
    // Capture and get the screenshot as base64 string
    controller.capture().then((base64) => {
      console.log(base64);
    });
  };

  ...
}
```

🖼️ Capture Components Not in the DOM

Need to capture a component that's not in the DOM? No problem! 🎉 (Obviusly You don't even need to use the ScreenShot component for this.)

```tsx
import { ScreenShotController, ScreenShot } from 'react-component-screenshot';

export function Example() {
  // Create a controller
  const controller = new ScreenShotController();

  const takeCapture = () => {
    // Capture and save the screenshot
    controller.captureAndSaveFromComponent({
      component: (
        <div>
          <h1>My awesome component</h1>
          <p>Some content</p>
        </div>
      ),
      name: "my-awesome-component",
      extension: "png",
      type: "image/png",
      quality: 1,
    });
  };

  ...
}
```

## 🤝 Contributions

Contributions are welcome. If you find an issue or have an idea to improve react-component-screenshot, feel free to open an issue or submit a pull request. 🚀

## 📜 License

Licensed as MIT open source. 📜
