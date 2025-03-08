import React from "react";

const AdminRoute = (WrappedComponent, requiredRole) => {
  return (props) => {
    const isSignedIn = localStorage.getItem("isSignedIn") === "true";
    const userRole = localStorage.getItem("role");

    if (!isSignedIn) {
      return (
        <div>
          <div className="background-image">
            <img src="/images/Background1.png" alt="Background" />
          </div>
          <section>
            <div className="container grid-col-1 md:grid-cols-2 min-h-[650px]">
              <div>Please sign in to access this page.</div>
            </div>
          </section>
        </div>
      );
    }

    if (requiredRole && userRole !== requiredRole) {
      return (
        <div>
          <div className="background-image">
            <img src="/images/Background1.png" alt="Background" />
          </div>
          <section>
            <div className="container grid-col-1 md:grid-cols-2 min-h-[650px] text-center">
              <div style={{ color: "red", textAlign: "center", fontSize: "20px" }}>
                You are not authorized to view this page.
              </div>
              <img
                src="https://media1.tenor.com/m/cZ9dqIXOQx8AAAAC/no-nooo.gif"
                alt="Noooo GIF"
                className="mx-auto mt-4"
              />
            </div>
          </section>
        </div>
      );
    }

    return (
      <div>
        <div className="background-image">
          <img src="/images/Background1.png" alt="Background" />
        </div>
        <section>
          <div className="container grid-col-1 md:grid-cols-2 min-h-[650px]">
            <WrappedComponent {...props} />
          </div>
        </section>
      </div>
    );
  };
};

export default AdminRoute;
