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
} from "mdb-react-ui-kit";
import moment from "moment";

const TipCard = ({
  title,
  desctiption,
  league,
  sport,
  rivales,
  tipsAndQuotes,
  tipDate,
}) => {
  const [currentDate] = useState(new Date());
  const tipDateObj = new Date(tipDate);
  const isActive = currentDate < tipDateObj;

  return (
    <MDBCard alignment="center">
      <MDBCardHeader>
        {isActive ? <span>Active</span> : <span>Expired</span>}
      </MDBCardHeader>
      <MDBCardBody>
        <MDBCardTitle>{title}</MDBCardTitle>
        <MDBCardText>{rivales}</MDBCardText>
        <MDBBtn href="#">Go somewhere</MDBBtn>
      </MDBCardBody>
      <MDBCardFooter>{`Tip date: ${moment(tipDate).format(
        "DD.MM.YYYY"
      )}`}</MDBCardFooter>
      <input type="hidden" value={isActive} />
    </MDBCard>
  );
};

export default TipCard;
