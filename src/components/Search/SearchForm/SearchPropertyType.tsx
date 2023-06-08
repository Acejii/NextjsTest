import React, { useState, useEffect } from 'react';
import axiosInstance from '@/axios/axiosInstance';
import { TreeSelect, TreeSelectProps } from 'antd';
import { AxiosResponse } from 'axios';
import { SearchTypeProps } from '@/interfaces/search.interface';

const { SHOW_PARENT } = TreeSelect;

interface PropertyTypeProps {
    title: string;
    value: string;
    key: string;
    children?: PropertyTypeProps[];
}

const SearchPropertyType: React.FC<SearchTypeProps> = ({ label, placeholder, disableField, onHandleValueChange }) => {
    const [propertyType, setPropertyType] = useState<PropertyTypeProps[]>();

    useEffect(() => {
        getPropertyType();
    }, []);

    const getPropertyType = () => {
        axiosInstance
            .get('/propertyTypes')
            .then((response: AxiosResponse) => {
                const allPropertyType = response.data;
                setPropertyType(allPropertyType);
            })
            .catch((error: any) => console.log(error));
    };

    const tProps: TreeSelectProps<PropertyTypeProps> = {
        treeCheckable: true,
        treeData: propertyType,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: placeholder,
        maxTagCount: 1,
        allowClear: true,
        treeDefaultExpandAll: true,
        style: {
            width: '100%',
        },
    };

    return (
        <div className='input-group'>
            <p>{label}</p>
            <TreeSelect
                disabled={disableField}
                {...tProps}
                onChange={val => onHandleValueChange(val, 'searchPropertyTypes')}
            />
        </div>
    );
};

export default SearchPropertyType;
