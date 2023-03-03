import React from "react";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentuser"));
  function logout() {
    localStorage.removeItem("currentuser");
    window.location.href = "/login";
  }
  return (
    <div>
      <nav class="navbar navbar-expand-lg ">
        <a class="navbar-brand" href="">
          Hotels.ng
        </a>
        {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"><i class="fa fa-bars" style={{ color: 'white' }}></i></span>
                </button> */}
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mr-5">
            {user ? (
              <>
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-user mr-2"></i>
                    {user.name}
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a class="dropdown-item" href="/bookings">
                      Profile
                    </a>
                    <a class="dropdown-item" onClick={logout}>
                      Logout
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <>
                <li class="nav-item active">
                  <a class="nav-link" href="/register">
                    Register{" "}
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/login">
                    Logins
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
