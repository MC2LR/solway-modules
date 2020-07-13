<template>
  <div class="battery-animation">
    <div class="battery"></div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.battery-animation {
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: linear-gradient(to bottom, teal, aqua); */
}

.battery {
  width: 0.2rem;
  height: 0.1rem;
  color: #FC8B1C;
  border: 2px solid currentColor;
  border-radius: 0.2px;
  position: relative;
  background-color: #381E04;
  background-image: linear-gradient(to left, #FC8B1C, #FC8B1C);
  background-repeat: no-repeat;
  background-size: 30% 80%;
  background-position: top 0.01rem left 0.01rem;
  animation: charge 5s steps(8) infinite;
}

.battery::after {
  content: "";
  position: absolute;
  width: 0.03rem;
  height: 0.06rem;
  background-color: currentColor;
  top: 0.01rem;
  right: calc(-2px - 0.03rem);
  border-radius: 0 2px 2px 0;
}

@keyframes charge {
  from {
    background-size: 95% 80%;
  }

  to {
    background-size: 10% 80%;
  }
}
</style>
