import React, { useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBTypography,
  MDBBtn,
  MDBIcon,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getTips, deleteTip } from "../redux/features/tipSlice";
import TipCard from "../components/TipCard";
import { toast } from "react-toastify";
import moment from "moment";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { tips } = useSelector((state) => ({ ...state.tip }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTips());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tour ?")) {
      dispatch(deleteTip({ id, toast }));
    }
  };
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <>
        <MDBRow className="mt-5">
          <MDBTypography className="text-center mb-0" tag="h2">
            Dashboard: {user?.result?.name}
          </MDBTypography>
        </MDBRow>

        {tips.length === 0 ? (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Tips Found
          </MDBTypography>
        ) : (
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-2 g-2">
              {tips.map((item, index) => (
                <div key={index}>
                  <MDBCard alignment="center">
                    <MDBCardHeader>
                      <MDBBtn
                        className="mt-1"
                        tag="a"
                        color="none"
                        onClick={() => handleDelete(item._id)}
                      >
                        <MDBCardTitle>
                          <p className="text-right">Delete tip</p>
                        </MDBCardTitle>
                      </MDBBtn>
                      <Link to={`/editTip/${item._id}`}>
                        <MDBCardTitle>
                          <p className="text-right">Edit tip</p>
                        </MDBCardTitle>
                      </Link>
                      <h3>{item.title}</h3>
                      <span>
                        <p className="text-center tipName">{item.sport}</p>
                      </span>

                      <br />
                    </MDBCardHeader>

                    <MDBCardBody>
                      <MDBCardText>{item.description}</MDBCardText>
                    </MDBCardBody>
                    <MDBCardFooter className="text-muted">{`Tip date: ${moment(
                      item.tipDate
                    ).format("DD.MM.YYYY")}`}</MDBCardFooter>
                  </MDBCard>
                </div>
              ))}
            </MDBRow>
          </MDBContainer>
        )}
      </>
    </div>
  );
};

export default Dashboard;
