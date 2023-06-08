'use client'

import React, { useEffect, useRef, useState } from 'react';
import './search.scss';
import SearchForm from '@/components/Search/SearchForm';
import ResultPage from '@/components/Search/Results/ResultPage';
import { DataProps } from '@/interfaces/search.interface';
import axiosInstance from '@/axios/axiosInstance';
import { IinitialSelectValue } from '@/interfaces/search.interface';

const initialSelectValue: IinitialSelectValue = {
    searchIn: 'network',
    searchType: 'forSale&searchNewDev=false',
    searchPropertyTypes: [],
    searchLocations: [],
    searchPriceFrom: 0,
    searchPriceTo: 0,
    searchRefId: '',
    sortName: 'price',
    sortOrder: 'asc',
};

const initialData: DataProps = {
    count: 0,
    duration: { DB: 0, OS: 0, TT: 0 },
    offset: 0,
    resales: [],
    size: 0,
    success: false,
    total: 0,
};

const Search: React.FC = () => {
    const { current: pageSize } = useRef(20);
    const [data, setData] = useState<DataProps>(initialData);
    const [offset, setOffset] = useState<number>(pageSize);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [selectedList, setSelectedList] = useState<number[]>([]);
    const [query, setQuery] = useState<IinitialSelectValue>({
        ...initialSelectValue,
    });

    const fetchData = async (size = pageSize, offset = 0) => {
        try {
            setLoading(true);
            const { data } = await axiosInstance.post(`search/?size=${size}&offset=${offset}`, query);
            setData(data);
        } catch (error: any) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const loadMore = async (size = pageSize, offset = 0) => {
        try {
            setLoading(true);
            const { data } = await axiosInstance.post(`search/?size=${size}&offset=${offset}`, query);
            setData((prev: DataProps) => {
                return {
                    ...prev,
                    count: prev.count + data.count,
                    size: prev.size + data.size,
                    offset: prev.offset + pageSize,
                    resales: [...prev.resales, ...data.resales],
                };
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleValueChange = (
        value: object | string | number | React.ChangeEvent<HTMLInputElement>,
        inputName: string
    ) => {
        if (typeof value === 'object' && value !== null && 'target' in value) {
            value = parseFloat(value.target.value.replace(/,/g, ''));
        }
        if (value === null) {
            value = 0;
        }
        setQuery({
            ...query,
            [inputName]: value,
        });
    };

    const handleSortChange = (e: any) => {
        const arr = e.key.split('-');
        let name;
        let type;
        switch (e.key) {
            case 'price-asc':
                name = arr[0];
                type = arr[1];
                break;

            case 'price-desc':
                name = arr[0];
                type = arr[1];
                break;

            case 'beds-asc':
                name = arr[0];
                type = arr[1];
                break;

            case 'beds-desc':
                name = arr[0];
                type = arr[1];
                break;

            default:
                return;
        }

        setQuery({
            ...query,
            sortName: name,
            sortOrder: type,
        });
    };

    useEffect(() => {
        setQuery(query);
    }, [query]);

    useEffect(() => {
        fetchData(pageSize, 0);
        setOffset(pageSize);
        setSelectedList([]);
    }, [query]);

    return (
        <div className='search-container'>
            <SearchForm
                query={query}
                setQuery={setQuery}
                handleValueChange={handleValueChange}
            />
            <ResultPage
                data={data}
                setData={setData}
                isLoading={isLoading}
                loadMore={loadMore}
                offset={offset}
                setOffset={setOffset}
                selectedList={selectedList}
                setSelectedList={setSelectedList}
                query={query}
                handleSortChange={handleSortChange}
            />
        </div>
    );
};

export default Search;
