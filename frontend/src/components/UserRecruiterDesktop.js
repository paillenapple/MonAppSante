import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayToast } from "./../utils/functions";
import {
  storeActiveRecruiterJobs,
  activeRecruiterJobs,
} from "./../features/job/jobSlice";
import { Loader } from "./business-components";
import JobCard from "./recruiter/JobCard";
import { DashboardTemplate } from "./../templates";

const UserRecruiterDesktop = (props) => {
  const recruiterJobs = useSelector(activeRecruiterJobs);
  const dispatch = useDispatch();
  const [jobDeleted, triggerFetchAfterDeletion] = useState(false);
  const [isLoading, setLoadingStatus] = useState(false);
  const { pathname } = props.location;
  const { currentUser } = props;

  // useEffect(() => {
  //   console.log("mount");
  //   return () => {
  //     console.log("unmount");
  //   };
  // }, []);

  useEffect(() => {
    setLoadingStatus(true);
    const abortController = new AbortController();
    const fetchActiveRecruiterJobs = () => {
      const url = new URL(
        `${process.env.REACT_APP_APIBASEURL}/api/job/read-active-recruiter-jobs/${currentUser.id}`
      );
      fetch(url, {
        method: "GET",
        signal: abortController.signal,
      })
        .then((response) => response.json())
        .then((jobs) => {
          dispatch(storeActiveRecruiterJobs(jobs));
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoadingStatus(false);
        });
    };
    fetchActiveRecruiterJobs();
    return () => {
      abortController.abort();
    };
  }, [dispatch, jobDeleted, currentUser.id]);

  const deleteJob = (id) => {
    setLoadingStatus(true);
    const deleteJob = () => {
      const url = new URL(
        `${process.env.REACT_APP_APIBASEURL}/api/job/delete-job`
      );
      const formData = new FormData();
      const formUser = JSON.stringify(currentUser);
      formData.append("id", id);
      formData.append("user", formUser);
      fetch(url, {
        method: "DELETE",
        body: formData,
      })
        .then((response) => response.json())
        .then(() => {
          displayToast(`L'annonce a été correctement supprimée !`);
          triggerFetchAfterDeletion(!jobDeleted);
        })
        .catch((error) => {
          console.error(error);
          displayToast(`L'annonce n'a pas pu être supprimée !`, "error");
          setLoadingStatus(false);
        });
    };
    deleteJob();
  };
  return (
    <DashboardTemplate
      title="Mon espace personnel"
      pathname={pathname}
      currentUser={currentUser}
    >
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <div className="flex flex-col nfc-mt1">
            <span>Nom: {currentUser.surname}</span>
            <span>Prénom: {currentUser.firstname}</span>
            <span>Statut: {currentUser.status}</span>
          </div>
          <h2>Mes annonces</h2>
          <span>Nombre d'annonces : {recruiterJobs.length}</span>
          {recruiterJobs.length > 0 && (
            <ul className="flex flex-col nfc-mt2">
              {recruiterJobs.map((job, index) => {
                return (
                  <li key={`${job.recruiterSurname}-${index}`}>
                    <JobCard job={job} deleteJob={(id) => deleteJob(id)} />
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </DashboardTemplate>
  );
};

export default UserRecruiterDesktop;
