import React, { useRef, memo, useState, useEffect } from 'react';
import { Switch } from 'antd';
import PropertyItem from '../PropertyItem/PropertyItem';
import Dropdown from '@/utils/Dropdown/Dropdown';
import Image from 'next/image';

import { DataProps, Property, IinitialSelectValue } from '@/interfaces/search.interface';

import './resultPage.scss';

const actionItems = [
    { key: '1', label: 'Test 1' },
    { key: '2', label: 'Test 2' },
    { key: '3', label: 'Test 3' },
    { key: '4', label: 'Test 4' },
];

const sortItems = [
    { key: 'price-asc', label: 'Price Asc' },
    { key: 'price-desc', label: 'Price Desc' },
    { key: 'beds-asc', label: 'Beds Asc' },
    { key: 'beds-desc', label: 'Beds Desc' },
];

const loadingOffset = 500;

interface Props {
    data: DataProps;
    setData: React.Dispatch<React.SetStateAction<DataProps>>;
    isLoading: boolean;
    loadMore: (size?: number, offset?: number) => Promise<void>;
    offset: number;
    setOffset: React.Dispatch<React.SetStateAction<number>>;
    selectedList: number[];
    setSelectedList: React.Dispatch<React.SetStateAction<number[]>>;
    query: IinitialSelectValue;
    handleSortChange: (e: any) => void;
}

const ResultPage = (props: Props) => {
    const { data, isLoading, loadMore, offset, setOffset, selectedList, setSelectedList, query, handleSortChange } =
        props;

    const { current: pageSize } = useRef(20);
    const resultRef = useRef<HTMLDivElement>(null);

    const [isInfiniteLoop, setInfiniteLoop] = useState(false);

    let debounce = true;
    const handleScroll = async () => {
        if (resultRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = resultRef.current;
            const loadMore =
                scrollTop + clientHeight >= scrollHeight - loadingOffset && offset < data.total && isInfiniteLoop;
            if (loadMore) {
                if (debounce) {
                    debounce = false;
                    await handleLoadMore();
                    setTimeout(() => {
                        debounce = true;
                    }, 1000);
                }
            }
        }
    };

    useEffect(() => {
        const { current } = resultRef;
        if (current) {
            current.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (current) {
                current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [isInfiniteLoop, offset, data]);

    useEffect(() => {
        resultRef.current?.scrollTo(0, 0);
    }, [query]);

    const handleLoadMore = async () => {
        try {
            await loadMore(pageSize, offset);
            setOffset(prev => prev + pageSize);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='result-page-wrapper'>
            {/* taskbar */}
            <div className='result-taskbar'>
                <div className='result-left'>
                    {data.resales && data.resales.length > 0 ? (
                        <div className='result-quantity'>
                            <b>{data.total.toLocaleString('en-US')}</b> matching results
                        </div>
                    ) : (
                        <div className='result-quantity'>No matching result</div>
                    )}

                    {isLoading && (
                        <>
                            <div className='result-refresh'>
                                <div className='refresh-img'>
                                    <Image
                                        src="/assets/images/refresh.png"
                                        alt='refresh'
                                        width={100} height={100} style={{width: "auto", height: "auto"}}
                                    />
                                </div>
                                <div className='refresh-text'>Refreshing</div>
                            </div>
                        </>
                    )}
                </div>

                <div className='result-tool'>
                    <Dropdown
                        items={actionItems}
                        disabled={selectedList.length === 0}
                        parent='action-btn'
                    >
                        <div id='action-btn'>
                            <div className={`action-btn ${selectedList.length > 0 ? 'selected' : ''}`}>
                                <div className='action-btn-text'>Action</div>
                                <div className='arrow-icon'>
                                    {/* <Image
                                        src={selectedList.length > 0 ? "/assets/images/arrow2.png" : '/assets/images/arrow-down.png'}
                                        alt='arrow-down'
                                        width={100} height={100} style={{width: "auto", height: "auto"}}
                                    /> */}
                                </div>
                            </div>
                        </div>
                    </Dropdown>

                    <Dropdown
                        handleSortChange={handleSortChange}
                        items={sortItems}
                        parent='sort-btn'
                    >
                        <div id='sort-btn'>
                            <div className='sort-btn'>
                                <div className='sort-left'>
                                    <div className='sort-icon'>
                                        {(!query.sortOrder || query.sortOrder === 'asc') && (
                                            <Image
                                                src="/assets/images/sort.png"
                                                alt='sort'
                                                width={100} height={100} style={{width: "auto", height: "auto"}}
                                            />
                                        )}
                                        {query.sortOrder === 'desc' && (
                                            <Image
                                                src="/assets/images/sort-desc.png"
                                                alt='sort'
                                                width={100} height={100} style={{width: "auto", height: "auto"}}
                                            />
                                        )}
                                    </div>
                                    <div className='sort-btn-text'>
                                        {query.sortName ? (
                                            <span>
                                                {query.sortName} {query.sortOrder}
                                            </span>
                                        ) : (
                                            <span>Sort</span>
                                        )}
                                    </div>
                                </div>
                                <div className='arrow-icon'>
                                    {/* <Image
                                        src="/assets/images/arrow-down.png"
                                        alt='arrow-down'
                                        width={100} height={100} style={{width: "auto", height: "auto"}}
                                    /> */}
                                </div>
                            </div>
                        </div>
                    </Dropdown>

                    <div className='load-behavior'>
                        <div className='load-text'>Infinite Loading</div>
                        <Switch
                            checked={isInfiniteLoop}
                            className='load-switch'
                            onChange={() => setInfiniteLoop(!isInfiniteLoop)}
                        />
                    </div>
                </div>
            </div>

            <div className='result-show'>
                {/* property list */}
                {data.resales && data.resales.length > 0 && (
                    <div
                        className='result-properties'
                        ref={resultRef}
                    >
                        {data.resales.map((property: Property, index: number) => (
                            <PropertyItem
                                key={index}
                                property={property}
                                selectedList={selectedList}
                                setSelectedList={setSelectedList}
                                query={query}
                            />
                        ))}

                        {/* load more btn*/}
                        {!isLoading && !isInfiniteLoop && data.count < data.total ? (
                            <div className='load-more'>
                                <button
                                    className='load-more-btn'
                                    onClick={handleLoadMore}
                                >
                                    Show more...
                                </button>
                            </div>
                        ) : (
                            <div className={`loading-bar ${isLoading && data.total > pageSize ? 'showed' : ''}`}>
                                <span className='circle1'></span>
                                <span className='circle2'></span>
                                <span className='circle3'></span>
                            </div>
                        )}

                        {/* show all notice */}
                        {data.total > 0 && data.count >= data.total && (
                            <div className='show-all-result-notice'>{`Showed all ${data.count}/${data.total} results`}</div>
                        )}
                    </div>
                )}

                {/* no matching page */}
                {data.total === 0 && data.success && (
                    <div className='no-matching-result'>
                        <div className='wrapper'>
                            <div className='error'>404</div>
                            <div className='title'>No matching result</div>
                            <div className='text'>
                                We can't find any result matches with your requirements. Please try something else or
                                save this search so we can update you as soon as there's a match.
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(ResultPage);
