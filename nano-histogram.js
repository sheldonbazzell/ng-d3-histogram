function Histogram(values) {

    var options = {'width':860, 'height':400};

    function chart() {
        console.log(options)
        var listen = d3.dispatch('barHover');
        var formatCount = d3.format(",.0f");

        var margin = {top: 20, right: 30, bottom: 30, left: 30},
            width  = options.width - margin.left - margin.right,
            height = options.height - margin.top - margin.bottom;
        var max    = d3.max(values);
        var min    = d3.min(values);

        var x = d3.scale.linear()
            .domain([min, max])
            .range([0, width]);

        var data = d3.layout.histogram()
            .bins(x.ticks(20))
            (values);

        var yMax = d3.max(data, function(d){return d.length}),
            yMin = d3.min(data, function(d){return d.length});

        var y = d3.scale.linear()
            .domain([0, yMax])
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left');

        var svg = d3.select("#container").insert("svg", ":first-child")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("hovered", "hovered(args)")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," 
            + margin.top + ")");

        var bar = svg.selectAll(".bar")
            .data(data)
            .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function(d) { 
                return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

        bar.append("rect")
            .attr("x", 1)
            .attr("width", (x(data[0].dx) - x(0)) - 1)
            .attr("height", function(d) { return height - y(d.y); })

        bar.append("text")
            .attr("dy", ".75em")
            .attr("y", -12)
            .attr("x", (x(data[0].dx) - x(0)) / 2)
            .attr("text-anchor", "middle")
            .text(function(d) { return formatCount(d.y) });

        bar.on('mouseover', function(d){
            var nodeSelection = d3.select(this).style({opacity:'0.8'});
            nodeSelection.select("text").style({opacity:'1.0'});
        });
        
        svg.append("g")
            .attr("class", "x axis")
            .attr("class", "y axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

//         .on('mouseover', function(d){
//     var nodeSelection = d3.select(this).style({opacity:'0.8'});
//     nodeSelection.select("text").style({opacity:'1.0'});
// })

    }

    chart.width = function(value) {
        if (!arguments.length) return width;
        options.width = value;
        console.log(options.width)
        d3.select("svg").remove();
        return chart();
    };

    // chart.height = function(value) {
    //     if (!arguments.length) return height;
    //     height = value;
    //     return chart;
    // };

    return chart;
}
    // this.updateGraph = function(values, options) {

    //     var margin = {top: 20, right: 30, bottom: 30, left: 30},
    //         width  = options.width  - margin.left - margin.right,
    //         height = options.height - margin.top  - margin.bottom;

    //     var x = d3.scale.linear()
    //         .domain([min, max])
    //         .range([0, width]);
       
    //     var data = d3.layout.histogram()
    //         .bins(x.ticks(20))
    //         (values);

    //     var xAxis = d3.svg.axis()
    //         .scale(x)
    //         .orient("bottom");

    //     var bar = svg.selectAll(".bar").data(data);

    //     bar.exit().remove();

    //     bar.transition()
    //         .duration(1000)
    //         .attr("transform", function(d) { return "translate(" +
    //             x(d.x) + "," + y(d.y) + ")"; });

    //     bar.select("rect")
    //         .transition()
    //         .duration(1000)
    //         .attr("height", function(d) { return height - y(d.y); })

    //     bar.select("text")
    //         .transition()
    //         .duration(1000)
    //         .text(function(d) { return formatCount(d.y); });
    // }
        // setInterval(function() {
        //     updateGraph(values, {'width':400, 'height':400});
        // }, 2000);
    // return this;
