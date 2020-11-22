import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayToast } from "./../utils/functions";
import {
  storeActiveRecruiterJobs,
  activeRecruiterJobs,
} from "./../features/job/jobSlice";
import {
  displayLoader,
  hideLoader,
  selectIsLoading,
} from "../features/loader/loaderSlice";
import { Loader } from "./business-components";
import JobCard from "./recruiter/JobCard";
import { MainTemplate, UserDesktopTemplate } from "./../templates";

const UserRecruiterDesktop = (props) => {
  const isLoading = useSelector(selectIsLoading);
  const recruiterJobs = useSelector(activeRecruiterJobs);
  const dispatch = useDispatch();
  const [jobDeleted, triggerFetchAfterDeletion] = useState(false);
  const { pathname } = props.location;
  const user = props.currentUser;

  useEffect(() => {
    dispatch(displayLoader());
    const abortController = new AbortController();
    const fetchActiveRecruiterJobs = () => {
      const url = new URL(
        `${process.env.REACT_APP_APIBASEURL}/api/job/read-active-recruiter-jobs/${user.id}`
      );
      fetch(url, {
        method: "GET",
        signal: abortController.signal,
      })
        .then((response) => response.json())
        .then((jobs) => {
          dispatch(storeActiveRecruiterJobs(jobs));
        })
        .catch((error) => console.error(error))
        .finally(() => {
          dispatch(hideLoader());
        });
    };
    fetchActiveRecruiterJobs();
    return () => {
      abortController.abort();
    };
  }, [dispatch, jobDeleted, user.id]);

  const deleteJob = (id) => {
    dispatch(displayLoader());
    const deleteJob = () => {
      const url = new URL(
        `${process.env.REACT_APP_APIBASEURL}/api/job/delete-job`
      );
      const formData = new FormData();
      const formUser = JSON.stringify(user);
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
          dispatch(hideLoader());
        });
    };
    deleteJob();
  };
  return (
    <MainTemplate
      component={
        <UserDesktopTemplate
          title="Mon espace personnel"
          pathname={pathname}
          user={user}
        >
          {isLoading && <Loader />}
          {!isLoading && (
            <>
              <div className="flex flex-col nfc-mt1">
                <span>Nom: {user.surname}</span>
                <span>Prénom: {user.firstname}</span>
                <span>Statut: {user.status}</span>
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
        </UserDesktopTemplate>
      }
      {...props}
    />
  );
};

export default UserRecruiterDesktop;
