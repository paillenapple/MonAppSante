import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  displayLoader,
  hideLoader,
  selectIsLoading,
} from "../../../features/loader/loaderSlice";
import {
  storeAllPatients,
  patients,
  storeCurrentPatient,
  currentPatient,
} from "../../../features/patient/patientSlice";
import styled from "styled-components/macro";
import Pagination from "rc-pagination";
import frFR from "rc-pagination/lib/locale/fr_FR";
import { MainTemplate, UserDesktopTemplate } from "../../../templates";
import { Loader, ReadOne, WriteOne } from "../..";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  File,
  Edit2,
} from "react-feather";
import { formatDate, sortAlphabetically } from "../../../utils/dataParsing";

const PatientsListing = (props) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const allPatients = useSelector(patients);
  const onePatient = useSelector(currentPatient);
  const [fetchAllIsDone, toggleFetchAllStatus] = useState(false);
  const [fetchOneIsDone, toggleFetchOneStatus] = useState(false);
  const [currentPagePatients, updateCurrentPagePatients] = useState([]);
  const [selectedPatientId, updateSelectedPatientId] = useState("");
  const [mode, switchMode] = useState("readAll");
  const [currentPage, changeCurrentPage] = useState(1);
  const pageSize = 10;
  const { pathname } = props.location;

  const switchDisplayMode = (mode, id = null) => {
    switchMode(mode);
    if (id !== null) {
      updateSelectedPatientId(id);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const fetchAllPatients = () => {
      dispatch(displayLoader());
      fetch(`${process.env.REACT_APP_APIBASEURL}/api/patients/readall`, {
        method: "GET",
        signal: abortController.signal,
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch(storeAllPatients(data));
          dispatch(hideLoader());
          toggleFetchAllStatus(true);
        })
        .catch((error) => {
          dispatch(hideLoader());
          toggleFetchAllStatus(true);
        });
    };
    fetchAllPatients();
    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    updateCurrentPagePatients(
      sortAlphabetically(allPatients, "surname").slice(0, 10)
    );
  }, [allPatients]);

  useEffect(() => {
    if (mode === "readOne" || mode === "writeOne") {
      const abortController2 = new AbortController();
      const fetchPatient = () => {
        dispatch(displayLoader());
        fetch(
          `${process.env.REACT_APP_APIBASEURL}/api/patients/readone/${selectedPatientId}`,
          {
            method: "GET",
            signal: abortController2.signal,
          }
        )
          .then((response) => response.json())
          .then((data) => {
            dispatch(storeCurrentPatient(data));
            dispatch(hideLoader());
            toggleFetchOneStatus(true);
          })
          .catch((error) => {
            dispatch(hideLoader());
            toggleFetchOneStatus(true);
          });
      };
      fetchPatient();
      return () => {
        abortController2.abort();
      };
    }
  }, [dispatch, selectedPatientId, mode]);

  return (
    <>
      {mode === "readAll" && (
        <MainTemplate
          component={
            <UserDesktopTemplate title="Liste des patients" pathname={pathname}>
              {(isLoading || !fetchAllIsDone) && <Loader />}
              {!isLoading && fetchAllIsDone && (
                <>
                  {currentPagePatients.length > 0 ? (
                    <>
                      <StyledTable>
                        <thead>
                          <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Date de naissance</th>
                            <th className="center">Consulter</th>
                            <th className="center">Modifier</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentPagePatients.map((patient) => (
                            <tr key={patient._id}>
                              <td>{patient.surname}</td>
                              <td>{patient.firstname}</td>
                              <td>{formatDate(patient.dob, "dd/MM/yyyy")}</td>
                              <td className="center">
                                <button
                                  onClick={() =>
                                    switchDisplayMode("readOne", patient._id)
                                  }
                                  type="button"
                                >
                                  <File color="hsl(93, 7%, 10%)" size={24} />
                                </button>
                              </td>
                              <td className="center">
                                <button
                                  onClick={() =>
                                    switchDisplayMode("writeOne", patient._id)
                                  }
                                  type="button"
                                >
                                  <Edit2 color="hsl(93, 7%, 10%)" size={24} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </StyledTable>
                      <PaginationWrapper>
                        <Pagination
                          total={allPatients.length}
                          current={currentPage}
                          pageSize={pageSize}
                          onChange={(current, pageSize) => {
                            updateCurrentPagePatients(
                              sortAlphabetically(allPatients, "surname").slice(
                                (current - 1) * pageSize,
                                (current - 1) * pageSize + pageSize
                              )
                            );
                            changeCurrentPage(current);
                          }}
                          hideOnSinglePage={true}
                          locale={frFR}
                          className="rc-pagination"
                          prevIcon={<ChevronLeft size={30} />}
                          nextIcon={
                            <ChevronRight
                              color="hsl(238, 17%, 36%)"
                              size={30}
                            />
                          }
                          jumpPrevIcon={
                            <ChevronsLeft
                              color="hsl(238, 17%, 36%)"
                              size={30}
                            />
                          }
                          jumpNextIcon={
                            <ChevronsRight
                              color="hsl(238, 17%, 36%)"
                              size={30}
                            />
                          }
                        />
                      </PaginationWrapper>
                    </>
                  ) : (
                    <div>Aucun patient enregistré</div>
                  )}
                </>
              )}
            </UserDesktopTemplate>
          }
          {...props}
        />
      )}
      {mode === "readOne" && (
        <ReadOne
          patient={onePatient}
          handleSwitchClick={(mode) => switchDisplayMode(mode)}
          stoppedLoading={!isLoading && fetchOneIsDone ? true : false}
          {...props}
        />
      )}
      {mode === "writeOne" && (
        <WriteOne
          patient={onePatient}
          stoppedLoading={!isLoading && fetchOneIsDone ? true : false}
          {...props}
        />
      )}
    </>
  );
};

export default PatientsListing;

const StyledTable = styled.table`
  background: var(--color-white);
  border-collapse: collapse;

  thead {
    background: var(--color-primary);
    color: var(--text-color);
    th {
    }
  }

  tbody {
    tr {
      td {
      }
    }

    @media (hover: hover) {
      tr:hover {
        background: var(--color-primary-light);
      }
    }
  }

  td,
  th {
    text-align: left;
    padding: 15px;
    border: 1px solid var(--text-color);

    &.center {
      text-align: center;
    }
  }
`;

const PaginationWrapper = styled.div`
  > ul.rc-pagination {
    display: flex;

    > li {
      display: flex;
      align-items: center;

      > svg {
        stroke: var(--color-primary);
      }
    }

    > li.rc-pagination-disabled {
      > svg {
        stroke: hsl(0, 0%, 74%);
      }
    }

    > li:not(.rc-pagination-disabled) {
      cursor: pointer;
    }

    > .rc-pagination-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      color: var(--text-color);
      border-radius: 50%;
    }

    > .rc-pagination-item-active {
      background: var(--color-primary);
    }

    > :not(:first-child) {
      margin-left: 7.5px;
    }
  }
`;
