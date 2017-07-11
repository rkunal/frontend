const defaultConfig = {
  showSidebar: false,
  showPublishedDate: false,
  showPrevNext: false,
  hideFooter: true
};
const explainersConfig = {
  showSidebar: false,
  showPublishedDate: true,
  showPrevNext: false,
  hideFooter: false
};
const staticConfig = {
  showSidebar: false,
  showPublishedDate: false,
  showPrevNext: false,
  hideFooter: true
};
const blogConfig = {
  showSidebar: true,
  showPublishedDate: true,
  showPrevNext: true,
  hideFooter: false
};
const guideConfig = {
  showSidebar: true,
  showPublishedDate: true,
  showPrevNext: true,
  hideFooter: true
};

const Config = theme => {
  switch (theme) {
    case "DN":
      return Object.create(explainersConfig);
    case "ST":
      return Object.create(staticConfig);
    case "BL":
      return Object.create(blogConfig);
    case "AA":
      return Object.create(guideConfig);
    default:
      return Object.create(defaultConfig);
  }
};

export default Config;
