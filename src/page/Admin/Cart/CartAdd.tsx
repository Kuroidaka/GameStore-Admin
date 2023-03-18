import React, { useContext, useEffect, useRef, useState } from 'react';
import { InputNumber, InputRef, Select } from 'antd';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { productApi, productModel } from '~/api/product/product.api';
import { CartDetailModel } from '~/api/cart/cart.api';
// import ProductSelector from '../Product/Controller/Product_Selector';


const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  name: string;
  age: string;
  address: string;
}
interface Props {
  onChange: (value: CartDetailModel[]) => void,
  dataSource?: productModel[]
}
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const CartAdd = (props: Props) => {
  const [productList, setProductList] = useState<productModel[]>([]);
  const [dataSource, setDataSource] = useState<CartDetailModel[]>([]);
  const getProductList  = async () => {
      const productList = await productApi.search({});
      const result =  productList.data.results;
      const dataResult = result.map((item: productModel) => {
        return {
          value: item.Product_Code,
          label: item.Product_Name,
        }
      })
      setProductList(dataResult);
  }
  useEffect(() => {
   
    getProductList();
  },[])
// Handle get list cart detail  when use component update
  useEffect(() => {
    if(!!props.dataSource){
      setDataSource(props.dataSource);
    }
    
  },[props?.dataSource])
  const [count, setCount] = useState(0);
  const handleDelete = (id: React.Key) => {
    const newData = dataSource.filter((item) => item.id !== id);
    setDataSource(newData);
  };
  const handleChangeProduct = (value: string) => {
    dataSource[dataSource.length - 1].Cart_Detail_Product = value;
    // setDataSource(dataSource);
    props.onChange(dataSource)
  }

  const handleQuantity = (value : number | null) => {
    dataSource[dataSource.length - 1].Cart_Detail_Quantity = value;
    props.onChange(dataSource)
  }

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'Product Name',
      key: 'Cart_Detail_Product',
      dataIndex: 'Cart_Detail_Product',
      width: '50%',
      render: (data) => {
        return (<Select value={data} options={productList} onChange={handleChangeProduct} style={{width: '100%'}}/>)
      }
    },
    {
      title: 'Quantity',
      width: '20%',
      key: 'Cart_Detail_Quantity',
      dataIndex: 'Cart_Detail_Quantity',
      render: (data,record) => {
        console.log(record)
        return (<InputNumber  value={data} onChange={handleQuantity}  style={{width: '100%'}}/>)

      }
    },
    {
      title: 'action',
      dataIndex: 'delete',
      render: () =>
        (
          <Popconfirm title="Sure to delete?" onConfirm={() => {}}>
            <a>Delete</a>
          </Popconfirm>
        )
    },
  ];

  const handleAdd = () => {
    const newData: CartDetailModel = {
      key: count
    };
    setDataSource([...dataSource, newData]);
    setCount(count+1);
  };

  const handleSave = (row: CartDetailModel) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  })
  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add Product
      </Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};

export default CartAdd;