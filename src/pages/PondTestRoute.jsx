import React from "react";
import Accord from "../components/Accord";

export default function PondTestRoute() {
  var option = ["All", "Sold", "Available"];
  return (
    <>
      <Accord title="title" option={option} select={false}></Accord>
      <Accord title="title" option={option} select={true}></Accord>

    </>
  );
}
