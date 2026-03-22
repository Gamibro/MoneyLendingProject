import React, { createContext, useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAccessHeadComponent } from "../action/Common";

const HeaderContext = createContext();
export const useHeader = () => useContext(HeaderContext);

export const HeaderComponentProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { headComponent } = useSelector((state) => state.common);

  const [headerComponents, setHeaderComponents] = useState([]);

  useEffect(() => {
    dispatch(GetAccessHeadComponent());
  }, [dispatch]);

  useEffect(() => {
    if (headComponent) setHeaderComponents(headComponent);
  }, [headComponent]);

  return (
    <HeaderContext.Provider value={{ headerComponents }}>
      {children}
    </HeaderContext.Provider>
  );
};
