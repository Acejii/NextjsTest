import React from 'react';
import PriceFrom from './PriceFrom';
import PriceTo from './PriceTo';
import { SearchTypeProps } from '@/interfaces/search.interface';

const SearchPrice: React.FC<SearchTypeProps> = ({ label, onHandleValueChange, disableField }) => {
    return (
        <div className='input-group'>
            <p>{label}</p>
            <div className='price-inputs'>
                <PriceFrom
                    disableField={disableField}
                    onHandleValueChange={onHandleValueChange}
                />
                <PriceTo
                    disableField={disableField}
                    onHandleValueChange={onHandleValueChange}
                />
            </div>
        </div>
    );
};

export default SearchPrice;
