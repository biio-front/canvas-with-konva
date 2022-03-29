import { ChangeEventHandler, useState } from 'react';

export type UseImageFileInput = {
  file: File | undefined;
  fileName: string;
  onChange: ChangeEventHandler;
  thumbnail: string;
};

export const useFileInput = () => {
  const [file, setFile] = useState<File>();
  const [fileName, setFileName] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = event.target.files || [];
    const changedFile = targetFile[0];
    const changedFileName = targetFile[0]?.name;

    setFile(changedFile);
    setFileName(changedFileName);
  };

  return { file, fileName, onChange };
};

export const useImageInput = (imageUrl: string): UseImageFileInput => {
  const { file, fileName, onChange: fileInputOnchange } = useFileInput();
  const [thumbnail, setThumbnail] = useState(imageUrl);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = event.target.files || [];
    const changedFile = targetFile[0];

    if (changedFile) {
      fileInputOnchange(event);

      const reader = new FileReader();

      reader.readAsDataURL(changedFile);
      reader.onload = (readEvent: any) => {
        setThumbnail(readEvent.target.result);
      };
    }
  };

  return { file, fileName, onChange, thumbnail };
};
