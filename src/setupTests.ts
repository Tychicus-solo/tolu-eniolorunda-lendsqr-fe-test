import "@testing-library/jest-dom";

if (typeof globalThis.TextEncoder === "undefined") {
  globalThis.TextEncoder = class TextEncoder {
    encode(str: string): Uint8Array {
      const buf = new ArrayBuffer(str.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < str.length; i++) {
        view[i] = str.charCodeAt(i);
      }
      return view;
    }
  } as any;
}

if (typeof globalThis.TextDecoder === "undefined") {
  globalThis.TextDecoder = class TextDecoder {
    decode(arr?: Uint8Array): string {
      if (!arr) return "";
      return String.fromCharCode(...Array.from(arr));
    }
  } as any;
}
