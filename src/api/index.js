import axios from "axios";

export const postTask = ({ data, userValue }) => {
  const res = axios.post(
    "https://v1.nocodeapi.com/beng88/google_sheets/PzluirzcnArJpwbm?tabId=Sheet1",
    [
      [
        data.text,
        data.list,
        data.date,
        data.time,
        userValue,
        new Date().toLocaleString(),
      ],
    ]
  );

  return res;
};
