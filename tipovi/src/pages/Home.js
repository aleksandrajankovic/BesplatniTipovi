import React, { useEffect, useState } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getTips } from "../redux/features/tipSlice";
import TipCard from "../components/TipCard";
import Spinner from "../components/Spinner";

const Home = () => {
  const { tips, loading } = useSelector((state) => ({ ...state.tip }));
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("Svi");

  useEffect(() => {
    dispatch(getTips());
  }, [dispatch]);

  const filteredTips = tips.filter((item) => {
    if (filter === "Aktivni") {
      return new Date() < new Date(item.tipDate);
    } else if (filter === "Istekli") {
      return new Date() >= new Date(item.tipDate);
    }
    return true;
  });

  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <div className="mb-3">
        <label htmlFor="filterDropdown" className="form-label">
          Filter tipova:
        </label>
        <select
          className="form-select custom-dropdown"
          id="filterDropdown"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            backgroundColor: "rgb(28, 47, 56)",
            border: "1px solid #2e5465",
            color: "#fff",
          }}
        >
          <option value="Svi">All</option>
          <option value="Aktivni">Active</option>
          <option value="Istekli">Expired</option>
        </select>
      </div>

      <MDBRow className="mt-5">
        {filteredTips.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
            Nema pronađenih tipova
          </MDBTypography>
        )}

        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
              {filteredTips.map((item, index) => (
                <TipCard
                  key={index}
                  {...item}
                  isActive={new Date() < new Date(item.tipDate)}
                />
              ))}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Home;
