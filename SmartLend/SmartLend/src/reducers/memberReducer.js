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

const initialState = {
  members: [],
  memberLoading: false,
  memberError: null,
  roles: []
};

export const memberReducer = (state = initialState, action) => {
  switch (action.type) {
    case MEMBER_CREATE_REQUEST:
    case MEMBER_READ_REQUEST:
      return {
        ...state,
        memberLoading: true,
        memberError: null
      };

    case MEMBER_CREATE_SUCCESS:
      return {
        ...state,
        memberLoading: false,
        members: [...state.members, action.payload]
      };

    case MEMBER_READ_SUCCESS:
      return {
        ...state,
        memberLoading: false,
        members: action.payload
      };

    case MEMBER_CREATE_FAIL:
    case MEMBER_READ_FAIL:
      return {
        ...state,
        memberLoading: false,
        memberError: action.payload
      };

    // ------------------ DROPDOWNS ------------------
    case ROLE_LIST_SUCCESS:
      return {
        ...state,
        roles: action.payload
      };

    case ROLE_LIST_FAIL:
      return {
        ...state,
        memberError: action.payload
      };

    default:
      return state;
  }
};
