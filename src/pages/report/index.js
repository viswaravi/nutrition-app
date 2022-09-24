import "./styles.scss";
import BarChart from "../../components/libCharts/barChart/index";
import PieChart from "../../components/libCharts/pieChart/index";
import D3BarChart from "../../components/d3Charts/barChart";
import Pdf from "react-to-pdf";
import { useRef } from "react";

function Report() {
  const data = {
    districtName: "Madurai",
    stateName: "TamilNadu",
  };

  const pdfTargetRef = useRef();

  return (
    <div className="report-page">

      <pdf targetRef={pdfTargetRef} filename="code-example.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
      </pdf>
      
      <button onClick={() => window.print()}>Print</button>

      <div ref={pdfTargetRef}>
        <div className="name-container">
          <span>{data.districtName}</span>
          <div className="divider"></div>
          <span>{data.stateName}</span>
        </div>

        <D3BarChart />

        <BarChart />
      </div>
      {/* <div className="discussion-points-container">
        <p>Possible Points of discussion</p>

        <ul>
          <li>
            How does the district perform on stunting, wasting, underweight and
            anemia among children under the age of 5?
          </li>
          <li>
            What are the levels of anemia prevalence and low body mass index
            among women?
          </li>
        </ul>
      </div> */}

      {/* <PieChart /> */}
    </div>
  );
}

export default Report;
