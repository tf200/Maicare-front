import axios from "axios";

const UseSignIn = async (
  authData: {},
  setIsLoading: any,
  setAlertState: any,
  router: any
) => {
  setIsLoading(true);
  setAlertState(["", ""]);

  await axios
    .post(process.env.NEXT_PUBLIC_API_URL + "/token/", authData)
    .then((response) => {
      window.localStorage.setItem("a", response.data.access);
      window.localStorage.setItem("r", response.data.refresh);
      setAlertState(["Successfully login in", "green"]);
      setTimeout(() => {
        router.push("/dashboard/crm");
      }, 1500);
    })
    .catch((error) => {
      setIsLoading(false);
      setAlertState([
        "No active account found with the given credentials",
        "red",
      ]);
    });
};

export default UseSignIn;
