import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeCurrentPageJobs, jobs } from "./../../features/job/jobSlice";
import { updateUser } from "./../../features/user/userSlice";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import Pagination from "rc-pagination";
import frFR from "rc-pagination/lib/locale/fr_FR";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { displayToast } from "./../../utils/functions";
import {
  DashboardTemplate,
} from "./../../templates";
import {
  Loader,
  // Button
} from "./../business-components";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  File,
  Star,
} from "react-feather";

const SearchJob = (props) => {
  const { currentUser } = props;
  const { pathname } = props.location;
  const pageSize = 10;
  const dispatch = useDispatch();
  const currentPageJobs = useSelector(jobs);
  const [isLoading, setLoadingStatus] = useState(true);
  const [totalJobs, updateTotalJobs] = useState("");
  const [currentPage, updateCurrentPage] = useState(1);
  const [paginationOffset, updatePaginationOffset] = useState(0);
  // const [jobsDisplay, setJobsDisplay] = useState("list");

  // fetch du nombre total d'annonces à l'affichage de la page

  useEffect(() => {
    const abortController = new AbortController();
    const fetchTotalJobs = () => {
      const url = new URL(
        `${process.env.REACT_APP_APIBASEURL}/api/job/count-total-number-jobs`
      );
      fetch(url, {
        method: "GET",
        signal: abortController.signal,
      })
        .then((response) => response.json())
        .then((total) => {
          updateTotalJobs(total);
        })
        .catch((error) => console.error(error));
    };
    fetchTotalJobs();
    return () => {
      abortController.abort();
    };
  }, []);

  // fetch des annonces affichées sur la page active

  useEffect(() => {
    const abortController = new AbortController();
    const fetchCurrentPageJobs = () => {
      const url = new URL(
        `${process.env.REACT_APP_APIBASEURL}/api/job/read-current-page-jobs?limit=${pageSize}&offset=${paginationOffset}&sortBy=jobStartDate&order=-1`
      );
      fetch(url, {
        method: "GET",
        signal: abortController.signal,
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch(storeCurrentPageJobs(data));
        })
        .catch((error) => console.error(error))
        .finally(() => setLoadingStatus(false));
    };
    fetchCurrentPageJobs();
    return () => {
      abortController.abort();
    };
  }, [dispatch, paginationOffset]);

  // gestion de l'ajout / suppression de favori

  const setNewFavoriteJob = (job) => {
    const url = new URL(
      `${process.env.REACT_APP_APIBASEURL}/api/auth/set-job-as-favorite/${currentUser.id}`
    );

    const formData = new FormData();

    var currentUserFavorites = [...currentUser.favorites];
    const favoritesIdsArray = currentUserFavorites.map((f) => f._id);

    const jobIsNotInFavorites = favoritesIdsArray.indexOf(job._id) === -1;
    if (jobIsNotInFavorites) {
      currentUserFavorites.push(job);
      currentUserFavorites = JSON.stringify(currentUserFavorites);
      formData.append("favorites", currentUserFavorites);
    } else {
      var afterRemoval = currentUserFavorites.filter((f) => f._id !== job._id);
      afterRemoval = JSON.stringify(afterRemoval);
      formData.append("favorites", afterRemoval);
    }

    fetch(url, {
      method: "PATCH",
      body: formData,
    })
      .then((response) => response.json())
      .then(() => {
        const url = new URL(
          `${process.env.REACT_APP_APIBASEURL}/api/auth/getuserinfos/${currentUser.id}`
        );
        fetch(url, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            displayToast(
              `L'annonce du docteur ${job.recruiterSurname} a été ${
                jobIsNotInFavorites ? "ajoutée à " : "supprimée de "
              } vos favoris !`
            );
            dispatch(updateUser(data));
          })
          .catch((error) => {
            console.error(error);
            displayToast(
              "Un erreur s'est produite : vos favoris n'ont pas été mis à jour !",
              "error"
            );
          });
      })
      .catch((error) => console.error(error));
  };

  return (
    <DashboardTemplate
      title="Chercher un remplacement"
      pathname={pathname}
      currentUser={currentUser}
    >
      {/* <Button
            className="flex-asc"
            onClick={() =>
              setJobsDisplay((prevDisplay) =>
                prevDisplay === "list" ? "map" : "list"
              )
            }
          >
            {jobsDisplay === "list" ? "Afficher la carte" : "Afficher la liste"}
          </Button> */}
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          {totalJobs > 0 && currentPageJobs.length > 0 ? (
            <>
              <StyledTable>
                <thead>
                  <tr>
                    <th>Nom du médecin</th>
                    <th>Prénom du médecin</th>
                    <th>Du</th>
                    <th>Au</th>
                    <th>Ville</th>
                    <th className="center">Consulter</th>
                    <th className="center">Ajouter à mes favoris</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageJobs.map((job) => (
                    <tr key={job._id}>
                      <td>{job.recruiterSurname}</td>
                      <td>{job.recruiterFirstname}</td>
                      <td>{job.jobStartDate}</td>
                      <td>{job.jobEndDate}</td>
                      <td>{job.jobCity}</td>
                      <td className="center">
                        <Link className="i-flex" to={`/seeker/job/${job._id}`}>
                          <File color="hsl(93, 7%, 10%)" size={24} />
                        </Link>
                      </td>
                      <td className="center">
                        <button
                          className="i-flex"
                          onClick={() => setNewFavoriteJob(job)}
                          type="button"
                        >
                          <Star
                            color={
                              currentUser.favorites.filter(
                                (f) => f._id === job._id
                              ).length === 0
                                ? "hsl(93, 7%, 10%)"
                                : "hsl(40, 75%, 62%)"
                            }
                            size={24}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </StyledTable>
              <PaginationWrapper>
                <Pagination
                  total={totalJobs}
                  current={currentPage}
                  pageSize={pageSize}
                  onChange={(current, pageSize) => {
                    setLoadingStatus(true);
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
                    <ChevronRight color="hsl(238, 17%, 36%)" size={30} />
                  }
                  jumpPrevIcon={
                    <ChevronsLeft color="hsl(238, 17%, 36%)" size={30} />
                  }
                  jumpNextIcon={
                    <ChevronsRight color="hsl(238, 17%, 36%)" size={30} />
                  }
                />
              </PaginationWrapper>
            </>
          ) : (
            <div>Aucune annonce disponible</div>
          )}
        </>
      )}
      {/* {jobsDisplay === "list" && (
            <ul>
              <li>filtres</li>
              <li>carte Leaflet</li>
            </ul>
          )}
          {jobsDisplay === "map" && (
            <MapContainer
              id="mapid"
              center={[48, 1]}
              zoom={5}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
              <Marker position={[48, 1]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          )} */}
    </DashboardTemplate>
  );
};

export default SearchJob;

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
