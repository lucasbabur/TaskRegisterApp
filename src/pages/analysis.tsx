import React from "react";

import { Text } from "@chakra-ui/react";

import {
  Navbar,
  NavbarButton,
  NavbarItem,
  NavbarLogo,
  NavbarToggleColorModeButton,
} from "../components/home/Navbar/index";

import { DatepickerAnalysisComponent } from "../components/analysis/AnalysisDatepicker";
import { AnalysisCharts } from "../components/analysis/AnalysisCharts";
import { AnalysisProvider } from "@/components/generalAbstractions/analysisContext/AnalysisContext";

export default function Swibc() {
  return (
    <>
      <AnalysisProvider>
        <DatepickerAnalysisComponent />
        <AnalysisCharts />
      </AnalysisProvider>
    </>
  );
}
