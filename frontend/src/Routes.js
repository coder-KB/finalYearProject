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

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/signin" exact component={SignIn} />
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
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
