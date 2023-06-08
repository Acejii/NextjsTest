import React, { useState, useEffect, memo  } from "react";
import Image from "next/image";
import "./propertyItem.scss";
import Slider from "@/utils/Slider/Slider";
import {DuplicateModal, ImageDetailModal} from "@/utils/Modal/Modal";
import {Property} from '@/interfaces/search.interface'
import {IinitialSelectValue} from '@/interfaces/search.interface'

import moment from 'moment';
import Status from "../Status";

interface Props {
  property: Property;
  selectedList?: number[];
  setSelectedList?: React.Dispatch<React.SetStateAction<number[]>>;
  reactDisabled?: boolean;
  query?: IinitialSelectValue;
}

const PropertyItem = (props: Props) => {
  const {property, selectedList, setSelectedList, reactDisabled, query} = props;
  const [isChecked, setChecked] = useState(false);
  const [isShowDuplicateModal, setShowDuplicateModal] = useState(false);
  const [imgIndex, setImageIndex] = useState(0);
  const [isShowImgDetailModal, setShowImgDetailModal] = useState(false);

  const handleShowDuplicateModal = () => {
    setShowDuplicateModal(true)
  }

  const handleShowImgDetailModal = () => {
    setShowImgDetailModal(true)
  }

  const handleClickImage = (index: number) => {
    setImageIndex(index)
    setShowImgDetailModal(true)
  }

  useEffect(() => {
    setChecked(false)
  }, [query])

  const handleCheckedProperty = (rsId: number) => {
    if(isChecked) {
     const filterProperty = selectedList!.filter(prop => prop !== rsId) 
     setSelectedList!(filterProperty)
     setChecked(false)
    } else {
      setSelectedList!(prev => [...prev, rsId])
      setChecked(true)
    }
  }

  return (
    <div className="property-wrapper">
      {/* image */}
      <div className="property-img">
        <Slider photos={property.Photos} onClickImage={handleClickImage}/>
      </div>

      {/* Main */}
      <div className="property-main">
        <div className="property-price">{property.RsSalePriceTo === 0 ? `$ ${property.RsSalePrice?.toLocaleString("en-US")}` : `$ ${property.RsSalePrice?.toLocaleString("en-US")} - $ ${property.RsSalePriceTo?.toLocaleString("en-US")}`}</div>
        <div className="property-type">{`${property.RsSubType} (${property.RsBuiltSqm} m²)`}</div>
        <div className="property-rent">
          <div className="percentage">{property.RsCommissionPct/1000}%</div>
          <div className="price">$ {property.RsCommission? Math.round((property.RsCommission/100)).toLocaleString("en-US") : property.RsCommission}</div>
          
          <Status status={property.RsStatus}/>
          {property.IsOwn && (
          <Status status="Own Property"/>
          )}
          
        </div>
        <div className="property-location">
          <div className="location">{`${property.RsLocation}, ${property.RsProvince}`}</div>
          <div className="vertical-line"></div>
          <div className="bed">
            <div className="bed-icon">
              <Image src="/assets/images/bed.svg" alt="bed" width={100} height={100} style={{width: "auto", height: "auto"}}/>
            </div>
            <div className="bed-quantity">{property.RsBeds}</div>
          </div>
          <div className="bath">
            <div className="bath-icon">
             <Image src="/assets/images/bath.svg" alt="bath" width={100} height={100} style={{width: "auto", height: "auto"}}/>
            </div>
            <div className="bath-quantity">{property.RsBaths}</div>
          </div>
        </div>

        <div className="property-agency">
          <div className="icon">
            <Image src='/assets/images/calendar-tick.png' alt="calendar" width={100} height={100} style={{width: "auto", height: "auto"}}/>
          </div>
          <div className="pass-day">{moment(property.RsLastUpdated, "YYYY/MM/DD").fromNow()}</div>
          <div className="by">by</div>
          <div className="agency">{property.RsAgency}</div>
        </div>

        <div className="property-id">{`R${property.RsId}`}</div>
      </div>

      {/* select button */}
      {!reactDisabled && (
        <div
        className='property-tick-icon'
        onClick={() => handleCheckedProperty(property.RsId)}
      >
        {isChecked ? <Image src="/assets/images/selected-tick.svg" alt="notselected" width={100} height={100} style={{width: "auto", height: "auto"}}/> : <Image src='/assets/images/notselected-tick.svg' alt="notselected" width={100} height={100} style={{width: "auto", height: "auto"}}/>}
      </div>
      )}

      {/* edit button */}
      <div className="property-edit-icon">
        <Image src="/assets/images/menu.jpg" alt="menu" width={100} height={100} style={{width: "auto", height: "auto"}}/>
      </div>

      {/* duplicate notice */}
      {!reactDisabled && (property.Dups.length > 1) &&
        <div className="property-duplicate-notice" onClick={handleShowDuplicateModal}>+{(property.Dups.length-1)} similar version</div>
      }
      {isShowDuplicateModal && <DuplicateModal properties={property.Dups} isShowModal={isShowDuplicateModal} setShowModal={setShowDuplicateModal}/>}

      {isShowImgDetailModal && <ImageDetailModal photos={property.Photos} imgIndex={imgIndex} isShowModal={isShowImgDetailModal} setShowModal={setShowImgDetailModal}/>}
    </div>
  );
};

export default memo(PropertyItem);
