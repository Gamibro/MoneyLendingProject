import {
  EMPLOYEE_CREATE_REQUEST,
  EMPLOYEE_CREATE_SUCCESS,
  EMPLOYEE_CREATE_FAIL,
  EMPLOYEE_READ_REQUEST,
  EMPLOYEE_READ_SUCCESS,
  EMPLOYEE_READ_FAIL,
  DEPARTMENT_LIST_SUCCESS,
  DEPARTMENT_LIST_FAIL,
  LOCATION_LIST_SUCCESS,
  LOCATION_LIST_FAIL,
  DESIGNATION_LIST_SUCCESS,
  DESIGNATION_LIST_FAIL,
  EDUCATION_LIST_SUCCESS,
  EDUCATION_LIST_FAIL,
  HOMETOWN_LIST_SUCCESS,
  HOMETOWN_LIST_FAIL
} from "../constants/employeeConstants";

const initialState = {
  employees: [],
  employeeLoading: false,
  employeeError: null,
  departments: [],
  locations: [],
  designations: [],
  educations: [],
  hometowns: []
};

export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYEE_CREATE_REQUEST:
    case EMPLOYEE_READ_REQUEST:
      return { ...state, employeeLoading: true, employeeError: null };
    case EMPLOYEE_CREATE_SUCCESS:
      return { ...state, employeeLoading: false, employees: [...state.employees, action.payload] };
    case EMPLOYEE_READ_SUCCESS:
      return { ...state, employeeLoading: false, employees: action.payload };
    case EMPLOYEE_CREATE_FAIL:
    case EMPLOYEE_READ_FAIL:
      return { ...state, employeeLoading: false, employeeError: action.payload };

    // ------------------ DROPDOWNS ------------------
    case DEPARTMENT_LIST_SUCCESS:
      return { ...state, departments: action.payload };
    case LOCATION_LIST_SUCCESS:
      return { ...state, locations: action.payload };
    case DESIGNATION_LIST_SUCCESS:
      return { ...state, designations: action.payload };
    case EDUCATION_LIST_SUCCESS:
      return { ...state, educations: action.payload };
    case HOMETOWN_LIST_SUCCESS:
      return { ...state, hometowns: action.payload };

    case DEPARTMENT_LIST_FAIL:
    case LOCATION_LIST_FAIL:
    case DESIGNATION_LIST_FAIL:
    case EDUCATION_LIST_FAIL:
    case HOMETOWN_LIST_FAIL:
      return { ...state, employeeError: action.payload };

    default:
      return state;
  }
};
