import React, { useState } from "react";
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import moment from "moment";

const TipCard = ({
  title,
  description,
  league,
  sport,
  rivales,
  tipsAndQuotes,
  tipDate,
}) => {
  const [currentDate] = useState(new Date());
  const tipDateObj = new Date(tipDate);
  const isActive = currentDate < tipDateObj;
  const [centredModal, setCentredModal] = useState(false);

  const openModal = () => setCentredModal(true);
  const closeModal = () => setCentredModal(false);

  return (
    <MDBCard alignment="center">
      <MDBCardHeader>
        {isActive ? <span>Active</span> : <span>Expired</span>}
      </MDBCardHeader>
      <MDBCardBody>
        <MDBCardTitle>{title}</MDBCardTitle>
        <MDBCardText>{rivales}</MDBCardText>
        <MDBBtn onClick={openModal}>Read more</MDBBtn>

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
