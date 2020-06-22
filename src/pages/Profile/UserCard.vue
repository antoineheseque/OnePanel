<template>
  <card type="user">
    <p class="card-text">
    </p>
    <div class="profile">
      <div class="block block-one"></div>
      <div class="block block-two"></div>
      <div class="block block-three"></div>
      <div class="block block-four"></div>

      <img class="avatar" :src="profile.profilePicture==null?'img/profile.jpg':'img/profiles/'+profile.profilePicture" alt="...">
      <h5 class="title">{{profile.firstName + " " + profile.lastName}}</h5>
      <h5 class="description">{{profile.username}}</h5>
    </div>
    <p></p>
    <p class="card-description">

    </p>
  </card>
</template>
<script>
  export default {
    props: {
      profile: {
        type: Object,
        default: () => {
          return {};
        }
      }
    }
  }
</script>
<style>
</style>
