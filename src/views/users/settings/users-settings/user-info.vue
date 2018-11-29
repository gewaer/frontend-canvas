<template>
<div class="row user-general-information">
    <div class="col-12 col-xl m-b-20">
        <h5>General Information</h5>
        <div class="row">
            <div class="col-12 col-md-auto">
                <div class="profile-image-container">
                    <div class="profile-image">
                        <img class="img-fluid" src="http://img2.thejournal.ie/inline/2470754/original?width=428&version=2470754">
                    </div>
                    <div class="upload-profile-image">
                        <label for="upload-image" class="btn btn-primary">Upload image</label>
                        <input id="upload-image" type="file">
                    </div>
                </div>
            </div>
            <div class="col-12 col-md">
                <div class="form-group form-group-default required">
                    <label>First name</label>
                    <input class="form-control" type="text" name='firstname'>
                </div>
                <div class="form-group form-group-default required">
                    <label>Last name</label>
                    <input name='lastname' class="form-control" type="text">
                </div>
                <div class="form-group form-group-default">
                    <label>Cell phone</label>
                    <input class="form-control" name='phone' type="text">
                </div>
                <div class="form-group form-group-default required">
                    <label>Email (username)</label>
                    <input class="form-control" type="text" name="email">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <label>Language</label>
                <select class="cs-select cs-skin-slide" style="width:500px;" data-init-plugin="cs-select">
                    <option value="sightseeing">English</option>
                    <option value="business">Spanish</option>
                    <option value="honeymoon">French</option>
                </select>
            </div>
            <div class="col">
                <label>Timezone</label>
                <select class="cs-select cs-skin-slide" style="width:500px;" data-init-plugin="cs-select">
                    <option value="sightseeing">Timezone 1</option>
                    <option value="business">Timezone 2</option>
                    <option value="honeymoon">Timezone 3</option>
                </select>
            </div>
        </div>
    </div>
    <div class="col-12 col-xl m-b-20">
        <h5>Security</h5>
        <div class="row">
            <div class="col">
                <div class="form-group form-group-default required">
                    <label>Current password</label>
                    <input  name="old_password" class="form-control" type="password">
                </div>
                <div class="form-group form-group-default required">
                    <label>New password</label>
                    <input name="password" class="form-control" type="password">
                </div>
                <div class="form-group form-group-default required">
                    <label>Confirm new password</label>
                    <input name="confirmPassword" class="form-control" type="password">
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "UserInfo",
    data() {
        return {

        }
    },
    mounted() {
        this.getUserData();
    },

    methods: {
        getUserData() {
            axios.get("/users")
        }
    }
};
</script>

<style lang="scss">
.user-general-information {
    .profile-image-container {
        display: flex;
        flex-direction: column;
        width: 160px;
        margin: 0 auto;
        margin-bottom: 15px;

        .profile-image {
            width: 160px;
            height: 160px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(230, 230, 230, 0.7);
        }

        label {
            width: 100%;
            border-radius: 0;
        }

        input[type='file'] {
            display: none;
        }
    }
}
</style>
