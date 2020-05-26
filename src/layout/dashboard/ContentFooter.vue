<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="copyright">
        © {{year}} OnePanel par TeaTeam et Grominet
      </div>
    </div>
  </footer>
</template>
<script>
  export default {
    data() {
      return {
        year: new Date().getFullYear()
      }
    }
  };
</script>
<style>
</style>
