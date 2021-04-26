<template>
  <div>
    <section class="hero is-primary is-fullheight-with-navbar">
      <!-- Hero head: will stick at the top -->
      <div class="hero-head">
        <b-navbar>
          <template #brand>
            <b-navbar-item
              class="navbar-logo-item"
              tag="router-link"
              :to="{ path: '/' }"
            >
              <b-image
                :src="require('@/assets/logo.svg')"
                class="navbar-logo"
                width="112"
                height="28"
                alt="Lightweight UI components for Vue.js based on Bulma"
              ></b-image>
              &nbsp; Kalimba
            </b-navbar-item>
          </template>
          <template #start>
            <b-navbar-item href="#"> Home </b-navbar-item>
            <b-navbar-dropdown label="Info">
              <b-navbar-item href="#"> About </b-navbar-item>
              <b-navbar-item href="#"> Contact </b-navbar-item>
            </b-navbar-dropdown>
          </template>

          <template #end>
            <b-navbar-item tag="div">
              <div class="buttons">
                <a
                  class="button is-light"
                  href="https://github.com/KalimbaTeam"
                >
                  Github
                </a>
              </div>
            </b-navbar-item>
          </template>
        </b-navbar>
      </div>

      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container">
          <p class="title">Secure, private and open-source messaging</p>
          <p class="subtitle">Available at your fingertips</p>
        </div>
      </div>

      <!-- Hero footer: will stick at the bottom -->
      <div class="hero-foot"></div>
    </section>
  </div>
</template>
<style scoped>
.navbar-logo {
  filter: invert(1);
  padding-right: 12px;
  width: 50px;
}
.navbar-logo-item {
  font-family: monospace;
}
</style>