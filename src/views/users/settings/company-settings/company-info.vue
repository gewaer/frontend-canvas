<template>
<div class="row company-general-information">
    <div class="col">
        <h5>Company Information</h5>
        <div class="row">
            <div class="col-12 col-xl-7">
                <div class="row">
                    <div class="col-12 col-md-auto">
                        <div class="profile-image-container">
                            <div class="profile-image">
                                <img class="img-fluid" src="http://logok.org/wp-content/uploads/2014/11/NZXT-Logo-880x660.png">
                            </div>
                            <div class="upload-profile-image">
                                <label for="upload-image" class="btn btn-primary">Upload image</label>
                                <input id="upload-image" type="file">
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group form-group-default required">
                            <label>Name</label>
                            <input class="form-control" type="text" name='name'>
                        </div>
                        <div class="form-group form-group-default required">
                            <label>Address</label>
                            <input class="form-control" type="text" name="email">
                        </div>
                        <div class="form-group form-group-default required">
                            <label>Zip Code</label>
                            <input class="form-control" type="text" name="email">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-xl-5">
                <div class="form-group form-group-default">
                    <label>Email</label>
                    <input class="form-control" name='phone' type="email">
                </div>
                <div class="form-group form-group-default required">
                    <label>Phone</label>
                    <input name='lastname' class="form-control" type="tel">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <label>Country</label>
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
</div>
</template>

<script>
export default {
};
</script>

<style lang="scss">
.company-general-information {
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
