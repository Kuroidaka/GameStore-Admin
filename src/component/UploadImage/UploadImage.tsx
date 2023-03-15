import { Upload } from 'antd';
import { useEffect, useState } from 'react';
// import ImgCrop from 'antd-img-crop';
import type { UploadFile, UploadProps, RcFile } from 'antd/es/upload/interface';
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const UploadImage = (props: any) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  useEffect(  () => {
    const fileList: UploadFile[] = [
      {
        uid: '0',
        name: props.data?.Product_Images,
        status: 'done',
        url: `http://localhost:4000/product/${props.data?.Product_Images}`,
        percent: 33,
      },
    ]
    if(!!props.data){

      setFileList(fileList)
    }
  },[props.data])


  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    props.onChange(newFileList);
    
  };

  return (

    <Upload
      listType="picture-card"
      fileList={fileList}
      onChange={onChange}
      name={"product"}
    >
      {fileList.length < 3 && ' Upload'}
    </Upload>

  );
};

export default UploadImage;