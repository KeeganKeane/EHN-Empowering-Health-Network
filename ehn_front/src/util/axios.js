import { Api, JavascriptRounded, SettingsBackupRestoreSharp } from "@mui/icons-material";
import axios from "axios";

const ApiClient = axios.create({
  // TODO: refact URL
  baseURL: `http://localhost:18082/ehnapi`,
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN'
});

export default ApiClient;



//// How to Use:
//
// import this file
// import ApiClient from '../../util/axios';
// 
// 
//// All method component
// const [/*[Object]*/, /*set[Object]*/] = useState([]); 
// const [error, setError] = useState([]);

//// -------GET--------
// ApiClient.get(/*[URL]*/)
// .then(res => {
//   setUser(res.data.users);
// })
// .catch(
//   setError(res.data.message));

//// If you want to get at rendering
// useEffect(() => {
//   ApiClient.get(/*[URL]*/)
//     .then(res => {
//       setUser(res.data.users);
//     })
//     .catch(
//       setError(res.data.message));
// }, []);


//// -------POST--------
// ApiClient.post(/*[URL]*/, /*REQUEST BODY*/ */).then(res => {
//   setUser(res.message);
// })
// .catch(
//   setError(res.data.message));


