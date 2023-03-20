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
interface Props{
  data: string,
  onChange : (value: Array<UploadFile>) => void
}
const UploadImage = (props: Props) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  useEffect(() => {
      if(props.data !== ''){
        const emptyList: UploadFile[] = [];
        const listPreConvert = props.data.split(",");
          listPreConvert.forEach((item:string,index:number) => {
            const file :UploadFile = {
                  // key: index,
                  uid: `${index}`,
                  name: item,
                  status: 'done',
                  url: `http://localhost:4000/product/${item}`,
                }
                emptyList.push(file);
          })
          setFileList([...emptyList])
      }
  }, [props.data])


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
      {fileList.length < 6 && 'Upload'}
    </Upload>

  );
};

export default UploadImage;