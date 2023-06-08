import React, { useEffect, useState } from 'react';
import SearchIn from './SearchIn';
import './Search.scss';
import SearchPropertyType from './SearchPropertyType';
import SearchPrice from './Price/SearchPrice';
import SearchLocation from './SearchLocation';
import SearchRef from './SearchRef';
import { Form } from 'antd';
import { IinitialSelectValue } from '@/interfaces/search.interface';
import SearchType from './SearchType';
// import SearchTypeCustom from './PropertyType/SearchTypeCustom';

type SearchFormProps = {
    handleValueChange: (value: object | string | number, inputName: string) => void;
    query: IinitialSelectValue;
    setQuery: React.Dispatch<React.SetStateAction<IinitialSelectValue>>;
};

const SearchForm: React.FC<SearchFormProps> = ({ handleValueChange, query, setQuery }) => {
    const [disabledField, setDisableField] = useState<boolean>(false);

    const handleSubmitForm = () => {
        setQuery(query);
    };

    useEffect(() => {
        handleSubmitForm();
    }, [query]);

    return (
        <>
            <Form
                onFinish={handleSubmitForm}
                className='form'
            >
                <SearchIn
                    label='Search in'
                    onHandleValueChange={handleValueChange}
                    disableField={disabledField}
                />
                <SearchType
                    label='Type'
                    onHandleValueChange={handleValueChange}
                    placeholder='Resale & New Development'
                    disableField={disabledField}
                />
                <SearchPropertyType
                    label='Property Type'
                    placeholder='Please select'
                    onHandleValueChange={handleValueChange}
                    disableField={disabledField}
                />
                <SearchPrice
                    label='Price'
                    onHandleValueChange={handleValueChange}
                    disableField={disabledField}
                />
                <SearchLocation
                    label='Location'
                    placeholder='Location'
                    onHandleValueChange={handleValueChange}
                    disableField={disabledField}
                />
                <SearchRef
                    label='Ref ID'
                    placeholder='Enter your text'
                    onHandleValueChange={handleValueChange}
                    setDisableField={setDisableField}
                />
                {/* <SearchTypeCustom /> */}
            </Form>
        </>
    );
};

export default SearchForm;
