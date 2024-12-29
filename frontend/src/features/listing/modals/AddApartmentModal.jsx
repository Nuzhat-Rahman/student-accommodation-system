import { useState } from "react";
import MapSearch from "../../../components/Map";
import PopupModal from "../../../components/PopupModal";
import Select from "../../../components/input/Select";
import Input from "../../../components/input/Input";
import TextArea from "../../../components/input/TextArea";
import PrimaryButton from "../../../components/input/PrimaryButton";
import { closeModal } from "../../../utils/ModalHelper";
import MultiImageUpload from "../components/MultiImageUpload";

const AddApartmentModal = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rent: "",
    amenities: "",
    roomType: "Single",
    location: {
      type: "Point",
      coordinates: [23.801417, 90.404926],
      address: "Banani, Dhaka",
    },
  });

  const [onAddressSelect, setOnAddressSelect] = useState({
    position: [23.801417, 90.404926],
    address: "Banani, Dhaka",
  });

  const handleAddressChange = (address) => {
    setOnAddressSelect(address);
    setFormData({
      ...formData,
      location: {
        type: "Point",
        coordinates: [address.position[1], address.position[0]],
        address: address.address,
      },
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <PopupModal title={"Add Apartment"}>
      <form className="w-full h-full flex flex-col items-center justify-center">
        <Input
          label="Title"
          name="title"
          id="title"
          placeholder="Title of the Apartment"
          value={formData.title}
          onChange={handleChange}
        />
        <TextArea
          label="Description"
          placeholder="Describe the Apartment"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <Input
          label="Rent"
          placeholder="Enter Rent in BDT"
          id="rent"
          name="rent"
          value={formData.rent}
          onChange={handleChange}
        />

        <Input
          label="Amenities"
          placeholder="Add Ameneties seperated by comma(,)"
          id="amenities"
          name="amenities"
          value={formData.amenities}
          onChange={handleChange}
        />
        <Select
          id="roomType"
          label="Room Type"
          name="roomType"
          value={formData.roomType}
          onChange={handleChange}
          options={[
            {
              label: "Single",
              value: "Single",
            },
            {
              label: "Shared",
              value: "Shared",
            },
            {
              label: "Studio",
              value: "Studio",
            },
            {
              label: "Other",
              value: "Other",
            },
          ]}
        ></Select>
        <div className="w-full m-4 p-4">
          <label htmlFor="address" className="text-gray-700 font-semibold my-2">
            Location
          </label>
          <MapSearch
            movePointer
            showSearchBar
            currentPosition={onAddressSelect.position}
            onAddressSelect={handleAddressChange}
            zoom={10}
          />
        </div>
      <MultiImageUpload files={files} onFilesChange={setFiles} />
      <PrimaryButton
        className="w-full"
        onClick={() => {
          closeModal();
        }}
        >
        Add New Apartment
      </PrimaryButton>
        </form>
    </PopupModal>
  );
};

export default AddApartmentModal;