import React, { Component } from "react";

import SeoTags from "../../components/SeoTags";
import SidebarLayout from "../../components/Layouts/SidebarLayout";

export default class ContactUs extends Component {
  render() {
    return <SidebarLayout content={this.renderContent()} />;
  }

  renderContent() {
    return (
      <div style={{ marginBottom: "-28px", marginTop: "-20px" }}>
        <SeoTags seo={{}} apiRoot={this.props.apiRootUrl} />

        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLScXU0z1do3gzj3VGHrHpnRdWtREGqnC3cnnAjVNJJJDNKcVQA/viewform?embedded=true"
          width="100%"
          height="2000px"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
        >
          If the form does not load within few seconds, please visit the
          following link:
          https://docs.google.com/forms/d/e/1FAIpQLScXU0z1do3gzj3VGHrHpnRdWtREGqnC3cnnAjVNJJJDNKcVQA/viewform?embedded=true
        </iframe>
      </div>
    );
  }
}
