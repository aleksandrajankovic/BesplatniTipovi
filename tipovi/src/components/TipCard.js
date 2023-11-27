import React, { useState } from "react";
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { likeTip } from "../redux/features/tipSlice";
import moment from "moment";

const TipCard = ({
  title,
  description,
  league,
  sport,
  rivales,
  tipsAndQuotes,
  tipDate,
  _id,
  likeCount,
}) => {
  const [currentDate] = useState(new Date());
  const tipDateObj = new Date(tipDate);
  const isActive = currentDate < tipDateObj;
  const dispatch = useDispatch();
  const [centredModal, setCentredModal] = useState(false);
  const { user } = useSelector((state) => ({ ...state.auth }));
  const openModal = () => setCentredModal(true);
  const closeModal = () => setCentredModal(false);

  const handleLike = () => {
    console.log("Like button clicked for tip with ID:", _id);
    dispatch(likeTip({ id: _id }));
  };

  return (
    <MDBCard alignment="center">
      <MDBCardHeader>
        {isActive ? <span>Active</span> : <span>Expired</span>}
      </MDBCardHeader>
      <MDBCardBody>
        <MDBCardTitle>{title}</MDBCardTitle>
        <MDBCardText>{rivales}</MDBCardText>
        <MDBBtn onClick={openModal}>Read more</MDBBtn>
        {user?.result?.role === "user" && (
          <div>
            <p>Likes: {likeCount}</p>
            <MDBBtn onClick={handleLike}>Like</MDBBtn>
          </div>
        )}
        <MDBModal tabIndex="-1" show={centredModal} onHide={closeModal}>
          <MDBModalDialog centered>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>{title}</MDBModalTitle>

                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={closeModal}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <MDBModalTitle>{rivales}</MDBModalTitle>
                <MDBCardFooter>{sport}</MDBCardFooter>
                <MDBCardFooter>{league}</MDBCardFooter>
                <p>{description}</p>
                <p>{tipsAndQuotes}</p>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={closeModal}>
                  Close
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </MDBCardBody>
      <MDBCardFooter>{`Tip date: ${moment(tipDate).format(
        "DD.MM.YYYY"
      )}`}</MDBCardFooter>
    </MDBCard>
  );
};

export default TipCard;
