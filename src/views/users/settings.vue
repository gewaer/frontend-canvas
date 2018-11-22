<template>
<div class="user-settings">
    <h4 class="section-title p-l-10">Settings</h4>
    <div class="card card-transparent">
        <div class="card-body no-padding">
        <div class="row">
            <div class="col">
                <div class="card flex-row" style="height: calc(100vh - 200px);">
                    <ul class="nav nav-tabs nav-tabs-simple nav-tabs-left bg-white" id="tab-3">
                    <li class="nav-item">
                        <a href="#" class="active" data-toggle="tab" data-target="#user-info">User Info</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" data-toggle="tab" data-target="#tab3FollowUs">Two</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" data-toggle="tab" data-target="#tab3Inspire">Three</a>
                    </li>
                    </ul>
                    <div class="tab-content bg-white">
                    <div class="tab-pane active" id="user-info">
                        <form novalidate>
                            <div class="row">
                                <div class="col">
                                    <h6>General Information</h6>
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
                                    <div class="row no-gutters">
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
                                <div class="col">
                                    <h6>Security</h6>
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
                            <div class="row">
                                <div class="col text-right m-t-20">
                                    <button class="update-btn btn btn-primary btn-center">Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="tab-pane" id="tab3FollowUs">
                        <h3>
                        “ Nothing is <span class="semi-bold">impossible</span>, the word
                        itself says 'I'm <span class="semi-bold">possible</span>'! ”
                        </h3>
                        <p>
                        A style represents visual customizations on top of a layout. By editing a style, you can use Squarespace's visual interface to customize your...
                        </p>
                        <br>
                        <p class="pull-right">
                        <button class="btn btn-default btn-cons" type="button">White</button>
                        <button class="btn btn-success btn-cons" type="button">Success</button>
                        </p>
                    </div>
                    <div class="tab-pane" id="tab3Inspire">
                        <h3>
                        Follow us &amp; get updated!
                        </h3>
                        <p>
                        Instantly connect to what's most important to you. Follow your friends, experts, favorite celebrities, and breaking news.
                        </p>
                        <br>
                    </div>
                    </div>
                </div>
            </div>
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
.user-settings {
    .tab-content,
    .cs-wrapper,
    .cs-select {
        width: 100%;
        max-width: initial;
    }
}
</style>
