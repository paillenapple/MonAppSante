import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeCurrentJob, currentJob } from "./../../features/job/jobSlice";
import {
  DashboardTemplate,
} from "../../templates";
import { Loader } from "./../business-components";

const SeekerOneJob = (props) => {
  const dispatch = useDispatch();
  const currentPageJob = useSelector(currentJob);
  const [isLoading, setLoadingStatus] = useState(true);
  const { pathname } = props.location;
  const { currentUser } = props;

  useEffect(() => {
    setLoadingStatus(true);
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
        .finally(() => setLoadingStatus(false));
    };
    fetchCurrentJob();
    return () => {
      dispatch(storeCurrentJob({}));
      abortController.abort();
    };
  }, [dispatch, props.match.params.id]);

  return (
    <DashboardTemplate
      title="One job"
      pathname={pathname}
      currentUser={currentUser}
    >
      {isLoading ? <Loader /> : <h2>Job n°{currentPageJob.jobId}</h2>}
    </DashboardTemplate>
  );
};

export default SeekerOneJob;
