import { apiRoot } from "../config";

const get = (url, lang) => {
   let myHeaders = new Headers();
   if (lang === "hi") {
      myHeaders.set("Accept-Language", "hi");
    } else {
      myHeaders.set("Accept-Language", "en-us");
    }
  return fetch(url, {headers: myHeaders})
    .then(response => {
      if (response.status === 404) {
        return Promise.reject(new Error("Page not found: " + url));
      }
      const contentType = response.headers.get("content-type");
      if (
        response.status >= 200 &&
        response.status < 300 &&
        contentType &&
        contentType.indexOf("application/json") !== -1
      ) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    })
    .catch(error => {
      return Promise.reject(new Error(error.message));
    });
};

const HomePage = () => get(`${apiRoot}/api/homepage/`);
const GuidePage = () => get(`${apiRoot}/api/guides/`);

const CataloguePage = url => get(`${apiRoot}/api${url}`);

const LawExplainersPage = lang => get(`${apiRoot}/api/law-explainers/`,lang);



const api = { HomePage, GuidePage, CataloguePage, LawExplainersPage };
export default api;
