const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

const svg = d3.select("#chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const tooltip = d3.select("#tooltip");

d3.json(url).then(data => {
    const x = d3.scaleTime()
        .domain([new Date(data.data[0][0]), d3.max(data.data, d => new Date(d[0]))])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data.data, d => d[1])])
        .range([height, 0]);

    svg.append("g")
        .attr("id", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    svg.append("g")
        .attr("id", "y-axis")
        .call(d3.axisLeft(y));

    svg.selectAll(".bar")
        .data(data.data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(new Date(d[0])))
        .attr("y", d => y(d[1]))
        .attr("width", width / data.data.length)
        .attr("height", d => height - y(d[1]))
        .attr("data-date", d => d[0])
        .attr("data-gdp", d => d[1])
        .on("mouseover", d => {
            tooltip.style("display", "inline");
            tooltip.attr("data-date", d[0]);
            tooltip.text(`Date: ${d[0]} GDP: ${d[1]}`);
        })
        .on("mouseout", d => {
          tooltip.style("display", "none");
        });
});