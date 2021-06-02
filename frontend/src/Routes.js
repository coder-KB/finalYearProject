import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import SignIn from "./components/ui/SignIn";
import SignUp from "./components/ui/SignUp";
import AdminRoute from "./auth/helper/AdminRoute";
import DashBoard from "./components/admin/DashBoard";
import AddTeacher from "./components/admin/teacher/AddTeacher";
import AddSection from "./components/admin/section/AddSection";
import ManageSection from "./components/admin/section/ManageSections";
import ManageTeachers from "./components/admin/teacher/ManageTeachers";
import UpdateTeacher from "./components/admin/teacher/UpdateTeacher";
import UpdateSection from "./components/admin/section/UpdateSection";
import Timetable from "./components/Timetable";
import PrivateRoute from "./auth/helper/PrivateRoute";
import Generate from "./components/admin/Generate";
import About from "./components/ui/About";
import TeacherRoute from "./auth/helper/TeacherRoute";
import Attendance from "./components/admin/Attendance";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/signin" exact component={SignIn} />
                <Route path="/about" exact component={About} />
                <AdminRoute
                    path="/admin/dashboard"
                    exact
                    component={DashBoard}
                />
                <AdminRoute
                    path="/admin/teacher/create"
                    exact
                    component={AddTeacher}
                />
                <AdminRoute
                    path="/admin/teachers"
                    exact
                    component={ManageTeachers}
                />
                <AdminRoute
                    path="/admin/teacher/update/:teacherInitial"
                    exact
                    component={UpdateTeacher}
                />
                <AdminRoute
                    path="/admin/section/create"
                    exact
                    component={AddSection}
                />
                <AdminRoute
                    path="/admin/sections"
                    exact
                    component={ManageSection}
                />
                <AdminRoute
                    path="/admin/section/update/:sectionName"
                    exact
                    component={UpdateSection}
                />
                <AdminRoute
                    path="/admin/timetable"
                    exact
                    component={Generate}
                />
                <PrivateRoute path="/timetable" exact component={Timetable} />
                <TeacherRoute
                    path="/timetable/attendance"
                    exact
                    component={Attendance}
                />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
