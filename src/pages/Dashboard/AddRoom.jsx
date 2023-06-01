import React, { useState } from "react";
import AddRoomForm from "../../components/Forms/AddRoomForms";
import { uploadImage } from "../../api/utils";
import useAuth from "../../api/useAuth";

const AddRoom = () => {
  const { user } = useAuth();
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [loading, setLoading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const location = e.target.location.value;
    const category = e.target.category.value;
    const title = e.target.title.value;
    const description = e.target.description.value;
    const price = e.target.price.value;
    // const from = dates.startDate;
    // const to = dates.endDate;
    // const bed = e.target.bed.value;
    const guest = e.target.guest.value;
    const image = e.target.image.files[0];

    // upload image operation
    // uploadImage(image)
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //     setLoading(false);
    //   });
  };
  const handleImageChange = (image) => {
    console.log(image.name);
    setUploadButtonText(image.name);
  };

  const handleDates = (range) => {
    setDates(range.selection);
  };
  return (
    <AddRoomForm
      handleSubmit={handleSubmit}
      loading={loading}
      uploadButtonText={uploadButtonText}
      handleImageChange={handleImageChange}
      dates={dates}
      handleDates={handleDates}
    />
  );
};

export default AddRoom;
