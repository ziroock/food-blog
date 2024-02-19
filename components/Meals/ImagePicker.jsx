'use client'
import Image from 'next/image'

import { useRef, useState } from 'react'
import classes from './ImagePicker.module.css'

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState()
  const imageInput = useRef()
  function handlePickClick() {
    imageInput.current.click()
  }

  function handleImageChange(event) {
    // The input is of type file, so we can access the file that was picked
    const file = event.target.files[0]

    if (!file) {
      setPickedImage(null)
      return
    }

    const fileReader = new FileReader()

    // This function will be triggered once the file is read and converted to a data URL
    fileReader.onload = () => {
      setPickedImage(fileReader.result)
    }

    fileReader.readAsDataURL(file)
  }

  return (
    <div className={classes.picker}>
      <label htmlFor="image">{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by the user."
              fill
            ></Image>
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required // Ensures that no empty value is submitted
        ></input>
        {/* By default the button will be of type submit, so we need to change it to type button
        in order to prevent the form from submitting when the button is clicked */}
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  )
}
