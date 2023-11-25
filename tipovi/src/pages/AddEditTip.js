import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";

import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTip, updateTip } from "../redux/features/tipSlice";

const initialState = {
  title: "",
  description: "",
  league: "",
  sport: "",
  rivales: "",
  tipsAndQuotes: "",
  tipDate: "",
};

const AddEditTip = () => {
  const [tipData, setTipData] = useState(initialState);
  const { error, loading, userTips } = useSelector((state) => ({
    ...state.tip,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, description, league, sport, rivales, tipsAndQuotes, tipDate } =
    tipData;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singleTip = userTips.find((tip) => tip._id === id);
      console.log(singleTip);
      setTipData({ ...singleTip });
    }
  }, [id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      title &&
      description &&
      league &&
      sport &&
      rivales &&
      tipsAndQuotes &&
      tipData
    ) {
      const updatedTipData = { ...tipData, name: user?.result?.name };

      if (!id) {
        dispatch(createTip({ updatedTipData, navigate, toast }));
      } else {
        dispatch(updateTip({ id, updatedTipData, toast, navigate }));
      }
      handleClear();
    }
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTipData({ ...tipData, [name]: value });
  };

  const handleClear = () => {
    setTipData({
      title: "",
      description: "",
      league: "",
      sport: "",
      rivales: "",
      tipsAndQuotes: "",
      tipDate: "",
    });
  };
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
      <MDBCard alignment="center">
        <h5>{id ? "Update Tip" : "Add Tip"}</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
            <div className="col-md-12">
              <MDBInput
                placeholder="Enter Title"
                type="text"
                value={title || ""}
                name="title"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                validation="Please provide title"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                placeholder="Enter League"
                type="text"
                value={league}
                name="league"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                rows={4}
                validation="Please provide league"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                placeholder="Enter Sport"
                type="text"
                value={sport}
                name="sport"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                rows={4}
                validation="Please provide sport"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                placeholder="Enter Rivales"
                type="text"
                value={rivales}
                name="rivales"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                rows={4}
                validation="Please provide rivales"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                placeholder="Enter Tips and Quotes"
                type="text"
                value={tipsAndQuotes}
                name="tipsAndQuotes"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                rows={4}
                validation="Please provide tips and quotes"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                placeholder="Enter Description of tip"
                type="text"
                value={description}
                name="description"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                textarea
                rows={4}
                validation="Please provide description"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                type="date"
                value={tipDate}
                name="tipDate"
                onChange={onInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }}>
                {id ? "Update" : "Submit"}
              </MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditTip;
