import axios from "axios";

const UseSignIn = async (
  authData: {},
  setIsLoading: any,
  setAlertMessage: any
) => {
  setIsLoading(true);
  setAlertMessage("");

  await axios
    .post(process.env.NEXT_PUBLIC_AUTH_API, authData)
    .then((response) => {
      console.log("Response:", response.data);
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      window.open("/dashboard/crm", "_self");
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
      setAlertMessage("No active account found with the given credentials");
    });
};

export default UseSignIn;
