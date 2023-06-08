import React, { useMemo } from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';
import { SearchTypeProps } from '@/interfaces/search.interface';

const SearchRef: React.FunctionComponent<SearchTypeProps> = ({ label, onHandleValueChange, setDisableField }) => {
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        onHandleValueChange(val, 'searchRefId');
    };

    const handleFocus = () => {
        setDisableField!(true);
    };
    const handleBlur = () => {
        setDisableField!(false);
    };

    const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 800), []);

    return (
        <div className='input-group form__refId pd-right-16 pd-left-8'>
            <label
                className='form__label'
                htmlFor=''
            >
                {label}
            </label>
            <Input
                onFocus={handleFocus}
                onBlur={handleBlur}
                allowClear
                placeholder='Enter your text'
                onChange={debouncedChangeHandler}
            />
        </div>
    );
};

export default SearchRef;
