import axios from "axios";
import api from "@/utils/api";

const UseSignIn = async (authData: {}, setIsLoading: any, setAlertState: any) => {
  setIsLoading(true);
  setAlertState(["", ""]);

  await api
    .post("token/", authData)
    .then((response) => {
      localStorage.setItem("a", response.data.access);
      localStorage.setItem("r", response.data.refresh);
      setAlertState(["Successfully login in", "green"]);
      setTimeout(() => {
        open("/dashboard", "_self");
      }, 1500);
    })
    .catch((error) => {
      setIsLoading(false);
      setAlertState(["No active account found with the given credentials", "red"]);
    });
};

export default UseSignIn;
