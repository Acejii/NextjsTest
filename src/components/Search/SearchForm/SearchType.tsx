import React, { useEffect, useState } from 'react';
import { Radio, RadioChangeEvent, Tag, TreeSelect } from 'antd';
// import TypeList from '../../fakedata/type.json';
import { SearchTypeProps } from '@/interfaces/search.interface';
// import tagRender from './SearchLabel';
// import tagRender from './SearchLabel';

const { SHOW_PARENT } = TreeSelect;

const SearchType: React.FC<SearchTypeProps> = ({ label, onHandleValueChange, placeholder, disableField }) => {
    const [valueRadio, setValueRadio] = useState<string>('For Sale');
    const [selectedValue, setSelectedValue] = useState<string[]>(['ForSale', '0-0-0']);

    const [labelName, setLabelName] = useState<string>('For Sale - Resale');

    const tagStyle = {
        background: 'transparent',
        color: 'grey',
        border: 'none',
        fontSize: '14px',
        paddingLeft: 8,
        paddingRight: 0,
    };

    const tagName = () => {
        const truncatedLabel =
            labelName.toString().length > 20 ? `${labelName.toString().substring(0, 20)}...` : labelName;
        return <Tag style={tagStyle}>{truncatedLabel}</Tag>;
    };

    const handleForSaleChange = (e: RadioChangeEvent) => {
        let forSaleValue = e.target.value;
        setValueRadio(forSaleValue);
        setSelectedValue(['ForSale', '0-0-0', '0-0-1']);
        setLabelName('For Sales');
    };

    const handleForRentChange = (e: RadioChangeEvent) => {
        let forRentValue = e.target.value;
        setValueRadio(forRentValue);
        setSelectedValue(['ForRent', '0-1-0', '0-1-1']);
        setLabelName('For Rent');
    };

    const TypeList = [
        {
            title: (
                <Radio.Group
                    value={valueRadio}
                    onChange={handleForSaleChange}
                >
                    <Radio value='For Sale'>For Sale</Radio>
                </Radio.Group>
            ),
            value: '0-0',
            key: '0-0',
            checkable: false,
            children: [
                {
                    title: 'Resales',
                    value: '0-0-0',
                    key: '0-0-0',
                },
                {
                    title: 'New Development',
                    value: '0-0-1',
                    key: '0-0-1',
                },
            ],
        },
        {
            title: (
                <Radio.Group
                    value={valueRadio}
                    onChange={handleForRentChange}
                >
                    <Radio value='For Rent'>For Rent</Radio>
                </Radio.Group>
            ),
            value: '0-1',
            key: '0-1',
            checkable: false,
            children: [
                {
                    title: 'For Rent long term',
                    value: '0-1-0',
                    key: '0-1-0',
                },
                {
                    title: 'For Rent short term',
                    value: '0-1-1',
                    key: '0-1-1',
                },
            ],
        },
    ];

    useEffect(() => {
        // console.log(selectedValue);
        let searchTypeValue = '';
        let searchNewDevFalse = '&searchNewDev=false';
        let searchNewDevTrue = '&searchNewDev=true';
        if (selectedValue.includes('ForSale')) {
            searchTypeValue = 'forSale';
            if (selectedValue.length === 2 && selectedValue.includes('0-0-1')) {
                onHandleValueChange(`${searchNewDevTrue}`, 'searchType');
                setLabelName('For Sales - New Development');
            } else if (selectedValue.length === 2 && selectedValue.includes('0-0-0')) {
                onHandleValueChange(`${searchTypeValue}${searchNewDevFalse}`, 'searchType');
                setLabelName('For Sales - Resale');
            } else {
                onHandleValueChange(`${searchTypeValue}${searchNewDevTrue}`, 'searchType');
                setLabelName('For Sales');
            }
        }

        if (selectedValue.includes('ForRent')) {
            if (selectedValue.length === 2 && selectedValue.includes('0-1-0')) {
                onHandleValueChange('LongTermRental', 'searchType');
                setLabelName('For rent long term');
            } else if (selectedValue.length === 2 && selectedValue.includes('0-1-1')) {
                onHandleValueChange('ShortTermRental', 'searchType');
                setLabelName('For rent short term');
            } else {
                onHandleValueChange('forRent', 'searchType');
                setLabelName('For Rent');
            }
        }
    }, [selectedValue]);

    const onHandleChange = (val: string[]) => {
        setSelectedValue(prevValue => {
            // Separate the previous state and upcoming value
            // console.log('Previous Value:', prevValue);
            // console.log('Upcoming Value:', val);

            if (val.includes('ForSale')) {
                if (prevValue.includes('0-0-0') && prevValue.length === 2) {
                    val.push('0-0-1');
                } else if (prevValue.includes('0-0-1') && prevValue.length === 2) {
                    val.push('0-0-0');
                }
            }

            if (val.includes('ForRent')) {
                if (prevValue.includes('0-1-0') && prevValue.length === 2) {
                    val.push('0-1-1');
                } else if (prevValue.includes('0-1-1') && prevValue.length === 2) {
                    val.push('0-1-0');
                }
            }

            return val; // Update the selected value
        });

        // get different value between previous and upcoming value
        const diff = val.filter(x => !selectedValue.includes(x));
        let [diffValue] = diff;
        // console.log('Diff Value:', diffValue);

        //check val include 'For Rent'
        if (val.includes('ForRent')) {
            switch (diffValue) {
                case '0-0-0':
                    setSelectedValue(['ForSale', '0-0-0']);
                    setValueRadio('For Sale');
                    break;
                case '0-0-1':
                    setSelectedValue(['ForSale', '0-0-1']);
                    setValueRadio('For Sale');
                    break;
                default:
                    break;
            }
        }
        //check val include 'For Sale'
        else if (val.includes('ForSale')) {
            switch (diffValue) {
                case '0-1-0':
                    setSelectedValue(['ForRent', '0-1-0']);
                    setValueRadio('For Rent');
                    break;
                case '0-1-1':
                    setSelectedValue(['ForRent', '0-1-1']);
                    setValueRadio('For Rent');
                    break;
                default:
                    break;
            }
        }
    };

    const tProps = {
        treeData: TypeList,
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: placeholder,
        treeDefaultExpandAll: true,
        switcherIcon: false,
        maxTagTextLength: 20,
        maxTagCount: 1,
        maxTagPlaceholder: () => '', // Hide the "+n" label
        tagRender: tagName,
        style: {
            width: '100%',
        },
    };

    return (
        <div className='input-group input-group__type'>
            <p>{label}</p>
            <TreeSelect
                {...tProps}
                disabled={disableField}
                value={selectedValue}
                onChange={onHandleChange}
            />
        </div>
    );
};

export default SearchType;
