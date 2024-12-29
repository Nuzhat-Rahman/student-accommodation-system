import { useSelector } from "react-redux";
import { modalTypes } from "./context/modal.slice";
import ReviewModal from "./features/appartments/modals/ReviewModal";
import FilterModal from "./features/appartments/modals/FilterModal";
import React, { memo } from "react";
import AddApartmentModal from "./features/listing/modals/AddApartmentModal";
import EditApartmentModal from "./features/listing/modals/EditApartmentModal";

const ModalRouter = () => {
  const open = useSelector((state) => state.modal.open);
  const selectedModal = useSelector((state) => state.modal.selectedModal);
  return (
    <div className="w-screen h-screen">
      <React.Fragment>
        {modalTypes.REVIEW === selectedModal && open && <ReviewModal />}
        {modalTypes.FILTER === selectedModal && open && <FilterModal />}
        {modalTypes.ADD_APARTMENT === selectedModal && open && (
          <AddApartmentModal />
        )}
        {modalTypes.EDIT_APARTMENT === selectedModal && open && (
          <EditApartmentModal />
        )}
      </React.Fragment>
    </div>
  );
};

export default memo(ModalRouter);