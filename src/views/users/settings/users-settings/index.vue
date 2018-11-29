<template>
<div class="card card-transparent">
    <div class="card-body no-padding">
    <div class="row">
        <div class="col">
            <div class="card flex-md-row">
                <ul class="nav nav-tabs nav-tabs-simple nav-tabs-left bg-white" id="tab-3">
                    <li class="nav-item">
                        <a href="#" class="active" data-toggle="tab" data-target="#user-info">User Info</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" data-toggle="tab" data-target="#user-notifications">Notifications</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" data-toggle="tab" data-target="#user-socials">Social</a>
                    </li>
                </ul>
                <div class="tab-content bg-white">
                    <div class="tab-pane active" id="user-info">
                        <user-info />
                    </div>
                    <div class="tab-pane" id="user-notifications">
                        <user-notifications />
                    </div>
                    <div class="tab-pane" id="user-socials">
                        <user-socials />
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</div>
</template>

<script>
import userInfo from "./user-info";
import userNotifications from "./user-notifications";
import userSocials from "./social";

export default {
    components: {
        userInfo,
        userNotifications,
        userSocials
    }
};
</script>
