import { useEffect } from "react";
import Router from "next/router";

import { useUserContext } from "@/modules/Auth/Users";

function Dashboard() {
  const { user } = useUserContext();

  useEffect(() => {
    if (!user) Router.push("/");
  }, [user]);

  return <div aria-label="Dashboard"></div>;
}

export default Dashboard;
