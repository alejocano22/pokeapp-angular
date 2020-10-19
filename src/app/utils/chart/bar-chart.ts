export const barChartOptions = {
  responsive: true,
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
            beginAtZero: true
          },
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ],
    }
};

export const barChartPrimaryStyle = {
  backgroundColor: '#cc0000',
  borderColor: '#cc0000',
  hoverBackgroundColor: '#ff0000',
  hoverBorderColor: '#ff0000',
  borderWidth: 5
};

export const barChartSecondaryStyle = {
  backgroundColor: '#b3a125',
  borderColor: '#b3a125',
  hoverBackgroundColor: '#ffde00',
  hoverBorderColor: '#ffde00',
  borderWidth: 5
};


