import { motion } from "framer-motion";
import React, { useState } from "react";
import { GridLoader } from "react-spinners";
import Input from "../../Components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../Utils/validators";
import styles from "./index.module.scss";

const UploadImage = () => {
  const [image, setImage] = useState("");
  const [cloudImage, setCloudImage] = useState("");
  const [loading, setLoading] = useState(false);
  const convertToBase64 = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      console.log("Image converted to base64:", reader.result);
      setImage(reader.result as string);
    };
    reader.onerror = (error) => {
      console.error("Error converting image to base64:", error);
    };
  };

  const onUploadImage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (!image) return;

    try {
      const res = await fetch("http://localhost:5000/api/images/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ base64: image }),
      });

      if (!res.ok) {
        console.error("Error uploading image:", res);
        return;
      }

      const data = await res.json();
      setCloudImage(data.result.secure_url);
      setLoading(false);
      console.log("Image uploaded successfully:", data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className={styles.page}>
      <motion.div
        layout
        transition={{ type: "spring", duration: 0.35 }}
        className={styles.formContainer}
      >
        <form onSubmit={onUploadImage}>
          <Input
            id='image'
          element='input'
            type='file'
            label="העלה תמונת פרופיל"
            onChange={convertToBase64}
            validators={[VALIDATOR_REQUIRE()]}
          />
          <button type='submit'>Upload</button>
          {!loading ? (
            cloudImage && (
              <motion.img
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.5,
                  type: "spring",
                  stiffness: 120,
                }}
                exit={{ opacity: 0, y: 100 }}
                src={cloudImage}
                alt='uploaded'
              />
            )
          ) : (
            <GridLoader />
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default UploadImage;
