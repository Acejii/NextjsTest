import React, { useMemo } from 'react';
import { InputNumber, Space } from 'antd';
import { SearchTypeProps } from '@/interfaces/search.interface';
import { debounce } from 'lodash';

const PriceFrom: React.FC<SearchTypeProps> = ({ onHandleValueChange, disableField }) => {
    const changeHandler = (val: string | number | null) => {
        onHandleValueChange(val || '', 'searchPriceFrom');
    };

    const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 500), [onHandleValueChange]);

    return (
        <Space>
            <InputNumber
                placeholder='From'
                controls={false}
                prefix='$'
                defaultValue=''
                min={'0'}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                onChange={debouncedChangeHandler}
                disabled={disableField}
            />
        </Space>
    );
};
export default PriceFrom;
