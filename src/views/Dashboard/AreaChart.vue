<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  data() {
    return {
      gradient: null,
      gradient2: null,
      gradient3: null,
    };
  },
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    
    this.gradient3 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
    this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
    this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

    this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
    this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
    this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");

     this.gradient3.addColorStop(0, "rgba(250, 255, 0, 0.9)");
    this.gradient3.addColorStop(0.5, "rgba(250, 255, 0, 0.25)");
    this.gradient3.addColorStop(1, "rgba(250, 255, 0, 0)");

    this.renderChart(
      {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct","Nov","Dec"],
        datasets: [
          {
            label: "Card Transaction",
            borderColor: "#FC2525",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "white",
            backgroundColor: this.gradient,
            data: [40, 39, 10, 40, 39, 80, 40,39, 10, 40, 39,67]
          },
          {
            label: "NIP",
            borderColor: "#05CBE1",
            pointBackgroundColor: "white",
            pointBorderColor: "white",
            borderWidth: 1,
            backgroundColor: this.gradient2,
            data: [60, 55, 32, 10, 2, 12, 53,60, 55, 32, 10,89]
          },
          {
            label: "Intra Bank",
            borderColor: "#15EBE1",
            pointBackgroundColor: "white",
            pointBorderColor: "white",
            borderWidth: 1,
            backgroundColor: this.gradient3,
            data: [50, 75, 92, 23, 29, 12, 52,80, 25, 92, 30,69]
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    );
  }
};
</script>
