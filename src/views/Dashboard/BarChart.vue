<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  mounted() {
    this.renderChart(
      {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct","Nov","Dec"],
        datasets: [
          {
            label: "Successful Transactions",
            backgroundColor: "#f87979",
            data: [40, 20, 12, 32, 80, 40, 39, 80, 40, 45, 60, 51]
          },
          {
            label: "Failed Transcations",
            backgroundColor: "#ff770",
            data: [49, 29, 32, 39, 50, 40, 39, 80, 40, 30, 42, 60]
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    );
  }
};
</script>
