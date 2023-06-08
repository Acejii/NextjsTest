import React, { useEffect, useState } from 'react';
import { Select, Space } from 'antd';
import axiosInstance from '@/axios/axiosInstance';
import { SearchTypeProps } from '@/interfaces/search.interface';

const { Option } = Select;

const SearchLocation: React.FC<SearchTypeProps> = ({ label, placeholder, onHandleValueChange, disableField }) => {
    const [locations, setLocations] = useState<[]>();

    useEffect(() => {
        getLocations();
    }, []);

    const getLocations = () => {
        axiosInstance
            .get('/locations')
            .then((response: any) => {
                const allLocation = response.data;
                setLocations(allLocation);
            })
            .catch((error: any) => console.log(error));
    };

    return (
        <div className='input-group'>
            <p>{label}</p>
            <Space
                style={{ width: '100%' }}
                direction='vertical'
            >
                <Select
                    mode='multiple'
                    allowClear
                    style={{ width: '100%' }}
                    placeholder={placeholder}
                    onChange={(val: string | number | null) => onHandleValueChange(val || '', 'searchLocations')}
                    maxTagCount={1}
                    disabled={disableField}
                >
                    {locations && locations.map(elem => <Option key={elem} value={elem}>{elem}</Option>)}
                </Select>
            </Space>
        </div>
    );
};

export default SearchLocation;
