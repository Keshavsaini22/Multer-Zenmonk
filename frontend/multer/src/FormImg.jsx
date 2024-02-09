import axios from 'axios'
import React, { useEffect, useState } from 'react'

function FormImg() {
    const [image, setImg] = useState()
    const [images, setImgs] = useState()
    const [alldata, setAlldata] = useState()
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(image, images)
        const formdata = new FormData();
        formdata.append('image', image)
        for (let i = 0; i < images.length; i++) {
            formdata.append('images', images[i])
        }
        // console.log(formdata)
        try {
            const response = await axios.post("http://localhost:8080/uploads", formdata)
            if (response.status === 200) {
                console.log(response.data)
                alert("data added successfully")
                handleGetData()
            }
            else {
                console.log("else of try body")
            }
        } catch (e) {
            console.log(e, "error in form submit")
        }
    }

    useEffect(() => {
        handleGetData()
    }, [])


    const handleGetData = async () => {
        console.log("Nothing")
        try {
            const res = await axios.get('http://localhost:8080/images')
            const data = res.data
            console.log(data)
            setAlldata(data)
        }
        catch (e) {
            alert(e)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} enctype='multipart/form-data'>
                <div className="img">
                    <input type="file" name="image" id="" onChange={(e) => (setImg(e.target.files[0]))} />
                    <input type="file" name="images" multiple id="" onChange={(e) => (setImgs(e.target.files))} />
                    <button type="submit">Submit</button>
                </div>
            </form>

            {alldata?.map((i) => (
           <div>
             {/* <h1>shsf</h1> */}
            <img src={`http://localhost:8080/${i.img}`} alt="afsgsdfgsdf" ></img>
           </div>
            // console.log("first", i.img)
            ))}


        </>
    )
}

export default FormImg