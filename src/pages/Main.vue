<template>
<div class="container">
  <h1>Генератор паролей</h1>
  <gen-password />
</div>
</template>

<script>
import GenPassword from "@/components/GenPassword";
export default {
  components: {GenPassword},
  data() {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
@mixin adaptiv-value($property, $startSize, $minSize, $type) {
  $addSize: $startSize - $minSize;
  @if $type==1 {
    #{$property}: $startSize + px;
    @media (max-width: #{1200 + px}) {
      #{$property}: calc(#{$minSize + px} + #{$addSize} * ((100vw - 320px) / #{1200 - 320}));
    }
  }
  @if $type==2 {
    #{$property}: $startSize + px;
    @media (min-width: #{1200 + px}) {
      #{$property}: calc(#{$minSize + px} + #{$addSize} * ((100vw - 320px) / #{1200 - 320}));
    }
  }
  @if $type==3 {
    #{$property}: calc(#{$minSize + px} + #{$addSize} * ((100vw - 320px) / #{1200 - 320}));
  }
}
h1 {
  text-align: center;
  @include adaptiv-value('margin-bottom', 25, 10, 1);
  @include adaptiv-value('font-size', 24, 16, 1);
}
</style>