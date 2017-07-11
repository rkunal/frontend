/**
 *
 * Inspired from React BoilerPlate Project https://github.com/react-boilerplate/react-boilerplate/blob/52419d8067280ec932942820129e5db3d10d1850/app/components/ProgressBar/ProgressBar.js
 *
*/

import React, { PropTypes } from "react";
import PubSub from "pubsub-js";

class ProgressBar extends React.Component {
  static defaultProps = {
    percent: -1,
    autoIncrement: true,
    intervalTime: 75
  };

  constructor(props) {
    super(props);
    this.token = null;
    this.hasUnmounted = false;
    this.handleProps = this.handleProps.bind(this);
    this.increment = this.increment.bind(this);
    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.state = {
      percent: props.percent
    };
  }
  handleSubscribe(token, percentage) {
    if (percentage < this.state.percent) {
    } else {
      if (percentage === 100) {
        let that = this;
        that.setState({ percent: 99.9 }, function() {
          setInterval(
            function() {
              if (!that.hasUnmounted) that.setState({ percent: 100 });
            },
            1000
          );
        });
      } else {
        this.setState({ percent: percentage });
      }
    }
  }
  componentDidMount() {
    this.token = PubSub.subscribe("LOADER_UPDATE", this.handleSubscribe);
    this.handleProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.interval) {
      // stop progress when new props come in.
      clearInterval(this.interval);
      this.interval = undefined;
    }
    if (this.timeout) {
      // clear timeout when new props come in.
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
    // start progress with updated props.
    this.handleProps(nextProps);
  }

  componentWillUnmount() {
    // cleaning up interval and timeout.
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
    this.hasUnmounted = true;
    PubSub.unsubscribe(this.token);
  }

  increment() {
    /**
     * Increment the percent randomly.
     * Only used when autoIncrement is set to true.
    */
    let { percent } = this.state;
    percent += Math.random() + 1 - Math.random();
    if (percent < 100) {
      percent = percent < 99 ? percent : 99;
      this.setState({
        percent
      });
    } else {
    }
  }

  handleProps(props) {
    /**
     * Increment progress bar if auto increment is set to true
     * and progress percent is less than 99.
    */
    if (props.autoIncrement && props.percent >= 0 && props.percent < 99) {
      this.interval = setInterval(this.increment, props.intervalTime);
    }

    /**
     * Reset the progress bar when percent hits 100
     * For better visual effects, percent is set to 99.9
     * and then cleared in the callback after some time.
    */

    if (props.percent >= 100) {
      this.setState({
        percent: 99.9
      });
    } else {
      this.setState({
        percent: props.percent
      });
    }
  }

  render() {
    const { percent } = this.state;
    // Hide progress bar if percent is less than 0.
    const isHidden = percent < 0 || percent >= 100;
    let zIndex = "-10", visibility = "hidden", opacity = "0";
    if (!isHidden) {
      zIndex = "9999";
      visibility = "visible";
      opacity = "1";
    }
    const ProgressBarWrapper = {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      visibility: visibility,
      opacity: opacity,
      transition: "all 500ms ease-in-out",
      zIndex: zIndex
    };
    // Set `state.percent` as width.
    const style = {
      height: "2px",
      background: "#7ED321",
      transition: "all 300ms ease",
      width: `${percent <= 0 ? 0 : percent}%`
    };

    return (
      <div style={ProgressBarWrapper} hidden={isHidden}>
        <div style={style} />
      </div>
    );
  }
}

ProgressBar.propTypes = {
  percent: PropTypes.number.isRequired
};

export default ProgressBar;
