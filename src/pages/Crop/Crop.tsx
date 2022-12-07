import React, { useRef, useState } from 'react';
import { Cropper } from 'react-cropper';
import "cropperjs/dist/cropper.css"

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

const Crop: React.FC = () => {
    const [image, setImage] = useState('defaultSrc')
    const [cropData, setCropData] = useState('defaultSrc')
    const [cropper, setCropper] = useState<Cropper>()
    const imageRef = useRef<HTMLImageElement>(null)

    const onChange = (e: any) => {
        e.preventDefault()
        let files;
        console.log(e.target.files[0]);
        try {
            if (e.dataTransfer) {
                files = e.dataTransfer.files
            } else if (e.target) {
                files = e.target.files;
            }
            
            const reader = new FileReader()
            reader.onload = () => {
                setImage(reader.result as any);
                console.log(reader.result);
            }
            reader.readAsDataURL(files[0])
        }
        catch (e) {
            const blue = '\x1b[34m'

            console.error(blue+ 'не был выбран файл кртинки профиля',e);
            
        }
    }
    

    const getCropData = () => {
        if (typeof cropper !== "undefined") {
          setCropData(cropper.getCroppedCanvas().toDataURL());
        }
    };


    return (
        <div className='crop'>
            {/* cr */}
            <div>
                 <input className='' type="file" onChange={onChange} onSelect={()=> alert(9)}/>
                <br />
                <br />
                {/* <img width={600} src={image } alt='git image'/> */}
                <Cropper 
                 initialAspectRatio={1}
                 preview=".img-preview"
                    src={image}
                    ref={imageRef}
                    viewMode={1}
                    guides={true}
                    minCropBoxHeight={100}
                    minCropBoxWidth={100}
                    background={false}
                    responsive={true}
                    aspectRatio={1/1}

                    checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                    onInitialized={(instance) => {
                      setCropper(instance);
                    }}
                />
            </div>
            <div>

                <div className="box" style={{ width: "50%", float: "right" }}>
                    <h1>Preview</h1>
                    <div
                        className="img-preview"
                        style={{ }}
                    />
                    <button  onClick={getCropData} className="learn-more">
                        <span className="circle" aria-hidden="true">
                        <span className="icon arrow"></span>
                        </span>
                        <span className="button-text">Crop Image</span>
                    </button>
                </div>

                <div className="box"
                style={{ width: "50%", float: "right", height: "300px" }}>
                    <h1>
                        <span>Crop</span>
                        {/* <button className='crop_btn' style={{ float: "right" }} onClick={getCropData}>
                        Crop Image
                        </button> */}
                        
                        
                    </h1>
                    <img className='cropped_img' src={cropData} alt="cropped" />
                    <button className="learn-more">
                        <span className="circle" aria-hidden="true">
                        <span className="icon arrow"></span>
                        </span>
                        <span className="button-text">Сохранить</span>
                    </button>
                </div>
            </div>
            <br style={{ clear: "both" }} />
        </div>
    );
};

export default Crop;