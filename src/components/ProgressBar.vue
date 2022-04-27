<template>
<div>
  <div class="progress-bar">
  <span class="bar">
    <span class="progress"></span>
  </span>
  </div>
</div>
</template>

<script>
export default {
  name: "ProgressBar"
}
</script>

<style scoped>

@keyframes loader {
  0% {
    width: 0;
  }
  20% {
    width: 10%;
  }
  25% {
    width: 24%;
  }
  43% {
    width: 41%;
  }
  56% {
    width: 50%;
  }
  66% {
    width: 52%;
  }
  71% {
    width: 60%;
  }
  75% {
    width: 76%;
  }
  94% {
    width: 86%;
  }
  100% {
    width: 100%;
  }
}
.progress-bar {
  border-radius: 0%;
  overflow: hidden;
  width: 100%;
  height: 4%;
}
.progress-bar span {
  display: block;
}
.bar {
  background: rgba(0, 0, 0, 0.075);
}
.progress {
  animation: loader 8s ease infinite;
  background: #75b800;
  color: #fff;
  padding: 3px;
  width: 0;
  height: 100%;
}
.progress-bar {
  left: 50%;
  max-width: 90%;
  position: absolute;
  top: 10%;
  transform: translate3d(-50%, -50%, 0);
}

</style>