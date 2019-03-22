<template>
  <div class="c-mock-switch">
    <a
      href="/mock-switch/"
      target="_blank"
    >
      <div class="c-mock-switch-box">
        mock<br />
        switch
      </div>
    </a>
  </div>
</template>

<style lang="scss">
.c-mock-switch {
  position: fixed;
  right: 10px;
  bottom: 10px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #5f9ea0;
  font-size: 12px;
  text-align: center;
  &-box {
    width: 60px;
    height: 60px;
    display: table-cell;
    vertical-align: middle;
  }
  a {
    color: white;
  }
}
</style>
