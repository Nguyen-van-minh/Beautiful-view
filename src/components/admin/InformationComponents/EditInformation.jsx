import React, { useState, useEffect, useContext } from 'react';
import { Button, Input, Spin } from 'antd';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { InformationContext } from '../../../contexts/InformationContext';
import { toast } from 'react-toastify';
import { UploadOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';


const EditInformation = () => {

    const { InformationState: { information }, updateInformation } = useContext(InformationContext)
    const [newInformation, setNewInformation] = useState({
        sdtLienHe: information.sdtLienHe,
        sdtKhieuNai: information.sdtKhieuNai,
        sdtThacMac: information.sdtThacMac,
        introduce: information.introduce,
        image: '',
    });
    const [previewImage, setPreviewImage] = useState()
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsloading] = useState(false)
    const [bannerPreviewImage, setBannerPreviewImage] = useState(information.bannerImage)

    const history = useHistory()

    useEffect(() => {
        return () => {
            previewImage && URL.revokeObjectURL(previewImage)
        }
    }, [previewImage])


    const onChangeInformation = (name) => (e) => {
        const value = name === "image" ? e.target.files[0] : e.target.value;
        if (name === "image") {
            handlePreview(e)
        }
        setNewInformation({ ...newInformation, [name]: value });
    };



    const { TextArea } = Input;



    const openPreviewImage = (url) => {
        if (!url) return;
        setPreviewImage(url)
        setIsOpen(true)
    }

    const handlePreview = (e) => {
        let file = URL.createObjectURL(e.target.files[0])
        setBannerPreviewImage(file)
    }

    useEffect(() => {
        return () => {
            bannerPreviewImage && URL.revokeObjectURL(bannerPreviewImage)
        }
    }, [bannerPreviewImage])



    const onSubmit = async event => {
        event.preventDefault()
        const formData = new FormData()
        formData.append("image", newInformation.image);
        formData.append("sdtLienHe", newInformation.sdtLienHe);
        formData.append("sdtKhieuNai", newInformation.sdtKhieuNai);
        formData.append("sdtThacMac", newInformation.sdtThacMac);
        formData.append("introduce", newInformation.introduce);

        setIsloading(true)
        const { success } = await updateInformation(information._id, formData)
        if (success) {
            resetAddData()
            history.push('/admin/information')
            URL.revokeObjectURL(bannerPreviewImage)
            toast.success('🦄 Sửa thành công!');
        }
        else {
            toast.error('🦄 Lỗi');
        }

    }

    const resetAddData = () => {
        setPreviewImage()
        setIsloading(false)
    }

    return (
        <div>
            <div >
                {isLoading && <div><Spin /></div>}
                <form onSubmit={onSubmit} style={{ position: 'relative', marginBottom: 30 }} >

                    <div className="form__group field">
                        <input type="input" className="form__field" placeholder="Tên sản phẩm" name="sdtLienHe" id='sdtLienHe' value={newInformation.sdtLienHe} onChange={onChangeInformation("sdtLienHe")} required />
                        <label htmlFor="sdtLienHe" className="form__label">SĐT Liên hệ </label>
                    </div>

                    <br />
                    <div className="form__group field">
                        <label htmlFor="sdtKhieuNai" className="form__label">SĐT Khiếu nại </label>
                        <input id='sdtKhieuNai' type='input' className="form__field" name='sdtKhieuNai' value={newInformation.sdtKhieuNai} onChange={onChangeInformation("sdtKhieuNai")} />
                    </div>

                    <br />
                    <div className="form__group field">
                        <label htmlFor="sdtThacMac" className="form__label">SĐT Thắc mắc </label>
                        <input id='sdtThacMac' type='input' className="form__field" name='sdtThacMac' value={newInformation.sdtThacMac} onChange={onChangeInformation("sdtThacMac")} />
                    </div>
                    <br />

                    <br />
                    <TextArea name='introduce' value={newInformation.introduce} onChange={onChangeInformation("introduce")} rows={4} placeholder="Nội dung giới thiệu" />
                    <br />

                    <div style={{ position: 'relative' }}>
                        <div>
                            <div>
                                <label className='lable-upload box_Shadow' id='lable' htmlFor='image' >
                                    <span style={{ padding: 20 }}><UploadOutlined style={{ fontSize: '25px' }} />Banner</span>
                                </label>
                                <input
                                    id="image"
                                    className="form-control"
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={onChangeInformation("image")}
                                    onClick={(event) => {
                                        event.target.value = null
                                    }}
                                />
                            </div>
                            {
                                bannerPreviewImage && (<img src={bannerPreviewImage} onClick={() => openPreviewImage(bannerPreviewImage)} alt="" width="50%" height="30%" />)
                            }
                        </div>
                    </div>

                    <br />

                    <Button style={{ position: 'absolute', Button: 0, right: 0 }} type='warning' htmlType='submit'>Sửa</Button>
                </form>
            </div>

            {
                isOpen === true &&
                <Lightbox
                    mainSrc={previewImage}
                    onCloseRequest={() => setIsOpen(false)}
                />
            }
        </div>


    );
};

export default EditInformation
    ;