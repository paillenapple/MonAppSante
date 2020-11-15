import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  storeCurrentPagePatients,
  patients,
  storeCurrentPatient,
  currentPatient,
} from "../../../features/patient/patientSlice";
import styled from "styled-components/macro";
import Pagination from "rc-pagination";
import frFR from "rc-pagination/lib/locale/fr_FR";
import { MainTemplate, UserDesktopTemplate } from "../../../templates";
import PatientFolder from "./PatientFolder";
import { Loader } from "./../../business-components";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  File,
  Edit2,
} from "react-feather";

const PatientsListing = (props) => {
  const dispatch = useDispatch();
  const currentPagePatients = useSelector(patients);
  const onePatient = useSelector(currentPatient);
  const [isLoading, toggleLoadingStatus] = useState(true);
  const [patientEdited, triggerFetchAfterEdition] = useState(false);
  const [totalPatients, updateTotalPatients] = useState("");
  const [mode, switchMode] = useState("readAll");
  const [currentPage, updateCurrentPage] = useState(1);
  const [paginationOffset, updatePaginationOffset] = useState(0);
  const pageSize = 10;
  const { pathname } = props.location;

  const switchDisplayMode = (mode, id = null) => {
    switchMode(mode);
    if (id === null) {
      dispatch(storeCurrentPatient({}));
    }
    if (id !== null) {
      const patient = currentPagePatients.find((patient) => patient._id === id);
      dispatch(storeCurrentPatient(patient));
    }
  };

  // fetch du nombre total de patients à l'affichage de la page

  useEffect(() => {
    const abortController = new AbortController();
    const fetchTotalPatients = () => {
      const url = new URL(
        `${process.env.REACT_APP_APIBASEURL}/api/patients/count-total-number-patients`
      );
      fetch(url, {
        method: "GET",
        signal: abortController.signal,
      })
        .then((response) => response.json())
        .then((total) => {
          updateTotalPatients(total);
        })
        .catch((error) => {});
    };
    fetchTotalPatients();
    return () => {
      abortController.abort();
    };
  }, []);

  // fetch des patients affichés sur la page active

  useEffect(() => {
    const abortController2 = new AbortController();
    const fetchCurrentPagePatients = () => {
      const url = new URL(
        `${process.env.REACT_APP_APIBASEURL}/api/patients/read-current-page-patients?limit=${pageSize}&offset=${paginationOffset}&sortBy=surname&order=1`
      );
      fetch(url, {
        method: "GET",
        signal: abortController2.signal,
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch(storeCurrentPagePatients(data));
        })
        .catch((error) => {})
        .finally(() => toggleLoadingStatus(false));
    };
    fetchCurrentPagePatients();
    return () => {
      abortController2.abort();
    };
  }, [dispatch, paginationOffset, patientEdited]);

  return (
    <>
      {mode === "readAll" && (
        <MainTemplate
          component={
            <UserDesktopTemplate title="Liste des patients" pathname={pathname}>
              {isLoading && <Loader />}
              {!isLoading && (
                <>
                  {totalPatients > 0 && currentPagePatients.length > 0 ? (
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
                              <td>{patient.dob}</td>
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
                          total={totalPatients}
                          current={currentPage}
                          pageSize={pageSize}
                          onChange={(current, pageSize) => {
                            toggleLoadingStatus(true);
                            updatePaginationOffset(pageSize * (current - 1));
                            updateCurrentPage(current);
                          }}
                          hideOnSinglePage={true}
                          locale={frFR}
                          className="rc-pagination"
                          prevIcon={
                            <ChevronLeft color="hsl(238, 17%, 36%)" size={30} />
                          }
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
      {mode !== "readAll" && (
        <PatientFolder
          handleSwitchClick={(mode) => switchDisplayMode(mode)}
          switchDisplayMode={(mode) => {
            switchDisplayMode(mode);
            triggerFetchAfterEdition((patientEdited) => !patientEdited);
          }}
          toggleLoadingStatus={(bool) => toggleLoadingStatus(bool)}
          mode={mode}
          patient={onePatient}
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
