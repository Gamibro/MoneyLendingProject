import axios from "axios";
import {
  MEMBER_CREATE_REQUEST,
  MEMBER_CREATE_SUCCESS,
  MEMBER_CREATE_FAIL,
  MEMBER_READ_REQUEST,
  MEMBER_READ_SUCCESS,
  MEMBER_READ_FAIL,
  ROLE_LIST_SUCCESS,
  ROLE_LIST_FAIL
} from "../constants/memberConstants";

// ------------------ CREATE MEMBER ------------------
export const createMember = (memberData) => async (dispatch) => {
  try {
    dispatch({ type: MEMBER_CREATE_REQUEST });

    const { data } = await axios.post(
      "https://localhost:44364/api/member/action",
      {
        actionType: 1,
        ...memberData
      }
    );

    dispatch({
      type: MEMBER_CREATE_SUCCESS,
      payload: data.data
    });
  } catch (error) {
    dispatch({
      type: MEMBER_CREATE_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message
    });
  }
};

// ------------------ READ ALL MEMBERS ------------------
export const getMembers = () => async (dispatch) => {
  try {
    dispatch({ type: MEMBER_READ_REQUEST });

    const { data } = await axios.post(
      "https://localhost:44364/api/member/action",
      {
        actionType: 2
      }
    );

    dispatch({
      type: MEMBER_READ_SUCCESS,
      payload: data.data
    });
  } catch (error) {
    dispatch({
      type: MEMBER_READ_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message
    });
  }
};

// ------------------ ROLE LIST (STATIC / OPTIONAL) ------------------
export const getRoles = () => async (dispatch) => {
  try {
    const roles = ["User", "Admin"];

    dispatch({
      type: ROLE_LIST_SUCCESS,
      payload: roles
    });
  } catch (error) {
    dispatch({
      type: ROLE_LIST_FAIL,
      payload: error.message
    });
  }
};
