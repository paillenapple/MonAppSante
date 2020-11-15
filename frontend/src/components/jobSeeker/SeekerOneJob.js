import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeCurrentJob, currentJob } from "./../../features/job/jobSlice";
import { MainTemplate, UserDesktopTemplate } from "../../templates";
import { Loader } from "./../business-components";
import styled from "styled-components";

const SeekerOneJob = (props) => {
  const dispatch = useDispatch();
  const currentPageJob = useSelector(currentJob);
  const [isLoading, toggleLoadingStatus] = useState(true);
  const { pathname } = props.location;
  const user = props.currentUser;

  useEffect(() => {
    toggleLoadingStatus(true);
    const abortController = new AbortController();
    const fetchCurrentJob = () => {
      const url = new URL(
        `${process.env.REACT_APP_APIBASEURL}/api/job/read-one/${props.match.params.id}`
      );
      fetch(url, {
        method: "GET",
        signal: abortController.signal,
      })
        .then((response) => response.json())
        .then((job) => {
          dispatch(storeCurrentJob(job));
        })
        .catch((error) => console.error(error))
        .finally(() => toggleLoadingStatus(false));
    };
    fetchCurrentJob();
    return () => {
      dispatch(storeCurrentJob({}));
      abortController.abort();
    };
  }, []);

  return (
    <MainTemplate
      component={
        <UserDesktopTemplate
          title="One job"
          pathname={pathname}
          user={user}
        >
          {isLoading && <Loader />}
          {
            !isLoading &&
            <h2>Job n°{currentPageJob.jobId}</h2>
          }
        </UserDesktopTemplate>
      }
      {...props}
    />
  );
};

export default SeekerOneJob;
