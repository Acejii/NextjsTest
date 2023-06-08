import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import { SearchTypeProps } from '@/interfaces/search.interface';

const SearchIn: React.FC<SearchTypeProps> = ({ label, onHandleValueChange, disableField }) => {
    const [value, setValue] = useState<string>('network');

    const onChange = (e: RadioChangeEvent) => {
        onHandleValueChange(e.target.value, 'searchIn');
        setValue(e.target.value);
    };

    return (
        <div className='input-group search-in pd-left-16 mg-b-n-8'>
            <p>{label}</p>
            <Radio.Group
                onChange={onChange}
                value={value}
                defaultValue={1}
                className='search-in__group'
            >
                <Radio
                    className='search-in__radio'
                    value={'network'}
                >
                    Network
                </Radio>
                <Radio
                    className='search-in__radio'
                    value={'ownProperty'}
                >
                    Own Property
                </Radio>
            </Radio.Group>
        </div>
    );
};

export default SearchIn;
