import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../app/users/user.selector";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  addListingToFavorites,
  fetchFavouriteListing,
  removeListingFromFavorites,
} from "../utils/firebase/firebase";
import { useEffect, useState } from "react";
import { selectMyFavCourse } from "../../app/my-favourite/myFav.selector";
import { setmyFavCourse } from "../../app/my-favourite/myFav.reducer";
import useLoginModal from "../hooks/useLoginModal";
import {
  addCourseToFavorites,
  fetchFavouriteCourses,
  removeCourseFromFavorites,
} from "../../utils/firebase/firebase.utils";

const HeartButton = (data) => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [hasFavorited, setHasFavorited] = useState(false);
  const myFavCourse = useSelector(selectMyFavCourse);

  const addCourseToMyList = () => {
    addCourseToFavorites(currentUser.uid, data.course);
  };
  const removeCourseToMyList = () => {
    console.log(data?.course?.id);
    removeCourseFromFavorites(currentUser?.uid, data?.course?.id);
  };

  const toggleFavorite = (event) => {
    event.stopPropagation(); // Stop event propagation

    if (hasFavorited) {
      //remove fav
      removeCourseToMyList();
    } else {
      //add fav
      addCourseToMyList();
    }

    if (currentUser) {
      const unsubscribefetchFavouriteListing = fetchFavouriteCourses(
        currentUser?.uid,
        (userMyFavorites) => {
          dispatch(setmyFavCourse(userMyFavorites));
        }
      );
      return () => {
        // Unsubscribe from the snapshot listener when the component unmounts
        unsubscribefetchFavouriteListing();
      };
    }
  };

  useEffect(() => {
    const index = myFavCourse.myFavCourses.findIndex((element) => {
      return element?.id === data.course?.id || element?.id === data?.id;
    });
    console.log(index);
    if (index === -1) {
      setHasFavorited(false);
    } else {
      setHasFavorited(true);
    }
  }, [myFavCourse]);

  return (
    <div
      onClick={toggleFavorite}
      className="
            relative
            hover:opacity-80
            transition
            cursor-pointer
          "
    >
      <AiOutlineHeart
        size={28}
        className="
              fill-white
              absolute
              -top-[2px]
              -right-[2px]
            "
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
      />
      1
    </div>
  );
};
export default HeartButton;
