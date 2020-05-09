export interface ITool {
    id: string;
    readonly svgType: string;
  }
export interface IImage extends ITool {
    id: string;
    readonly svgType: string;
    readonly href: string;
    readonly x: number;
    readonly y: number;
    width: number;
    height: number;
    decoding: string;   // 'auto', 'sync', 'async'
    preserveAspectRatio: string;    // 'none'
  }