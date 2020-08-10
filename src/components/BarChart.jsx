import React, { Component } from "react";
import * as d3 from "d3";

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    const {
      data1,
      data2,
      w,
      h,
      heightPadding,
      widthPadding,
      time,
    } = this.props;
    console.log("Data", data1);

    const tooltip = document.getElementById("tooltip");

    const barWidth = Math.floor(w / (1.25 * data1.length));

    const yScale1 = d3
      .scaleLinear()
      .domain([0, d3.max(data1, (d) => d[1]) + d3.min(data1, (d) => d[0])])
      .range([h - heightPadding, heightPadding]);

    const yScale2 = d3
      .scaleLinear()
      .domain([0, d3.max(data2, (d) => d.loanOutstanding)])
      .range([h - heightPadding, heightPadding]);

    const xScale1 = d3
      .scaleLinear()
      .domain([0, time])
      .range([widthPadding, w - widthPadding]);

    const xScale2 = d3
      .scaleLinear()
      .domain([0, time * 12])
      .range([widthPadding, w - widthPadding]);

    const accessToRef = d3 //create the svg
      .select(this.myRef.current)
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .style("margin", 10)
      .style("color", "black");

    accessToRef //capital portion
      .selectAll(".rectCapital")
      .data(data1)
      .enter()
      .append("rect")
      .attr("class", "rectCapital")
      .attr("x", (d, i) => xScale1(i))
      .attr("y", (d) => yScale1(d[0]))
      .attr("width", barWidth)
      .attr("height", (d) => h - yScale1(d[0]) - heightPadding)
      .on("mouseover", (d, i) => {
        tooltip.classList.add("show");
        tooltip.style.left = `${d3.event.pageX + 10}px`;
        tooltip.style.top = `${d3.event.pageY - 70}px`;
        tooltip.innerHTML = `
          <p>Year ${i + 1}</p>
          <p>Total Principal £ ${d[0].toFixed(2)}</p>
      `;
      })
      .on("mousemove", (d, i) => {
        tooltip.style.left = `${d3.event.pageX + 10}px`;
        tooltip.style.top = `${d3.event.pageY - 70}px`;
        tooltip.innerHTML = `
          <p>Year ${i + 1}</p>
          <p>Total Principal £ ${d[0].toFixed(2)}</p>
      `;
      })
      .on("mouseout", () => {
        tooltip.classList.remove("show");
      });

    accessToRef //interest portion
      .selectAll(".rectInterest")
      .data(data1)
      .enter()
      .append("rect")
      .attr("class", "rectInterest")
      .attr("x", (d, i) => xScale1(i))
      .attr("y", (d) => yScale1(d[0] + d[1]))
      .attr("width", barWidth)
      .attr("height", (d) => h - yScale1(d[1]) - heightPadding)
      .on("mouseover", (d, i) => {
        tooltip.classList.add("show");
        tooltip.style.left = `${d3.event.pageX + 10}px`;
        tooltip.style.top = `${d3.event.pageY - 70}px`;
        tooltip.innerHTML = `
          <p>Year ${i + 1}</p>
          <p>Total Interest £ ${d[1].toFixed(2)}</p>
      `;
      })
      .on("mousemove", (d, i) => {
        tooltip.style.left = `${d3.event.pageX + 10}px`;
        tooltip.style.top = `${d3.event.pageY - 70}px`;
        tooltip.innerHTML = `
          <p>Year ${i + 1}</p>
          <p>Total Interest £ ${d[1].toFixed(2)}</p>
      `;
      })
      .on("mouseout", () => {
        tooltip.classList.remove("show");
      });

    accessToRef // draw outstanding loan amount line
      .append("path")
      .attr("class", "path")
      .datum(data2)
      .attr("fill", "none")
      .attr("stroke-width", 4)
      .attr(
        "d",
        d3
          .line()
          .x((d, i) => xScale2(i))
          .y((d) => yScale2(d.loanOutstanding))
      );

    accessToRef //add circles to outstanding loan amount
      .selectAll("circle")
      .data(data2)
      .enter()
      .filter((d, i) => i % 12 === 0)
      .append("circle")
      .attr("class", "dot")
      .attr("data-xvalue", (d) => d[1])
      .attr("data-yvalue", (d) => d[0])
      .attr("cx", (d, i) => xScale1(i))
      .attr("cy", (d) => yScale2(d.loanOutstanding))
      .attr("fill", "white")
      .attr("stroke-width", "0.5px")
      .attr("r", 5)
      .on("mouseover", (d, i) => {
        tooltip.classList.add("show");
        tooltip.style.left = `${d3.event.pageX + 10}px`;
        tooltip.style.top = `${d3.event.pageY - 70}px`; //this position is still not correct
        tooltip.innerHTML = `<p>Year ${i + 1}</p>
          <p>Loan Outstanding £ ${d.loanOutstanding.toFixed(2)}</p>`;
      })
      .on("mousemove", (d, i) => {
        tooltip.style.left = `${d3.event.pageX + 10}px`;
        tooltip.style.top = `${d3.event.pageY - 70}px`;
        tooltip.innerHTML = `
          <p>Year ${i + 1}</p>
          <p>Loan Outstanding £ ${d.loanOutstanding.toFixed(2)}</p>
      `;
      })
      .on("mouseout", () => {
        tooltip.classList.remove("show");
      });

    //create axis
    const xAxis = d3.axisBottom(xScale1).ticks(time);
    const yAxisLeft = d3.axisLeft(yScale1);
    const yAxisRight = d3.axisRight(yScale2);

    accessToRef
      .append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0, ${h - heightPadding})`)
      .call(xAxis);

    accessToRef
      .append("g")
      .attr("id", "y-axisRight")
      .attr("transform", `translate(${w - widthPadding}, 0)`)
      .call(yAxisRight);

    accessToRef
      .append("g")
      .attr("id", "y-axisLeft")
      .attr("transform", `translate(${widthPadding}, 0)`)
      .call(yAxisLeft);

    accessToRef //add axis labels
      .append("text")
      .attr("class", "bold-label")
      .attr("transform", `translate(${w / 2}, ${h - 20})`)
      .style("text-anchor", "middle")
      .text("Years");

    accessToRef
      .append("text")
      .attr("class", "graph-heading")
      .attr("transform", `translate(${w / 2}, ${45})`)
      .style("text-anchor", "middle")
      .text("Amortization Schedule");

    accessToRef
      .append("text")
      .attr("class", "bold-label")
      .attr("transform", "rotate(-90)")
      .attr("y", 3)
      .attr("x", 0 - h / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Annual Payments");

    accessToRef
      .append("text")
      .attr("class", "bold-label")
      .attr("transform", "rotate(-90)")
      .attr("y", w - 30)
      .attr("x", 0 - h / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Outstanding Loan Amount");
  }

  render() {
    return (
      <>
        <div ref={this.myRef}>
          <div className="tooltip" id="tooltip"></div>
        </div>
      </>
    );
  }
}

export default BarChart;
