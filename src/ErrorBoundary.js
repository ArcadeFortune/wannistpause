// in my react application, when a critical error occurs, the page would turn blank entirely. is there a way to create a 'error page' instead of just a blank page?
import React from "react";
import { resetWebsite } from "./importantFunctions";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      resetWebsite();
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
