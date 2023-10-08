import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listVideosThunk } from "../../services/video-thunk";

const ListVideo = () => {
  const { videoList } = useSelector((state) => state.video);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listVideosThunk());
  }, [dispatch]);

  return (
    <div>
      <ul>
        {videoList.map((videoObj) => {
          return (
            <li>
              <Link
                to={{
                  pathname: `/video/${videoObj._id}`,
                }}
              >
                {videoObj.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListVideo;
