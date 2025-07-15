document.addEventListener('DOMContentLoaded', function () {
  let chartInstance = null

  function renderBarChart() {

    const ctx = document.getElementById('barChart').getContext('2d')
    const { incomeData, expensesData } = getMonthlyIncomeAndExpenses()

    if (chartInstance) {
      chartInstance.data.datasets[0].data = incomeData
      chartInstance.data.datasets[1].data = expensesData
      chartInstance.update()
      return
    }

    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ],
        datasets: [
          {
            label: 'Income',
            data: incomeData,
            backgroundColor: 'rgba(54, 162, 235, 0.7)'
          },
          {
            label: 'Expenses',
            data: expensesData,
            backgroundColor: 'rgba(255, 99, 132, 0.7)'
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }

  // Render chart when Chart tab is shown
  document.getElementById('chart-tab').addEventListener('shown.bs.tab', renderBarChart)

  // Update chart when data changes
  document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', function () {
      if (document.getElementById('chart').classList.contains('active')) {
        renderBarChart()
      }
    })
  })

  function getMonthlyIncomeAndExpenses() {
    const months = [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ]

    const incomeData = months.map(month =>
      Number(document.getElementById(`income-${month}`).value) || 0
    )

    const expensesData = months.map(month =>
      Number(document.getElementById(`expenses-${month}`).value) || 0
    )

    return { incomeData, expensesData }
  }

})