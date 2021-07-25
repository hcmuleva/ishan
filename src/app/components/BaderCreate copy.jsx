import React,{useState,useEffect} from 'react';
import { Column, Row } from "simple-flexbox";
import { Button, Card, DatePicker, Form, Input, Modal, Select, Tabs } from "antd";
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import BackendService from '../services/BackendService';
import { Avatar } from 'antd';

import AppNavbar from './AppNavbar';


const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 14
    }
  };
export  function BaderCreate() {
  const [form] = Form.useForm();

  const { Option } = Select;
    const [mandirData,setMandirData]=useState({"pincode":''})
    const [pincodeData,setPincodeData]=useState([])
    const [checkStatus, setCheckStatus] = React.useState({
        isHostel:false,
        isTeam:false
    });
    async function getAddres(pincode){
        const addresData=await BackendService.getAddress(pincode)   
        console.log("Data",addresData.data.data)
        setPincodeData(addresData.data.data)
       
    }
   useEffect(

       ()=>{
           if(mandirData.pincode.length==6){
            getAddres(mandirData.pincode)
           }
       },[mandirData.pincode]
   )
   console.log("Mandir Data",mandirData)
   const getBaderArea =  () => {
    let mylist=[]
      return pincodeData.map((pincodeElem) => {
        console.log("PINCODE ELM ",pincodeElem)
        return (<Option value={pincodeElem.localityname} key={pincodeElem.id}>
          {pincodeElem.localityname}
        </Option>)
      }
      );
  };

  
  const onPhotoChange = ({ fileList: newFileList }) => {
      console.log("FileList", newFileList)
    // setFileList(newFileList);
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  return (
      <div>
          <AppNavbar/>
       
        <Row alignItems="center" justifyContent="space-between">
        <Form
          {...layout}
          name="basic"
          form={form}
          className="subject-details-form"
        >
          <Row style={{ width: '100%' }}>
            <Column flex="1">
            <Form.Item  
                name="pincode"  
              >
                <Input  value={mandirData.pincode}  placeholder="Enter Pincode" onChange={(e)=>{setMandirData({...mandirData,pincode:e.target.value })}} />
              </Form.Item>
             
              <Form.Item

name="BaderArea"
onChange={(e) => {
    console.log("localityname", e.target.value)
    setMandirData({ ...mandirData, localityname: e.target.value })
    console.log("Bader Area Name", e.target.value)
}}
value={mandirData.localityname}
>
<Select
    placeholder="Select Bader Area"
    optionFilterProp="children"
    filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    onChange={(value) => {
        setMandirData({ ...mandirData, localityname: value })
        console.log("AREA  Selected  in Combobox", value)
        setMandirData({ ...mandirData, localityname:value })
    }}
>
<Option>Select Value</Option>
    {getBaderArea()}
</Select>
</Form.Item>
              <Form.Item
                label="BaderName"
                name="BaderName"
                rules={[
                  {
                    required: true,
                    message: "Please input Bader Name!"
                  }
                ]}
              >
                <Input  onChange={(e)=>{setMandirData({...mandirData,mandirName:e.target.value })}}/>
              </Form.Item>

              
              <ImgCrop rotate>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        onChange={onPhotoChange}
        onPreview={onPreview}
      >
        + Upload
      </Upload>
    </ImgCrop>
            </Column>
            <Column flex="1">         
            </Column>
          </Row>

        </Form>
      </Row>
      </div>
  );
}