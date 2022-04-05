export type Canvas = {
  background: Background;
  items: CanvasElement[];
};

export type ElementType = 'Text' | 'Rect' | 'Circle';
export type CanvasElement = {
  className: ElementType | '';
  attrs: ElementStyle;
  image?: { src: string; alt: string };
};

export type Background = {
  color: string;
  image?: string;
};

export type ElementStyle = {
  id: string;
  zIndex: number;
  x: number;
  y: number;
  width?: number;
  height?: number;
} & TextStyle &
  ShapeStyle;

export type TextStyle = {
  text?: string;
  fill?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
};

export type ShapeStyle = {
  color?: string;
  borderWidth?: string;
  borderStyle?: string;
  borderColor?: string;
};
