<template>
  <div class="login">
    <div class="wrapper">
      <div class="img_border">
        <img src="../../assets/img/icon.jpg" alt />
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "",
  components: {},
  data() {
    return {};
  }
};
</script>
<style lang='less' scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #2b4b6b;
  .wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 300px;
    background-color: #fff;
    .img_border {
      position: absolute;
      width: 150px;
      height: 150px;
      left: 50%;
      top: -75px;
      transform: translateX(-50%);
      padding: 10px;
      border-radius: 50%;
      border: 1px solid #fff;
      background-color: #fff;
      box-shadow: 0 1px 10px #ccc;
      overflow: hidden;
      img {
        border-radius: 50%;
        box-shadow: 0 1px 10px #ccc;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>