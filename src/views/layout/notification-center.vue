<template>
    <div class="notifications-center">
        <div class="notifications-center__header">Notifications</div>
        <div class="notifications-center__do-not-disturb">
            <span>Do not disturb</span>
            <!-- <switches
                :emit-on-mount="false"
                type-bold="true"
                theme="bootstrap"
                color="info"
            /> -->
        </div>
        <div class="notifications-center__day-group">
            <div class="day-group__header">
                <h1 class="text-green">Today</h1>
                <button 
                    type="button" 
                    class="notification-close-button" 
                    data-dismiss="modal" 
                    aria-hidden="true"><i class="pg-close fs-14"/></button>
            </div>
            <div class="notification-container">
                <div class="notification-container__header">
                    <div class="header__icon"><i class="fas text-primary fa-info-circle"/></div>
                    <span class="header__title">Notification Title</span>
                    <div class="header__time-and-close">
                        <button 
                            type="button" 
                            class="notification-close-button" 
                            data-dismiss="modal" 
                            aria-hidden="true"><i class="pg-close fs-14"/></button>
                    </div>
                </div>
                <div class="notification-container__body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque scelerisque lorem tortor, tristique varius tortor tempor a.
                </div>
            </div>
            <div class="notification-container">
                <div class="notification-container__header">
                    <div class="header__icon"><i class="fas text-warning fa-exclamation-circle"/></div>
                    <span class="header__title">Notification Title</span>
                    <div class="header__time-and-close">
                        <button 
                            type="button" 
                            class="notification-close-button" 
                            data-dismiss="modal" 
                            aria-hidden="true"><i class="pg-close fs-14"/></button>
                    </div>
                </div>
                <div class="notification-container__body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque scelerisque lorem tortor, tristique varius tortor tempor a.
                </div>
            </div>
            <div class="notification-container">
                <div class="notification-container__header">
                    <div class="header__icon"><i class="fas text-danger fa-exclamation-circle"/></div>
                    <span class="header__title">Notification Title</span>
                    <div class="header__time-and-close">
                        <button 
                            type="button" 
                            class="notification-close-button" 
                            data-dismiss="modal" 
                            aria-hidden="true"><i class="pg-close fs-14"/></button>
                    </div>
                </div>
                <div class="notification-container__body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque scelerisque lorem tortor, tristique varius tortor tempor a.
                </div>
            </div>
        </div>
        <div class="notifications-center__day-group">
            <div class="day-group__header">
                <h1>Yesterday</h1>
                <button 
                    type="button" 
                    class="notification-close-button" 
                    data-dismiss="modal" 
                    aria-hidden="true"><i class="pg-close fs-14"/></button>
            </div>
            <div class="notification-container">
                <div class="notification-container__header">
                    <div class="header__icon"><i class="fas text-primary fa-info-circle"/></div>
                    <span class="header__title">Notification Title</span>
                    <div class="header__time-and-close">
                        <button 
                            type="button" 
                            class="notification-close-button" 
                            data-dismiss="modal" 
                            aria-hidden="true"><i class="pg-close fs-14"/></button>
                    </div>
                </div>
                <div class="notification-container__body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque scelerisque lorem tortor, tristique varius tortor tempor a.
                </div>
            </div>
            <div class="notification-container">
                <div class="notification-container__header">
                    <div class="header__icon"><i class="fas text-warning fa-exclamation-circle"/></div>
                    <span class="header__title">Notification Title</span>
                    <div class="header__time-and-close">
                        <button 
                            type="button" 
                            class="notification-close-button" 
                            data-dismiss="modal" 
                            aria-hidden="true"><i class="pg-close fs-14"/></button>
                    </div>
                </div>
                <div class="notification-container__body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque scelerisque lorem tortor, tristique varius tortor tempor a.
                </div>
            </div>
            <div class="notification-container">
                <div class="notification-container__header">
                    <div class="header__icon"><i class="fas text-danger fa-exclamation-circle"/></div>
                    <span class="header__title">Notification Title</span>
                    <div class="header__time-and-close">
                        <button 
                            type="button" 
                            class="notification-close-button" 
                            data-dismiss="modal" 
                            aria-hidden="true"><i class="pg-close fs-14"/></button>
                    </div>
                </div>
                <div class="notification-container__body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque scelerisque lorem tortor, tristique varius tortor tempor a.
                </div>
            </div>
        </div>
        <div class="notifications-center__day-group">
            <div class="day-group__header">
                <h1>2 days ago</h1>
                <button 
                    type="button" 
                    class="notification-close-button" 
                    data-dismiss="modal" 
                    aria-hidden="true"><i class="pg-close fs-14"/></button>
            </div>
            <div class="notification-container">
                <div class="notification-container__header">
                    <div class="header__icon"><i class="fas text-primary fa-info-circle"/></div>
                    <span class="header__title">Notification Title</span>
                    <div class="header__time-and-close">
                        <button 
                            type="button" 
                            class="notification-close-button" 
                            data-dismiss="modal" 
                            aria-hidden="true"><i class="pg-close fs-14"/></button>
                    </div>
                </div>
                <div class="notification-container__body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque scelerisque lorem tortor, tristique varius tortor tempor a.
                </div>
            </div>
            <div class="notification-container">
                <div class="notification-container__header">
                    <div class="header__icon"><i class="fas text-warning fa-exclamation-circle"/></div>
                    <span class="header__title">Notification Title</span>
                    <div class="header__time-and-close">
                        <button 
                            type="button" 
                            class="notification-close-button" 
                            data-dismiss="modal" 
                            aria-hidden="true"><i class="pg-close fs-14"/></button>
                    </div>
                </div>
                <div class="notification-container__body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque scelerisque lorem tortor, tristique varius tortor tempor a.
                </div>
            </div>
            <div class="notification-container">
                <div class="notification-container__header">
                    <div class="header__icon"><i class="fas text-danger fa-exclamation-circle"/></div>
                    <span class="header__title">Notification Title</span>
                    <div class="header__time-and-close">
                        <button 
                            type="button" 
                            class="notification-close-button" 
                            data-dismiss="modal" 
                            aria-hidden="true"><i class="pg-close fs-14"/></button>
                    </div>
                </div>
                <div class="notification-container__body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque scelerisque lorem tortor, tristique varius tortor tempor a.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "NotificationCenter"
};
</script>

<style lang="scss">
.notification-container {
    border-radius: 5px;
    margin-bottom: 10px;
    box-shadow: 0 0 9px rgba(191, 191, 191, 0.36);
    border: 1px solid rgba(222, 227, 231, 0.56);
    background-color: white;

    &__header {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eaebeb;
        padding: 5px 10px;
        background-color: #f1f1f1;


        .header__icon {
            width: 16px;
            margin-right: 10px;
        }

        .header__title {
            text-transform: uppercase;
        }

        .header__time-and-close {
            margin-left: auto;
            display: flex;

            .header__time {
                margin-right: 10px;
            }
        }
    }

    &__body {
        padding: 10px;
        font-size: 12px;
    }
}

.notifications-center {
    width: 300px;
    background-color: white;
    z-index: 1000;
    right: 0;
    position: fixed;
    bottom: 0;
    top: 0;
    left: auto;
    overflow: auto;
    transition: transform 400ms cubic-bezier(0.05, 0.74, 0.27, 0.99);
    box-shadow: 0 0 9px rgba(191, 191, 191, 0.36);
    border-left: 1px solid rgba(222, 227, 231, 0.56);
    padding: 10px;

    h1 {
        font-size: 22px;
        line-height: 25px;
    }

    &__header {
        background-color: #eaebeb;
        padding: 10px;
        border-radius: 5px;
    }

    &__do-not-disturb {
        padding: 10px;
        padding-bottom: 0;
        display: flex;
        align-items: center;

        .vue-switcher {
            margin-left: auto;
        }
    }

    &__day-group {
        .day-group__header {
            display: flex;
            align-items: center;
            padding: 10px;

            h1 {
                margin: 0;
                font-weight: 500;
            }
        }
    }
}

.notification-close-button {
    margin-left: auto;
    background-color: #eaebeb;
    border-radius: 100%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
    border: 0;
    cursor: pointer;

    i {
        color: gray;
    }
}
</style>
