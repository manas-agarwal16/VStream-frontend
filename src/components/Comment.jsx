import React from "react";
import { useSelector } from "react-redux";
import { getComments } from "../store/features/commentSlice";

const Comment = (video_id, parentComment_id) => {
  const { comments, page, hasMore, loading } = useSelector(
    (state) => state.comment
  );

  console.log("video_id in comment : ", video_id);
  console.log("parentComment_id : ", parentComment_id);

  useEffect(() => {
    if (hasMore && !loading) {
      dispatch(getComments({ page, video_id, parentComment_id }));
    }
  }, []);

  // Infinite scroll handler
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      hasMore &&
      !loading
    ) {
      if (video_id) {
        dispatch(incrementPage());
      }
      dispatch(getComments({ page, video_id, parentComment_id }));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  return (
    <div>
      <div>Comments</div>
      <div className="">
        <ul></ul>
      </div>
    </div>
  );
};

export default Comment;
