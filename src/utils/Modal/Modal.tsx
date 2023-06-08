import {useState} from 'react'
import Image from 'next/image'
import { Modal } from 'antd';
import PropertyItem from '@/components/Search/Results/PropertyItem';
import './modal.scss';
import ThumbSlider from '../ThumbSlider/ThumbSlider';
import {Property} from '@/interfaces/search.interface'

interface Props {
  properties: Property[];
  isShowModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const DuplicateModal = ({properties, isShowModal, setShowModal}: Props) => {
  const [favorite, setFavorite] = useState<any>(null)
  const handleOk = () => {
    setShowModal(false);
  };
  const handleCancel = () => {
    setShowModal(false);
  };
  return (
    <>
      <Modal open={isShowModal} width="fit-content" onOk={handleOk} onCancel={handleCancel} footer={false} className="duplicate-modal">
        <div className='modal-wrapper'>
        {favorite === null ? <div className='modal-title'>Change version thumbnail</div> : <div className='change-cancel-btn' onClick={() => setFavorite(null)}>Cancel</div>}

        <div className='modal-item-wrapper'>
        {properties && properties.length && properties.map((property: Property, index: number) => (
          <div className={`modal-item ${favorite === index ? "favorite" : ""}`} key={property.RsId} onClick={() => setFavorite(index)}>
          <PropertyItem property={property} reactDisabled={true} />
          {favorite === index && (
            <div className='favorite-img'>
            <Image src="assets/images/star.png" alt="favorite" width={100} height={100} style={{width: "auto", height:"auto"}}/>
          </div>
          )}
          </div>
        ))}
        </div>
       
        </div>
      </Modal>
    </>
  );
};

interface ImageDetailModalProps {
  photos: string[];
  imgIndex: number;
  isShowModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ImageDetailModal = (props: ImageDetailModalProps) => {
  const {photos, imgIndex, isShowModal, setShowModal} = props
  const handleCancel = () => {
    setShowModal(false)
  }
return (
  <Modal open={isShowModal} title={false} footer={false} closable={false} onCancel= {handleCancel} className="image-detail-modal">
      <ThumbSlider photos={photos} imgIndex={imgIndex}/>
  </Modal>
)
}

export {DuplicateModal, ImageDetailModal};