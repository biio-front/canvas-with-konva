export type Canvas = {
  background: Background;
  items: CanvasElement[];
};

export type CanvasElement = {
  type: string;
  className: string;
  id: string;
  styles: ElementStyle;
  text?: string;
  image?: { src: string; alt: string };
};

export type Background = {
  color: string;
  image?: string;
};

export type ElementStyle = {
  posX: number;
  posY: number;
  width?: number;
  height?: number;
  zIndex: number;
} & TextStyle &
  ShapeStyle;

export type TextStyle = {
  color?: string;
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
