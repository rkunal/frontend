import { apiRoot } from "../config";

const get = url => {
  return fetch(url)
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

const api = { HomePage, GuidePage, CataloguePage };
export default api;
