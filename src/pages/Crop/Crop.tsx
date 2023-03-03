import React, { useEffect, useRef, useState } from 'react';
import { Cropper } from 'react-cropper';
import "cropperjs/dist/cropper.css"

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

const Crop: React.FC = ({readURL, close, setUrl, id, userImage} : any) => {
    const [img, setImg] = useState({});
    const [image, setImage] = useState(defaultSrc)
    const [cropData, setCropData] = useState(defaultSrc)
    const [cropper, setCropper] = useState<Cropper>()
    const imageRef = useRef<HTMLImageElement>(null)
    // const { changePhoto } = useActions();

    useEffect(() =>{// ЕСЛИ у юзера была картинка профиля, получит по пропсу URL адрес и сконвертирует 
        if (userImage ){
            console.log(userImage);
            (async () => {   
                const name = new Date
                const imgFile: any = await convertDataURLToImageData(userImage, "Снимок экрана от 2022-11-22 14-59-33.png" , "image/png")
                // .then((imageData) => imageData )//вопрос к расширениям
                console.log('\x1b[34m data URL новой картинки',userImage)
                console.log('\x1b[34m Первичный файл картинки',img); 
                console.log('\x1b[34m Новый сформированный файл картинки',imgFile);
                 const reader = new FileReader()
                reader.onload = () => {
                    setImage(userImage);
                    // console.log(reader.result);
                }
                reader.readAsDataURL(imgFile)
                setImg(img)
            })();  
        }
    }, [])

    const onChange = (e: any) => {
        e.preventDefault()
        let files;
        console.log(e.target.files[0]);
        setImg(e.target.files[0])
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
            console.error(blue+ 'не был выбран файл кaртинки профиля',e);  
        }
    }
    

    //read js data URL As  File
    const convertDataURLToImageData =  async (URI: any, name: string, type: string) => {

        const imgfile = new File([await (await fetch(URI)).blob()], name, {type: type})
   
        return imgfile
    }

    const getCropData = () => {
        //convert img file to cropped data URL
        if (typeof cropper !== "undefined" && image) {
            const newURL = cropper?.getCroppedCanvas()?.toDataURL()
          setCropData(cropper.getCroppedCanvas().toDataURL());
        
          //convert cropped data URL to file
          (async () => {   
            const imgFile: any = await convertDataURLToImageData(newURL, img.name, img.type)
            // .then((imageData) => imageData )
         console.log('\x1b[34m data URL новой картинки',newURL)
            console.log('\x1b[34m Первичный файл картинки',img); 
             console.log('\x1b[34m Новый сформированный файл картинки',imgFile);
             const formData = new FormData();
             formData.append("image", imgFile);
         console.log(id, formData);
        })();  
        }

    };


    return (
        <div className='profile__crop'>
            
        <div className='cropper'>
             <input className='' type="file" onChange={onChange} />
            <br />
            <br />
            
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
        <div className='preview_box'>

            <div className="box" style={{ float: "right" }}>
                <h1>Изменить</h1>
                <div
                    className="img-preview"
                    style={{ }}
                />
                <button  onClick={getCropData} className="learn-more">
                    <span className="circle" aria-hidden="true">
                    <span className="icon arrow"></span>
                    </span>
                    <span className="button-text">   обрезать</span>
                </button>
            </div>

            <div className="box" style={{  float: "right" }}>
                <h1>
                    <span>Оставить</span>

                </h1>
                <img className='cropped_img' src={cropData} alt="Картинку не выбрали" />
                <button onClick={() => close()} className="learn-more">
                    <span className="circle" aria-hidden="true">
                    <span className="icon arrow"></span>
                    </span>
                    <span className="button-text">Готово</span>
                </button>
            </div>
        </div>
        <br style={{ clear: "both" }} />
    </div>
    );
};

export default Crop;