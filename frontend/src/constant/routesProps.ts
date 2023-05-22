import React from "react";

type ROUTES = {
  name: string;
  path: string;
  component: React.FC;
  exact?: boolean;
  keyRole?: string;
  auth?: boolean;
};

const routesProps: ROUTES[] = [
  //GUEST
  {
    name: "homePage",
    path: "/",
    component: React.lazy(() => import("pages/guest/Guest")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "login",
    path: "/login",
    component: React.lazy(() => import("pages/auth/Login")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "loginUser",
    path: "/loginuser",
    component: React.lazy(() => import("pages/auth/LoginUser")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "registerUser",
    path: "/register",
    component: React.lazy(() => import("pages/auth/RegisterUser")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "deatailGuest1",
    path: "/guestEvent1/:id",
    component: React.lazy(() => import("pages/guest/DetailGuest1")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "deatailGuest2",
    path: "/guestEvent2/:id",
    component: React.lazy(() => import("pages/guest/DetailGuest2")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },

  //ADMIN
  {
    name: "register",
    path: "/registerAdmin",
    component: React.lazy(() => import("pages/auth/Register")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },
  {
    name: "register",
    path: "/users/registerAdmin",
    component: React.lazy(() => import("pages/auth/Register")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },
  {
    name: "users",
    path: "/users",
    component: React.lazy(() => import("pages/admin/Users")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },
  {
    name: "department",
    path: "/department",
    component: React.lazy(() => import("pages/admin/Department")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },
  {
    name: "adddepartment",
    path: "/adddepartment",
    component: React.lazy(() => import("pages/admin/AddDepartment")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },
  {
    name: "eventAdmin",
    path: "/eventAdmin",
    component: React.lazy(() => import("pages/admin/Events")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },
  {
    name: "jobEventAdmin",
    path: "/jobEventAdmin",
    component: React.lazy(() => import("pages/admin/JobEvents")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },

  //SMANAGER
  {
    name: "smanager",
    path: "/smanager",
    component: React.lazy(() => import("pages/SManager/SManager")),
    exact: true,
    keyRole: "smanager",
    auth: true,
  },
  {
    name: "eventAccept",
    path: "/eventAccept",
    component: React.lazy(() => import("pages/SManager/EventAccept")),
    exact: true,
    keyRole: "smanager",
    auth: true,
  },
  {
    name: "approveEvent",
    path: "/approveEvent",
    component: React.lazy(() => import("pages/SManager/ApproveEvents")),
    exact: true,
    keyRole: "smanager",
    auth: true,
  },
  {
    name: "comment",
    path: "/comment",
    component: React.lazy(() => import("pages/SManager/NewComment")),
    exact: true,
    keyRole: "smanager",
    auth: true,
  },


  //MANAGER
  {
    name: "eventManager",
    path: "/eventManager",
    component: React.lazy(() => import("pages/Manager/Events")),
    exact: true,
    keyRole: "manager",
    auth: true,
  },
  {
    name: "ListCTVExcel",
    path: "/ListCTVExcel/:id",
    component: React.lazy(() => import("pages/Manager/ListCTVExcel")),
    exact: true,
    keyRole: "manager",
    auth: true,
  },
  {
    name: "listUserApplyEvent",
    path: "/listUserApply/:id",
    component: React.lazy(() => import("pages/Manager/ListUserApplyEvent")),
    exact: true,
    keyRole: "manager",
    auth: true,
  },
  {
    name: "listCTVEvent",
    path: "/listCTVEvent/:id",
    component: React.lazy(() => import("pages/Manager/ListCTVEvent")),
    exact: true,
    keyRole: "manager",
    auth: true,
  },
  {
    name: "listCTVCalendar",
    path: "/listCTVCalendar/:id",
    component: React.lazy(() => import("pages/Manager/ListCTVCalendar")),
    exact: true,
    keyRole: "manager",
    auth: true,
  },
  {
    name: "event",
    path: "/event",
    component: React.lazy(() => import("pages/Manager/Events")),
    exact: true,
    keyRole: "manager",
    auth: true,
  },
  {
    name: "newevent",
    path: "/event/newevent",
    component: React.lazy(() => import("pages/Manager/NewEvent")),
    exact: true,
    keyRole: "manager",
    auth: true,
  },
  {
    name: "jobEvents",
    path: "/jobEvents/:id",
    component: React.lazy(() => import("pages/Manager/JobFromEvent")),
    exact: true,
    keyRole: "manager",
    auth: true,
  },
  {
    name: "newJobEvent",
    path: "/jobEvent/newJobEvent",
    component: React.lazy(() => import("pages/Manager/NewJobEvent")),
    exact: true,
    keyRole: "manager",
    auth: true,
  },


  //USER
  {
    name: "contentUser",
    path: "/user",
    component: React.lazy(() => import("pages/contents/Content")),
    exact: true,
    keyRole: "user",
    auth: true,
  },
  {
    name: "deatailContent1",
    path: "/event1/:id",
    component: React.lazy(() => import("pages/contents/DetailContent1")),
    exact: true,
    keyRole: "user",
    auth: true,
  },
  {
    name: "deatailContent2",
    path: "/event2/:id",
    component: React.lazy(() => import("pages/contents/DetailContent2")),
    exact: true,
    keyRole: "user",
    auth: true,
  },
  {
    name: "storageEvent",
    path: "/storageEvent",
    component: React.lazy(() => import("pages/User/StorageEvent")),
    exact: true,
    keyRole: "user",
    auth: true,
  },
  {
    name: "DetailStorageEvent",
    path: "/storageEvent/:id",
    component: React.lazy(() => import("pages/User/FeedDetailStorage")),
    exact: true,
    keyRole: "user",
    auth: true,
  },
  {
    name: "applyJob",
    path: "/applyJob",
    component: React.lazy(() => import("pages/User/ApplyJob")),
    exact: true,
    keyRole: "user",
    auth: true,
  },
  {
    name: "manageJob",
    path: "/manageJob",
    component: React.lazy(() => import("pages/User/ManageJob")),
    exact: true,
    keyRole: "user",
    auth: true,
  },
  {
    name: "profile",
    path: "/profile",
    component: React.lazy(() => import("pages/User/Profile")),
    exact: true,
    keyRole: "user",
    auth: true,
  },
  {
    name: "notfound",
    path: "*",
    component: React.lazy(() => import("pages/not-found/NotFound")),
  },
];

export default routesProps;
