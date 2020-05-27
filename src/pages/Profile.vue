<template>
  <div class="row">
    <div class="col-md-8">
      <edit-profile-form :profile="profile">
      </edit-profile-form>
    </div>
    <div class="col-md-4">
      <user-card :profile="profile"></user-card>
    </div>
  </div>
</template>
<script>
  import EditProfileForm from './Profile/EditProfileForm';
  import UserCard from './Profile/UserCard';
  import User from '@/user';

  export default {
    components: {
      EditProfileForm,
      UserCard
    },
    data() {
      return {
        profile:User.profile
      }
    }
  }
</script>
<style>
</style>
