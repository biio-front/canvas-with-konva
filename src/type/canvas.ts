export type CanvasElement = {
  className: string;
  id: string;
  styles: {
    posX: number;
    posY: number;
    color?: string;
    fontSize?: string;
    fontFamily?: string;
    fontWeight?: string;
    textAlign?: 'left' | 'center' | 'right';
  };
};

export type Background = {
  color: string;
  image?: string;
};

export type Canvas = {
  background: Background;
  items: CanvasElement[];
};
