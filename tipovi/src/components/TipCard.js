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
  MDBIcon,
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
  tipsAndQuotesLink,
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
    <MDBCard
      alignment="center"
      className="homeCard"
      style={{
        background: "#1c2f38",
      }}
    >
      <MDBCardHeader style={{ borderBottom: "2px solid #2E5465" }}>
        {isActive ? (
          <span className="greenLabel">Active</span>
        ) : (
          <span className="redLabel">Expired</span>
        )}
      </MDBCardHeader>
      <MDBCardBody>
        <MDBCardTitle style={{ color: "#fff" }}>{title}</MDBCardTitle>
        <MDBCardText style={{ color: " #BDBDBD" }}>{sport}</MDBCardText>
        <MDBBtn
          style={{ background: "#2E5465", marginBottom: "10px" }}
          onClick={openModal}
        >
          Read more
        </MDBBtn>

        <div>
          {!user && (
            <p style={{ color: "#fff" }}>
              <MDBIcon far icon="heart" /> {likeCount}
            </p>
          )}
          {user?.result?.role === "admin" && (
            <p style={{ color: "#fff" }}>
              <MDBIcon far icon="heart" /> {likeCount}
            </p>
          )}
          {user?.result?.role === "user" && (
            <div className="flex">
              <MDBBtn
                onClick={handleLike}
                style={{
                  background: "transparent",
                  boxShadow: "none",
                  padding: "0px",
                }}
              >
                <MDBIcon far icon="heart" style={{ fontSize: "16px" }} />
              </MDBBtn>
              <p>{likeCount}</p>
            </div>
          )}
        </div>

        <MDBModal tabIndex="-1" show={centredModal} onHide={closeModal}>
          <MDBModalDialog centered>
            <MDBModalContent
              style={{
                background: "#1c2f38",
              }}
            >
              <MDBModalHeader
                style={{
                  textAlign: "center",
                  color: "#fff",
                  borderBottom: "1px solid #bdbdbd",
                }}
              >
                <MDBModalTitle>{league}</MDBModalTitle>

                {/* <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={closeModal}
                ></MDBBtn> */}
              </MDBModalHeader>
              <MDBModalHeader
                style={{
                  textAlign: "center",
                  borderBottom: "1px solid #bdbdbd",
                }}
              >
                <MDBModalTitle className="blueLabel">{rivales}</MDBModalTitle>
              </MDBModalHeader>
              <MDBModalBody>
                <MDBModalTitle style={{ marginBottom: "1rem", color: "#fff" }}>
                  {title}
                </MDBModalTitle>
                <p style={{ color: " #BDBDBD" }}>{description}</p>
                <div className="col-md-12">
                  <p>
                    {" "}
                    {tipsAndQuotesLink ? (
                      <a
                        href={tipsAndQuotesLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="greenLabel"
                      >
                        {tipsAndQuotes}
                      </a>
                    ) : (
                      tipsAndQuotes
                    )}
                  </p>
                </div>
              </MDBModalBody>
              <MDBModalFooter
                style={{
                  borderTop: "1px solid #bdbdbd",
                }}
              >
                <MDBBtn color="secondary" onClick={closeModal}>
                  Close
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </MDBCardBody>
      <MDBCardFooter
        style={{ color: " #BDBDBD", borderTop: "2px solid #2E5465" }}
      >{`Tip date: ${moment(tipDate).format("DD.MM.YYYY")}`}</MDBCardFooter>
    </MDBCard>
  );
};

export default TipCard;
