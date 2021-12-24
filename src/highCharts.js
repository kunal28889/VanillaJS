// https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/treemap-coloraxis
// https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/treemap-large-dataset
(function (data) {
  let points1 = [
    {
      name: "Subnet 7",
      id: "id_1_0",
      parent: "id_1",
      value: 13,
      colorValue: 13
    },
    {
      name: "Subnet 8",
      id: "id_1_1",
      parent: "id_1",
      value: 103,
      colorValue: 103
    }
    // {
    //   name: "Private",
    //   id: "id_1",
    //   value: 90
    // }
  ];
  let points = [
    {
      id: "id_0_0",
      name: "Org A",
      value: 167,
      parent: "id_0",
      colorValue: 67
    },
    {
      id: "id_0_0_0",
      name: "Subnet 1",
      parent: "id_0_0",
      value: 130,
      colorValue: 130
    },
    {
      id: "id_0_0_1",
      name: "Subnet 2",
      parent: "id_0_0",
      value: 27,
      colorValue: 27
    },
    {
      id: "id_0_0_2",
      name: "Subnet 3",
      parent: "id_0_0",
      value: 10,
      colorValue: 10
    },
    {
      id: "id_0_1",
      name: "Org B",
      value: 20,
      parent: "id_0",
      colorValue: 20
    },
    {
      id: "id_0_1_0",
      name: "Subnet 4",
      parent: "id_0_1",
      value: 10,
      colorValue: 10
    },
    {
      id: "id_0_1_1",
      name: "Subnet 5",
      parent: "id_0_1",
      value: 10,
      colorValue: 10
    },
    {
      name: "Org C",
      id: "id_0_2",
      value: 3,
      parent: "id_0",
      colorValue: 3
    },
    {
      name: "Subnet 6",
      id: "id_0_2_0",
      parent: "id_0_2",
      value: 3,
      colorValue: 3
    }
    // {
    //   name: "Public",
    //   id: "id_0"
    // }
  ];
  points = points.map((point) => {
    let obj = { ...point, pointPadding: 23 };
    if (point.name.toLowerCase().indexOf("subnet") === -1) {
      delete obj.value;
      delete obj.colorValue;
    }
    return obj;
  });
  function makeNode(id, name, series, prev) {
    const chart = series.chart;
    const node = {
      id,
      name
    };
    let x = chart.plotLeft;

    if (prev) {
      const { width, height, y } = prev.element.getBBox();
      x = width + prev.x + 10;
      node.prev = prev;
      prev.next = node;

      prev.element.attr({
        anchorX: x,
        anchorY: chart.plotTop - 20 + height / 2
      });
    }

    node.destroyNext = function () {
      const next = this.next;
      if (next) {
        next.destroyNext();
        next.element.destroy();
        delete this.next;
        delete chart.bread[next.id];
      }
    };

    const element = (node.element = chart.renderer
      .label(
        name,
        x,
        chart.plotTop - 2,
        "callout",
        undefined,
        undefined,
        undefined,
        true
      )
      .attr({
        stroke: "gray",
        // "stroke-width": 1,
        padding: 5,
        snap: 5,
        zIndex: 10,
        width: 100
      })
      .add());

    element.on("click", () => {
      if (name === "All networks")
        chart.update({
          xAxis: [{ width: "50%" }, { width: "50%", left: "50%" }]
        });
      node.destroyNext();
      node.element.attr({
        anchorX: undefined,
        anchorY: undefined
      });
      if (chart.series[0].rootNode !== "") series.drillToNode(id);
    });

    node.x = x;
    return node;
  }
  let chartForRender = true;
  let originalColor = undefined;

  let config = {
    chart: {
      styledMode: true,
      marginTop: 50,
      events: {
        load: function () {
          this.bread = {
            "": makeNode("", "All networks", this.series[0])
          };
          console.log(this.series);
          // https://api.highcharts.com/class-reference/Highcharts.SVGRenderer#rect
          var ren = this.renderer;
          ren
            .rect(this.plotLeft, this.plotTop - 15, this.plotWidth - 2, 15)
            .attr({
              fill: "#F3F3F3"
            })
            .add();
        },
        render() {
          let chart = this;
          // console.log(this.bread);
          if (chartForRender) {
            chartForRender = false;
            if (chart.series[0].drillUpButton) {
              chart.update({
                colorAxis: {
                  minColor: "#D2E1FB",
                  maxColor: "#4883E9"
                }
              });
            } else {
              chart.update({
                colorAxis: {
                  minColor: "#1DA2B4",
                  maxColor: "#0056EB"
                }
              });
            }
          }
          chartForRender = true;
        }
      },
      type: "treemap"
    },

    plotOptions: {
      series: {
        point: {
          events: {
            click: function (e) {
              const hasChildren = !!this.node.childrenTotal;
              const chartRef = this.series.chart;
              // console.log(chartRef.xAxis[0]);
              if (hasChildren) {
                const bread = chartRef.bread;
                bread[this.id] = makeNode(
                  this.id,
                  this.name,
                  this.series,
                  bread[this.node.parent]
                );
              }
              chartRef.update({
                xAxis: [{ width: "100%" }, { width: 0 }]
              });
            }
          }
        }
      },
      treemap: {
        type: "treemap",
        drillUpButton: {
          // https://github.com/highcharts/highcharts/blob/af8977bafd/ts/Series/Treemap/TreemapSeries.ts#L1457
          text: "Back"
        },
        // This needs to be modified if HighCharts is upgraded
        // https://github.com/highcharts/highcharts/blob/af8977bafd/ts/Series/Treemap/TreemapSeries.ts#L1441
        pointPadding: 0,
        layoutAlgorithm: "squarified",
        allowTraversingTree: true,
        showInLegend: true,
        allowDrillToNode: true,
        animationLimit: 1000,
        levelIsConstant: false,
        dataLabels: {
          enabled: false,
          allowOverlap: false,
          style: {
            fontFamily: "Public Sans",
            textOutline: "none",
            cursor: "default",
            color: "#171717;",
            fontSize: "11px",
            fontWeight: "normal",
            textDecoration: "none"
          }
        },
        // point: {
        //   events: {
        //     mouseOver: function () {
        //       originalColor = this.color;

        //       this.update({
        //         color: "red"
        //       });
        //     },
        //     mouseOut: function () {
        //       this.update({
        //         color: originalColor
        //       });
        //     }
        //   }
        // },
        states: {
          hover: {
            halo: {
              enabled: false,
              attributes: {
                // fill: "#FFFFFF"
              }
            },
            lineWidthPlus: 5,
            opacity: 0.76
          },
          select: {
            stroke: "#039",
            fill: "#a4edba"
          }
        },
        levels: [
          {
            level: 1,
            borderWidth: 3,
            dataLabels: {
              allowOverlap: false,
              enabled: true,
              align: "right",
              verticalAlign: "bottom",
              style: {
                color: "#000000",
                // textOutline: "black",
                fontWeight: "bold"
              }
            }
          },
          {
            level: 2,
            // layoutAlgorithm: "strip",
            dataLabels: {
              allowOverlap: false,
              align: "right",
              verticalAlign: "bottom",
              enabled: false
            },
            borderWidth: 1
          }
        ]
      }
    },
    colorAxis: [
      {
        minColor: "#D2E1FB",
        maxColor: "#4883E9"
      }
      // {
      //   minColor: "#0000FB",
      //   maxColor: "#480000"
      // }
    ],
    xAxis: [
      { width: "50%", enabled: false },
      { enabled: false, width: "50%", left: "50%" }
    ],
    series: [{ data: points }, { data: points1, xAxis: 1 }],
    legend: { enabled: false },
    tooltip: {
      pointFormatter: function () {
        var value = this.value || this.node.childrenTotal;
        return "<b>Total Logons from " + this.name + ":</b> " + value;
      }
    }
  };
  Highcharts.chart("container", config);
})();
